#!/usr/bin/env python3
"""Rend les 53 maquettes Delifast en images et en un carnet PDF consultable."""
from pathlib import Path
import re
import unicodedata

from playwright.sync_api import sync_playwright
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DESIGN = ROOT / "docs" / "maquettes"
OUT = DESIGN / "rendus"
HTML = DESIGN / "index.html"
PDF = OUT / "Delifast-maquettes-53-ecrans.pdf"
VIEWPORT = {"width": 1440, "height": 760}


def slug(text):
    text = unicodedata.normalize("NFKD", text).encode("ascii", "ignore").decode("ascii")
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def make_pdf(images):
    page_w, page_h = landscape(A4)
    pdf = canvas.Canvas(str(PDF), pagesize=(page_w, page_h), pageCompression=1)
    pdf.setTitle("Delifast — maquettes des 53 écrans")
    pdf.setAuthor("Delifast · conception d’interfaces")
    pdf.setSubject("Rendus statiques de démonstration — toutes les données sont fictives")
    for idx, image_path in enumerate(images, start=1):
        with Image.open(image_path) as image:
            iw, ih = image.size
        title = image_path.stem.split("-", 1)[1].replace("-", " ").title()
        pdf.setFillColorRGB(0.16, 0.14, 0.13)
        pdf.setFont("Helvetica-Bold", 9)
        pdf.drawString(22, page_h - 23, f"Delifast · écran {idx:02d}/53 · {title}")
        pdf.setFillColorRGB(0.65, 0.23, 0.18)
        pdf.setFont("Helvetica", 7)
        pdf.drawRightString(page_w - 22, page_h - 23, "MAQUETTE · DONNÉES FICTIVES")
        max_w, max_h = page_w - 36, page_h - 57
        scale = min(max_w / iw, max_h / ih)
        dw, dh = iw * scale, ih * scale
        x, y = (page_w - dw) / 2, 22 + (max_h - dh) / 2
        pdf.drawImage(ImageReader(str(image_path)), x, y, width=dw, height=dh, preserveAspectRatio=True, mask="auto")
        pdf.setFillColorRGB(0.49, 0.46, 0.43)
        pdf.setFont("Helvetica", 7)
        pdf.drawString(22, 11, "Conception statique · aucun compte, commande ou paiement réel")
        pdf.drawRightString(page_w - 22, 11, f"{idx} / 53")
        pdf.showPage()
    pdf.save()


def allocate_pro_rata(total, weights):
    """Allocate integer currency units by largest remainder; ties follow source order."""
    denominator = sum(weights)
    if total < 0 or not weights or denominator <= 0 or any(weight < 0 for weight in weights):
        raise ValueError("Invalid pro-rata allocation inputs")
    shares = [(total * weight) // denominator for weight in weights]
    remainders = [(total * weight) % denominator for weight in weights]
    units_left = total - sum(shares)
    for index in sorted(range(len(weights)), key=lambda item: (-remainders[item], item))[:units_left]:
        shares[index] += 1
    return shares


def verify_documentary_examples():
    """Check a documented illustration only; this is not a backend test."""
    line_discount_per_unit = allocate_pro_rata(1_000, [1, 1])
    global_discount_by_line = allocate_pro_rata(1_000, [6_000, 4_000])
    global_discount_per_unit = allocate_pro_rata(global_discount_by_line[0], [1, 1])
    net_unit_price = 3_000 + 500 - line_discount_per_unit[0] - global_discount_per_unit[0]
    partial_refund = net_unit_price * 1
    line_a_total = net_unit_price * 2
    line_b_total = 4_000 - global_discount_by_line[1]
    paid_total = line_a_total + line_b_total + 1_000
    if line_discount_per_unit != [500, 500]:
        raise AssertionError(f"Line discount allocation mismatch: {line_discount_per_unit}")
    if global_discount_by_line != [600, 400]:
        raise AssertionError(f"Global discount allocation mismatch: {global_discount_by_line}")
    if partial_refund != 2_700 or paid_total != 10_000:
        raise AssertionError(f"Refund example mismatch: partial={partial_refund}, paid={paid_total}")
    if partial_refund + (line_a_total - partial_refund) != line_a_total:
        raise AssertionError("Partial-unit refund does not reconcile with the historical line total")
    print("Contrôle documentaire OK : 1 unité = 2 700 FCFA ; remboursement total = 10 000 FCFA.")


def main():
    verify_documentary_examples()
    OUT.mkdir(parents=True, exist_ok=True)
    images = []
    failures = []
    rule_checks = {
        4: ["Accompagnement", "Facultatif", "Minimum 0", "obligatoire", "maximum 1"],
        11: ["Changer de commerce ?", "Garder mon panier", "Remplacer le panier", "côté serveur"],
        12: ["un seul commerçant", "réservé", "indisponible"],
        13: ["réservé", "sans expiration automatique"],
        14: ["consommé après validation", "libérée"],
        15: ["Annulation en cours", "Annulée partiellement", "Terminée"],
        16: ["Proposition du commerce", "Après votre refus", "Annulation totale", "Annulation partielle", "enregistré dans la demande", "2 700 FCFA", "10 000 FCFA", "frais partagés", "Notification dans l’application", "Action attendue", "aucun SMS ni e-mail", "cancellation_pending", "rejected", "proof_submitted", "verified", "partially_cancelled", "completed"],
        32: ["Annulation en cours", "Annulée partiellement", "Terminée"],
        28: ["Suivi stock", "Disponibilité manuelle", "indépendante", "côté serveur"],
        29: ["Activer le suivi du stock", "Quantité disponible", "Minimum", "Maximum", "obligatoire", "facultatif"],
        33: ["Confirmer l’arrêt de la préparation", "Confirmer la reprise des articles restants", "Transmettre la preuve corrigée", "Motif transmis", "Notification dans l’application", "2 700 FCFA", "aucun SMS ni e-mail", "append-only", "sans limite arbitraire", "expiration automatique", "cancellation_pending", "proof_submitted", "rejected"],
        35: ["stock réservé", "consomme le stock", "refus"],
        39: ["remboursements", "vérifier manuellement"],
        46: ["Annulation en cours", "Annulée partiellement", "Terminée"],
        47: ["Motif obligatoire en cas de rejet", "transmis au commerçant", "Vérifier à nouveau", "Après renvoi d’une preuve corrigée", "aucun SMS ni e-mail", "cancellation_pending", "proof_submitted", "rejected", "verified", "Annulation totale", "Annulation partielle", "frais partagés", "Historique append-only", "Auteur", "Montant", "Référence", "Preuve", "Motif de rejet", "aucune limite arbitraire"],
    }
    notification_checks = [
        "pending_payment", "Paiement en attente", "confirmed", "Commande confirmée",
        "preparing", "Préparation commencée", "cancellation_pending", "Annulation en cours",
        "partially_cancelled", "Annulation partielle finalisée", "cancelled", "Commande annulée",
        "completed", "Commande terminée", "À vérifier", "Paiement à vérifier", "Validé", "Paiement validé",
        "Refusé", "Paiement refusé", "pending_customer_approval", "Réponse du client attendue",
        "accepted", "Modification acceptée", "rejected", "Modification refusée", "not_required",
        "Remboursement non requis", "pending", "Remboursement attendu", "proof_submitted",
        "Preuve de remboursement transmise", "verified", "Remboursement vérifié",
        "Preuve de remboursement rejetée", "active", "Réservation de stock active", "consumed",
        "Réservation de stock consommée", "released", "Réservation de stock libérée",
        "Arrêt de préparation confirmé", "Reprise de préparation confirmée", "montant concerné",
        "action propre à son destinataire", "brouillon ou une modification sans transition",
    ]
    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            executable_path="/usr/bin/chromium",
            args=["--no-sandbox", "--disable-dev-shm-usage"],
        )
        page = browser.new_page(viewport=VIEWPORT, device_scale_factor=1)
        page.emulate_media(reduced_motion="reduce")
        base = HTML.resolve().as_uri()
        for number in range(1, 54):
            screen_id = f"{number:02d}"
            page.set_viewport_size(VIEWPORT)
            page.goto(f"{base}?ecran={screen_id}&capture=1", wait_until="load", timeout=30000)
            page.evaluate("() => document.fonts.ready.then(() => true)")
            page.evaluate("() => Promise.all([...document.images].map(img => img.decode().catch(() => null)))")
            if number == 1:
                catalog_ids = page.evaluate("window.DELIFAST_SCREENS.map(screen => screen.id)")
                if catalog_ids != list(range(1, 54)):
                    failures.append(f"Inventaire invalide : 53 écrans uniques 1–53 attendus, reçu {catalog_ids}")
            page.locator(f'[data-screen-id="{number}"]').wait_for(state="visible", timeout=10000)
            title_text = page.evaluate(
                f"window.DELIFAST_SCREENS.find(screen => screen.id === {number}).title"
            )
            title_locator = page.locator("h1, h2").first
            if title_locator.count() == 0:
                failures.append(f"{screen_id}: aucun titre d’interface visible")
            broken = page.locator("img").evaluate_all(
                "imgs => imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src)"
            )
            if broken:
                failures.append(f"{screen_id}: image(s) absente(s): {', '.join(broken)}")
            body_text = page.locator("body").inner_text().casefold()
            if "maquette en cours." in body_text:
                failures.append(f"{screen_id}: interface non conçue, placeholder générique détecté")
            for required in rule_checks.get(number, []):
                if required.casefold() not in body_text:
                    failures.append(f"{screen_id}: élément métier absent du rendu: {required}")
            if number == 16:
                for required in notification_checks:
                    if required.casefold() not in body_text:
                        failures.append(f"{screen_id}: déclencheur/libellé de notification absent: {required}")
            path = OUT / f"{screen_id}-{slug(title_text)}.png"
            page.screenshot(path=str(path), full_page=True, animations="disabled")
            images.append(path)
            page.set_viewport_size({"width": 390, "height": 844})
            mobile_widths = page.evaluate("({viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth})")
            if mobile_widths["content"] > mobile_widths["viewport"] + 1:
                failures.append(f"{screen_id}: débordement horizontal mobile ({mobile_widths['content']} px > {mobile_widths['viewport']} px)")
            if number % 10 == 0 or number == 53:
                print(f"Rendu {number}/53 terminé", flush=True)
        page.set_viewport_size(VIEWPORT)
        states_url = (DESIGN / "etats.html").resolve().as_uri()
        page.goto(states_url, wait_until="load", timeout=30000)
        page.screenshot(path=str(OUT / "etats-communs.png"), full_page=True, animations="disabled")
        browser.close()
    make_pdf(images)
    if failures:
        raise SystemExit("Échecs de rendu :\n- " + "\n- ".join(failures))
    print(f"53 écrans rendus dans {OUT}")
    print(f"Carnet PDF : {PDF}")
    print(f"Planche des états : {OUT / 'etats-communs.png'}")


if __name__ == "__main__":
    main()
