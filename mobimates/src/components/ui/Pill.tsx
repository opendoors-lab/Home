export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-cream-200)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--color-forest-700)]">
      {children}
    </span>
  );
}
