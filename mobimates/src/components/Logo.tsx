import Image from "next/image";
import Link from "next/link";
import logoIcon from "@/assets/mobimates-icon.png";
import { brand } from "@/lib/content";
import { routes } from "@/lib/routes";

type Props = {
  /** Icon + wordmark text, or icon only */
  variant?: "full" | "mark";
  className?: string;
  priority?: boolean;
};

export default function Logo({
  variant = "full",
  className = "",
  priority = false,
}: Props) {
  return (
    <Link
      href={routes.home}
      className={`group inline-flex shrink-0 items-center gap-2.5 transition-opacity hover:opacity-90 ${className}`}
      aria-label={`${brand.name} home`}
    >
      <Image
        src={logoIcon}
        alt=""
        width={120}
        height={120}
        priority={priority}
        placeholder="blur"
        className="h-10 w-10 object-contain"
      />
      {variant === "full" && (
        <span className="font-[family-name:var(--font-display)] text-2xl leading-none text-[var(--color-forest)]">
          {brand.name}
        </span>
      )}
    </Link>
  );
}
