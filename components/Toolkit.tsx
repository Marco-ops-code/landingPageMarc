"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { ToolLogo } from "@/components/ToolLogo";
import { PageSheet } from "@/components/PageSheet";
import { Kicker } from "@/components/ui";
import { cn } from "@/lib/cn";
import { toolkit } from "@/lib/site";

const FAN = ["-30deg", "-10deg", "10deg", "30deg"] as const;
const SHIFT = ["-9.4rem", "-3.15rem", "3.15rem", "9.4rem"] as const;

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

export function Toolkit() {
  const [aligned, setAligned] = useState(false);
  const hand = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; y: number } | null>(null);

  const setLiquid = (x: number, y: number, strength: number, tilt: number) => {
    const node = hand.current;
    if (!node) return;
    node.style.setProperty("--liquid-x", `${x.toFixed(2)}%`);
    node.style.setProperty("--liquid-y", `${y.toFixed(2)}%`);
    node.style.setProperty("--liquid-strength", strength.toFixed(3));
    node.style.setProperty("--swipe-tilt", `${tilt.toFixed(2)}deg`);
  };

  const pointInHand = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / Math.max(1, rect.width)) * 100,
      y: ((event.clientY - rect.top) / Math.max(1, rect.height)) * 100,
    };
  };

  const startLiquid = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = pointInHand(event);
    setLiquid(point.x, point.y, 0.85, 0);
  };

  const moveLiquid = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    if (!start || start.id !== event.pointerId) return;
    const point = pointInHand(event);
    const tilt = Math.max(-14, Math.min(14, (event.clientX - start.x) * 0.08));
    setLiquid(point.x, point.y, 1, tilt);
  };

  const endLiquid = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.id !== event.pointerId) return;
    drag.current = null;
    setLiquid(50, 42, 0, 0);
  };

  const selectCard = (event: MouseEvent<HTMLButtonElement>) => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      event.currentTarget.closest<HTMLElement>(".toolkit-card")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "nearest",
        inline: "center",
      });
      return;
    }

    setAligned(true);
  };

  useEffect(() => {
    if (!aligned) return;

    const fold = () => setAligned(false);

    const timer = window.setTimeout(() => {
      window.addEventListener("scroll", fold, { passive: true });
    }, 80);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", fold);
    };
  }, [aligned]);

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
            ref={hand}
            className={cn("toolkit-hand", aligned && "is-aligned")}
            aria-expanded={aligned}
            onPointerDown={startLiquid}
            onPointerMove={moveLiquid}
            onPointerUp={endLiquid}
            onPointerCancel={endLiquid}
          >
            <span className="toolkit-liquid" aria-hidden="true" />
            {toolkit.map((group, i) => (
              <article
                key={group.label}
                className="toolkit-card"
                style={
                  {
                    "--i": i,
                    "--fan": FAN[i],
                    "--shift": SHIFT[i],
                  } as CSSProperties
                }
              >
                <button
                  type="button"
                  className="toolkit-card-hit"
                  aria-pressed={aligned}
                  aria-label={`${group.label}: ${group.items.join(", ")}`}
                  onClick={selectCard}
                />
                <div className="toolkit-card-lift" aria-hidden="true">
                  <div className="toolkit-card-flip">
                    <div className="toolkit-card-front">
                      <span className="toolkit-card-sheen" />
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
                    <div className="toolkit-card-back" aria-hidden="true" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <p className="toolkit-swipe-hint">Swipe the hand</p>
      </div>
    </PageSheet>
  );
}
