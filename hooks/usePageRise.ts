"use client";

import { useEffect, type RefObject } from "react";
import { clearNavHideSource, setNavHideSource } from "@/lib/nav-hide";

export function usePageRise(
  track: RefObject<HTMLElement | null>,
  page: RefObject<HTMLElement | null>,
  cssVar: string,
  navId: string,
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
      const top = trackEl.getBoundingClientRect().top;
      const riseTrack = window.innerHeight * 1.8;
      const raw =
        riseTrack <= 0 ? 1 : Math.min(1, Math.max(0, -top / riseTrack));
      const rise = raw >= 0.995 ? 1 : raw * raw * (3 - 2 * raw);
      pageEl.style.setProperty(cssVar, rise.toFixed(4));

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

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      clearNavHideSource(navId);
    };
  }, [track, page, cssVar, navId]);
}
