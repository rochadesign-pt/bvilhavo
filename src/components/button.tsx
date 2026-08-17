import Link from "next/link";
import type { ComponentProps } from "react";

// Shared button/link styles so every CTA across the site is identical.
type Variant = "primary" | "secondary" | "onDark";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center rounded-full font-semibold transition-colors";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-on-brand hover:bg-brand-dark",
  secondary: "border border-stroke bg-surface text-text hover:bg-surface-muted",
  onDark: "border border-white/25 text-white hover:bg-white/10",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3",
  sm: "px-5 py-2.5 text-sm",
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return (
    <Link
      href={href}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    />
  );
}

// Text link with a trailing arrow — the repeatable "read more" pattern.
export function ArrowLink({
  href,
  children,
  className = "",
  ...rest
}: ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1 font-semibold text-brand transition-colors hover:text-brand-dark ${className}`}
      {...rest}
    >
      {children} <span aria-hidden>→</span>
    </Link>
  );
}
