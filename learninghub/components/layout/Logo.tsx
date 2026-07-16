import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  href?: string;
  width?: number;
  height?: number;
  showTagline?: boolean;
}

export default function Logo({
  href = "/dashboard",
  width = 130,
  height = 50,
  showTagline = false,
}: LogoProps) {
  const inner = (
    <div className="flex items-center gap-2.5">
      <img
  src="/kaishi-logo.png"
  alt="Kaishi Innovations Logo"
  className="h-12 w-auto object-contain sm:h-14 md:h-25"
/>

      {showTagline && (
        <p className="hidden text-xs text-muted-foreground sm:block">
          Powered by Kaishi Innovations
        </p>
      )}
    </div>
  );

  return href ? (
    <Link
      href={href}
      className="shrink-0"
      aria-label="Go to LearningHub dashboard"
    >
      {inner}
    </Link>
  ) : (
    <div className="shrink-0">{inner}</div>
  );
}