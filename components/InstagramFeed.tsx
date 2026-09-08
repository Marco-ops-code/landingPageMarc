"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import { PageSheet } from "@/components/PageSheet";
import { Arrow, Kicker } from "@/components/ui";
import { cn } from "@/lib/cn";
import { instagramFeed, site } from "@/lib/site";

const moments = [
  { label: "Technology", note: "Late hours, a glowing keyboard." },
  { label: "Security", note: "Hardware, cables, the lab." },
  { label: "Life", note: "Blue hour at the desk." },
] as const;

const STORY_MS = 7000;
const TOTAL = moments.length;

export function InstagramFeed() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ x: number } | null>(null);
  const swiped = useRef(false);
  const moment = moments[active];
  const photo = instagramFeed[active];

  const go = useCallback((index: number) => {
    setActive((index + TOTAL) % TOTAL);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || paused) return;
    const timer = window.setInterval(() => go(active + 1), STORY_MS);
    return () => window.clearInterval(timer);
  }, [active, go, paused]);

  const startSwipe = (event: PointerEvent<HTMLDivElement>) => {
    swiped.current = false;
    drag.current = { x: event.clientX };
    setPaused(true);
  };

  const moveSwipe = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (!start) return;
    if (Math.abs(event.clientX - start.x) > 12) swiped.current = true;
  };

  const endSwipe = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    drag.current = null;
    setPaused(false);
    if (!start) return;
    const delta = event.clientX - start.x;
    if (Math.abs(delta) < 44) return;
    swiped.current = true;
    go(active + (delta < 0 ? 1 : -1));
  };

  return (
    <PageSheet id="instagram" zIndex={74} className="is-mosaic">
      <div className="ig-reel">
        <div className="ig-reel-copy">
          <Kicker index="03" label="Beyond the code" />
          <h2 className="display-title mt-5 max-w-[10ch] text-[clamp(2.4rem,6vw,5.4rem)]">
            Follow the
            <br />
            journey.
          </h2>
          <p className="mt-6 max-w-xs font-mono text-[10px] tracking-[0.22em] text-paper/50 uppercase">
            Technology · Security · Life
          </p>

          <ol className="ig-chapters" aria-label="Journey chapters">
            {moments.map((item, i) => (
              <li key={item.label}>
                <button
                  type="button"
                  className={cn("ig-chapter", i === active && "is-active")}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => go(i)}
                >
                  <span className="ig-chapter-idx">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ig-chapter-label">{item.label}</span>
                  <span
                    className={cn(
                      "ig-chapter-bar",
                      i < active && "is-done",
                      i === active && "is-running",
                      paused && "is-paused",
                    )}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ol>

          <a
            href={site.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-reel-follow"
          >
            Follow @{site.social.instagram.handle} <Arrow />
          </a>
        </div>

        <div
          className="ig-feature"
          onPointerDown={startSwipe}
          onPointerMove={moveSwipe}
          onPointerUp={endSwipe}
          onPointerCancel={() => {
            drag.current = null;
            setPaused(false);
          }}
        >
          <div className="ig-feature-glass">
            <div className="ig-feature-stage">
              {instagramFeed.map((item, i) => (
                <Image
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 48vw, 92vw"
                  className={cn(
                    "ig-feature-photo object-cover",
                    i === active && "is-active",
                  )}
                  priority={i === 0}
                />
              ))}
              <span className="ig-feature-veil" aria-hidden="true" />
              <span className="ig-feature-sheen" aria-hidden="true" />
            </div>

            <div className="ig-feature-meta">
              <p className="ig-feature-index">
                {String(active + 1).padStart(2, "0")} / 0{TOTAL}
              </p>
              <h3 className="ig-feature-title">{moment.label}</h3>
              <p className="ig-feature-note">{moment.note}</p>
              <a
                href={site.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ig-feature-open"
                onClick={(event) => {
                  if (swiped.current) {
                    event.preventDefault();
                    swiped.current = false;
                  }
                }}
              >
                Open on Instagram <Arrow />
              </a>
            </div>
          </div>

          <div className="ig-feature-thumbs" role="listbox" aria-label="Stills">
            {instagramFeed.map((item, i) => (
              <button
                key={item.src}
                type="button"
                role="option"
                aria-selected={i === active}
                className={cn("ig-feature-thumb", i === active && "is-active")}
                onClick={() => go(i)}
              >
                <Image
                  src={item.src}
                  alt={photo === item ? item.alt : ""}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </PageSheet>
  );
}
