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
      <Image
        src="public/kaishi-logo.png"
        alt="LearningHub by Kaishi Innovations"
        width={width}
        height={height}
        className="object-contain"
        style={{ height: "auto" }}
        priority
      />
      {showTagline && (
        <p className="text-muted-foreground text-xs hidden sm:block">
          Powered by Kaishi Innovations
        </p>
      )}
    </div>
  );

  return href ? (
    <Link href={href} className="shrink-0">
      {inner}
    </Link>
  ) : (
    <div className="shrink-0">{inner}</div>
  );
}
