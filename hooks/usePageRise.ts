"use client";

import { useEffect, type RefObject } from "react";
import { clearNavHideSource, setNavHideSource } from "@/lib/nav-hide";
import { subscribeScrollFrame } from "@/lib/scroll-frame";

function easeInOut(raw: number) {
  return raw * raw * (3 - 2 * raw);
}

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
    let current = Number(pageEl.style.getPropertyValue(cssVar)) || 0;
    let lastRise = "";
    let lastEvents = "";

    const update = (dt: number) => {
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
              -trackEl.getBoundingClientRect().top / Math.max(1, viewport * 1.85),
            ),
          );

      const target = easeInOut(raw);
      const tau = isMobile ? 0.12 : 0.2;
      current += (target - current) * (1 - Math.exp(-dt / tau));

      if (Math.abs(target - current) < 0.0015) current = target;

      const rise = current >= 0.997 ? 1 : current;
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
      } else {
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
      }

      return Math.abs(target - current) > 0.001;
    };

    const unsubscribe = subscribeScrollFrame(update);
    return () => {
      unsubscribe();
      clearNavHideSource(navId);
    };
  }, [track, page, cssVar, navId, last]);
}
