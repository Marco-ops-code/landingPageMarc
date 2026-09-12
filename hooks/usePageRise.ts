"use client";

import { useEffect, type RefObject } from "react";
import { clearNavHideSource, setNavHideSource } from "@/lib/nav-hide";
import { subscribeScrollFrame } from "@/lib/scroll-frame";

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function trackProgress(track: HTMLElement, viewport: number) {
  const rect = track.getBoundingClientRect();
  const travel = Math.max(1, rect.height - viewport);
  return clamp01(-rect.top / travel);
}

function revealProgress(page: HTMLElement, viewport: number) {
  const rect = page.getBoundingClientRect();
  const travel = Math.max(1, Math.min(rect.height, viewport));
  return clamp01((viewport - rect.top) / travel);
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
    let lastRise = "";
    let lastEvents = "";

    const update = () => {
      const viewport = Math.max(
        window.innerHeight,
        document.documentElement.clientHeight,
      );
      const isMobile = mobileQuery.matches;
      const rise = isMobile
        ? revealProgress(pageEl, viewport)
        : trackProgress(trackEl, viewport);

      const nextRise = (rise >= 0.997 ? 1 : rise).toFixed(4);
      if (nextRise !== lastRise) {
        lastRise = nextRise;
        pageEl.style.setProperty(cssVar, nextRise);
      }

      const events = last || rise > 0.12 ? "auto" : "none";
      if (events !== lastEvents) {
        lastEvents = events;
        pageEl.style.setProperty("--sheet-events", events);
      }

      if (isMobile) {
        clearNavHideSource(navId);
        return;
      }

      const pageRect = pageEl.getBoundingClientRect();
      const fade = 120;
      let navHide = 0;
      if (pageRect.bottom > 0 && pageRect.top < fade) {
        navHide =
          pageRect.top <= 0
            ? clamp01(pageRect.bottom / fade)
            : clamp01((fade - pageRect.top) / fade);
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
