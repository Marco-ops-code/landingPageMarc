"use client";

import { useEffect, type RefObject } from "react";
import { clearNavHideSource, setNavHideSource } from "@/lib/nav-hide";
import { queueScrollWrite, subscribeScrollFrame } from "@/lib/scroll-frame";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function usePageRise(
  page: RefObject<HTMLElement | null>,
  cssVar: string,
  navId: string,
) {
  useEffect(() => {
    const pageEl = page.current;
    if (!pageEl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      pageEl.style.setProperty(cssVar, "1");
      clearNavHideSource(navId);
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let lastRise = "";
    let pendingRise = "";
    const applyRise = () => pageEl.style.setProperty(cssVar, pendingRise);

    const update = () => {
      const viewport = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight,
      );
      const rect = pageEl.getBoundingClientRect();
      const travel = Math.max(1, Math.min(rect.height, viewport));
      const rise = clamp01((viewport - rect.top) / travel);

      const nextRise = (rise >= 0.997 ? 1 : rise).toFixed(3);
      if (nextRise !== lastRise) {
        lastRise = nextRise;
        pendingRise = nextRise;
        queueScrollWrite(applyRise);
      }

      if (mobileQuery.matches) {
        clearNavHideSource(navId);
        return;
      }

      const fade = 120;
      let navHide = 0;
      if (rect.bottom > 0 && rect.top < fade) {
        navHide =
          rect.top <= 0
            ? clamp01(rect.bottom / fade)
            : clamp01((fade - rect.top) / fade);
      }
      setNavHideSource(navId, navHide);
    };

    const unsubscribe = subscribeScrollFrame(update);
    return () => {
      unsubscribe();
      clearNavHideSource(navId);
    };
  }, [page, cssVar, navId]);
}
