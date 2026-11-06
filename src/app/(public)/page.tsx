export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-3xl border border-[var(--df-line)] bg-white p-8 shadow-[0_16px_45px_rgba(43,28,19,0.08)] sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--df-red-dark)]">
          Fondations du projet
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[var(--df-ink)] sm:text-5xl">
          Delifast
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-[var(--df-muted)]">
          Le socle Next.js est prêt. Les écrans et fonctionnalités métier seront
          construits à partir des maquettes de référence après validation de cette
          étape.
        </p>
        <p className="mt-8 border-t border-[var(--df-line)] pt-5 text-sm text-[var(--df-muted)]">
          Ouagadougou, Burkina Faso · Initialisation technique
        </p>
      </section>
    </main>
  );
}
