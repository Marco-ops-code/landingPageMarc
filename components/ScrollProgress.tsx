"use client";

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? window.scrollY / height : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 right-0 left-0 z-[90] h-px bg-paper/10"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-electric"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
