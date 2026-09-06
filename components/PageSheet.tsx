"use client";

import { useRef, type ReactNode } from "react";
import { usePageRise } from "@/hooks/usePageRise";
import { cn } from "@/lib/cn";

export function PageSheet({
  id,
  zIndex,
  last = false,
  className,
  children,
}: {
  id: string;
  zIndex: number;
  last?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const track = useRef<HTMLDivElement>(null);
  const page = useRef<HTMLElement>(null);
  usePageRise(track, page, "--page-rise", id, last);

  return (
    <div
      ref={track}
      className={cn("page-track", last && "is-last")}
      style={{ zIndex }}
    >
      <section ref={page} id={id} className={cn("page-sheet", className)}>
        {children}
      </section>
    </div>
  );
}
