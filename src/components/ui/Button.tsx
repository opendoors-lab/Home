import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost" | "onDark";

const styles: Record<Variant, string> = {
  primary:
    "bg-[var(--color-amber)] text-white shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:brightness-105",
  secondary:
    "border border-[var(--color-forest)]/25 bg-white/60 text-[var(--color-forest)] hover:bg-[var(--color-forest)]/5",
  ghost:
    "text-[var(--color-forest)] hover:bg-[var(--color-forest)]/5",
  onDark:
    "bg-[var(--color-amber)] text-[var(--color-forest)] shadow-[var(--shadow-soft)] hover:-translate-y-0.5",
};

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-amber)]";

  const cls = `${base} ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
