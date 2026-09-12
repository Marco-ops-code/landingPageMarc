"use client";

import { useEffect, useRef } from "react";
import { subscribeScrollFrame } from "@/lib/scroll-frame";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;

    let last = "";
    return subscribeScrollFrame(() => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? window.scrollY / height : 0;
      const next = progress.toFixed(4);
      if (next === last) return;
      last = next;
      el.style.transform = `scaleX(${next})`;
    });
  }, []);

  return (
    <div
      className="fixed top-0 right-0 left-0 z-[90] h-px bg-paper/10"
      aria-hidden="true"
    >
      <div
        ref={bar}
        className="h-full origin-left bg-electric"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
