"use client";

import { useEffect, type RefObject } from "react";
import { clearNavHideSource, setNavHideSource } from "@/lib/nav-hide";

export function usePageRise(
  track: RefObject<HTMLElement | null>,
  page: RefObject<HTMLElement | null>,
  cssVar: string,
  navId: string,
  last = false,
) {
  useEffect(() => {
    const trackEl = track.current;
    const pageEl = page.current;
    if (!trackEl || !pageEl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      pageEl.style.setProperty(cssVar, "1");
      clearNavHideSource(navId);
      return;
    }

    let frame = 0;

    const update = () => {
      const viewport = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight,
      );
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const raw = isMobile
        ? (() => {
            const rect = pageEl.getBoundingClientRect();
            const start = viewport * 0.92;
            const end = Math.min(viewport * 0.28, 220);
            return Math.min(
              1,
              Math.max(0, (start - rect.top) / Math.max(1, start - end)),
            );
          })()
        : Math.min(
            1,
            Math.max(
              0,
              -trackEl.getBoundingClientRect().top / Math.max(1, viewport * 1.8),
            ),
          );
      const rise = raw >= 0.995 ? 1 : raw * raw * (3 - 2 * raw);
      pageEl.style.setProperty(cssVar, rise.toFixed(4));
      pageEl.style.setProperty(
        "--sheet-events",
        last || rise > 0.26 ? "auto" : "none",
      );

      if (isMobile) {
        clearNavHideSource(navId);
        return;
      }

      const pageRect = pageEl.getBoundingClientRect();
      const fade = 140;
      let navHide = 0;
      if (pageRect.bottom > 0 && pageRect.top < fade) {
        navHide =
          pageRect.top <= 0
            ? Math.min(1, pageRect.bottom / fade)
            : Math.min(1, (fade - pageRect.top) / fade);
      }
      setNavHideSource(navId, navHide);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const mobileQuery = window.matchMedia("(max-width: 767px)");

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mobileQuery.addEventListener("change", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mobileQuery.removeEventListener("change", onScroll);
      clearNavHideSource(navId);
    };
  }, [track, page, cssVar, navId, last]);
}
