"use client";

import { useEffect, type RefObject } from "react";
import { clearNavHideSource, setNavHideSource } from "@/lib/nav-hide";
import { subscribeScrollFrame } from "@/lib/scroll-frame";

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

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      pageEl.style.setProperty(cssVar, "1");
      clearNavHideSource(navId);
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 767px)");
    let lastRise = "";
    let lastEvents = "";

    const update = () => {
      const viewport = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight,
      );
      const isMobile = mobileQuery.matches;
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
              -trackEl.getBoundingClientRect().top / Math.max(1, viewport * 1.35),
            ),
          );
      const rise = raw >= 0.997 ? 1 : raw;
      const nextRise = rise.toFixed(4);
      if (nextRise !== lastRise) {
        lastRise = nextRise;
        pageEl.style.setProperty(cssVar, nextRise);
      }

      const events = last || rise > 0.26 ? "auto" : "none";
      if (events !== lastEvents) {
        lastEvents = events;
        pageEl.style.setProperty("--sheet-events", events);
      }

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

    const unsubscribe = subscribeScrollFrame(update);
    return () => {
      unsubscribe();
      clearNavHideSource(navId);
    };
  }, [track, page, cssVar, navId, last]);
}
