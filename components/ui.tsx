import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-6 md:px-10 lg:px-14", className)}>
      {children}
    </div>
  );
}

export function Kicker({ index, label }: { index: string; label: string }) {
  return (
    <p className="kicker">
      {index} / {label}
    </p>
  );
}

export function Arrow() {
  return (
    <span className="arrow inline-block" aria-hidden="true">
      ↗
    </span>
  );
}
