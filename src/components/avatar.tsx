import Image from "next/image";

// Shows a photo when available; otherwise an elegant initials monogram.
// Sanity-ready — pass `photo` from the CMS later; until then it degrades to the
// monogram (no stock faces standing in for real, named people).
export function Avatar({
  name,
  photo,
  className = "h-14 w-14",
}: {
  name: string;
  photo?: string;
  className?: string;
}) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (photo) {
    return (
      <div className={`relative overflow-hidden rounded-full bg-surface-muted ${className}`}>
        <Image src={photo} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`grid place-items-center rounded-full bg-brand/10 font-semibold text-brand ${className}`}
      aria-hidden
    >
      {initials}
    </div>
  );
}
