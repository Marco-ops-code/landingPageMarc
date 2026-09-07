"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";
import { ToolLogo } from "@/components/ToolLogo";
import { PageSheet } from "@/components/PageSheet";
import { Kicker } from "@/components/ui";
import { cn } from "@/lib/cn";
import { toolkit } from "@/lib/site";

const SHORT = ["Dev", "Sys", "Sec", "Tools"] as const;

function Suit({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 14 14" className="toolkit-suit" aria-hidden="true">
        <path d="M7 1.1 12.9 7 7 12.9 1.1 7Z" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 14 14" className="toolkit-suit" aria-hidden="true">
        <rect x="1.6" y="1.6" width="4.4" height="4.4" rx="0.6" />
        <rect x="8" y="1.6" width="4.4" height="4.4" rx="0.6" />
        <rect x="1.6" y="8" width="4.4" height="4.4" rx="0.6" />
        <rect x="8" y="8" width="4.4" height="4.4" rx="0.6" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 14 14" className="toolkit-suit" aria-hidden="true">
        <path d="M7 1.2 13 5.1 10.7 12.4H3.3L1 5.1Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 14 14" className="toolkit-suit is-stroke" aria-hidden="true">
      <path d="M7 1.4v11.2M1.4 7h11.2" />
    </svg>
  );
}

function Corner({ index, label }: { index: number; label: string }) {
  return (
    <div className="toolkit-corner">
      <span>{String(index + 1).padStart(2, "0")}</span>
      <Suit index={index} />
      <span>{label.slice(0, 3)}</span>
    </div>
  );
}

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {dir === "prev" ? (
        <path
          d="M14.5 5.5 8 12l6.5 6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="M9.5 5.5 16 12l-6.5 6.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

export function Toolkit() {
  const [active, setActive] = useState(0);
  const deck = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number } | null>(null);
  const swiped = useRef(false);

  const go = useCallback((index: number) => {
    setActive((index + toolkit.length) % toolkit.length);
  }, []);

  const step = useCallback(
    (delta: -1 | 1) => go(active + delta),
    [active, go],
  );

  const setLiquid = (x: number, y: number, strength: number) => {
    const node = deck.current;
    if (!node) return;
    node.style.setProperty("--liquid-x", `${x.toFixed(2)}%`);
    node.style.setProperty("--liquid-y", `${y.toFixed(2)}%`);
    node.style.setProperty("--liquid-strength", strength.toFixed(3));
  };

  const pointInDeck = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / Math.max(1, rect.width)) * 100,
      y: ((event.clientY - rect.top) / Math.max(1, rect.height)) * 100,
    };
  };

  const startSwipe = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    swiped.current = false;
    drag.current = { id: event.pointerId, x: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = pointInDeck(event);
    setLiquid(point.x, point.y, 1);
  };

  const moveSwipe = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.id !== event.pointerId) {
      if (event.pointerType === "mouse") {
        const point = pointInDeck(event);
        setLiquid(point.x, point.y, 0.95);
      }
      return;
    }
    if (Math.abs(event.clientX - drag.current.x) > 10) swiped.current = true;
    const point = pointInDeck(event);
    setLiquid(point.x, point.y, 1);
  };

  const endSwipe = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (start && start.id === event.pointerId) {
      const delta = event.clientX - start.x;
      if (Math.abs(delta) > 40) {
        swiped.current = true;
        step(delta < 0 ? 1 : -1);
      }
    }
    drag.current = null;
    setLiquid(50, 42, 0.9);
  };

  const pickCard = (index: number) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    go(index);
  };

  useEffect(() => {
    setLiquid(50, 42, 0.9);
  }, []);

  return (
    <PageSheet id="toolkit" zIndex={76} className="is-toolkit">
      <div className="toolkit-page">
        <div className="toolkit-copy">
          <Kicker index="04" label="Toolkit" />
          <h2 className="display-title mt-4 max-w-[9ch] text-[clamp(2.4rem,6vw,5.2rem)]">
            The stack.
          </h2>
        </div>

        <div className="toolkit-table">
          <div
            ref={deck}
            className="toolkit-deck"
            style={{ "--active": active } as CSSProperties}
            role="group"
            aria-roledescription="card deck"
            aria-label="Tool cards"
            onPointerDown={startSwipe}
            onPointerMove={moveSwipe}
            onPointerUp={endSwipe}
            onPointerCancel={endSwipe}
            onPointerLeave={() => setLiquid(50, 42, 0.9)}
          >
            <div className="toolkit-deck-glow" aria-hidden="true" />
            {toolkit.map((group, i) => {
              const delta = i - active;
              return (
                <article
                  key={group.label}
                  className={cn(
                    "toolkit-card",
                    i === active && "is-active",
                    Math.abs(delta) > 1 && "is-far",
                  )}
                  style={
                    {
                      "--i": i,
                      "--delta": delta,
                    } as CSSProperties
                  }
                  aria-hidden={i !== active}
                  onClick={() => pickCard(i)}
                >
                  <div className="toolkit-card-face">
                    <span className="toolkit-card-rim" aria-hidden="true" />
                    <span className="toolkit-card-sheen" aria-hidden="true" />
                    <span
                      className="toolkit-card-liquid"
                      aria-hidden="true"
                      style={
                        {
                          "--orb-x": `${42 + delta * 8}%`,
                          "--orb-y": `${38 + Math.abs(delta) * 6}%`,
                        } as CSSProperties
                      }
                    >
                      <span className="toolkit-card-liquid-core" />
                    </span>
                    <Corner index={i} label={group.label} />
                    <div className="toolkit-card-body">
                      <p className="toolkit-card-title">{group.label}</p>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>
                            <ToolLogo name={item} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="toolkit-card-foot">
                      <Corner index={i} label={group.label} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="toolkit-nav">
            <button
              type="button"
              className="toolkit-nav-arrow"
              aria-label="Previous card"
              onClick={() => step(-1)}
            >
              <Chevron dir="prev" />
            </button>
            <div
              className="toolkit-nav-ticks"
              role="tablist"
              aria-label="Tool groups"
            >
              {toolkit.map((group, i) => (
                <button
                  key={group.label}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={cn("toolkit-nav-tick", i === active && "is-active")}
                  onClick={() => go(i)}
                >
                  <span>{SHORT[i]}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              className="toolkit-nav-arrow"
              aria-label="Next card"
              onClick={() => step(1)}
            >
              <Chevron dir="next" />
            </button>
          </div>
        </div>
        <p className="toolkit-swipe-hint">Swipe · tap a card · use tabs</p>
      </div>
    </PageSheet>
  );
}
