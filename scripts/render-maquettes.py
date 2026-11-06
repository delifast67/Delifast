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


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    images = []
    failures = []
    rule_checks = {
        4: ["Accompagnement", "Facultatif", "Minimum 0", "obligatoire", "maximum 1"],
        11: ["Changer de commerce ?", "Garder mon panier", "Remplacer le panier", "côté serveur"],
        12: ["un seul commerçant", "réservé", "indisponible"],
        13: ["réservé", "sans expiration automatique"],
        14: ["consommé après validation", "libérée"],
        16: ["Proposition du commerce", "Accepter", "Refuser", "nouvelle composition"],
        28: ["Suivi stock", "Disponibilité manuelle", "indépendante", "côté serveur"],
        29: ["Activer le suivi du stock", "Quantité disponible", "Minimum", "Maximum", "obligatoire", "facultatif"],
        33: ["Motif obligatoire", "Libérer la réservation active", "accord explicite", "remplacement"],
        35: ["stock réservé", "consomme le stock", "refus"],
        47: ["Motif obligatoire", "réservation active", "Historique", "Quantité : 2", "administrateur"],
    }
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
            page.evaluate("() => Promise.all([...document.images].map(img => img.decode().catch(() => null)))")
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
