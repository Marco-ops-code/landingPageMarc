"use client";

import {
  useEffect,
  useState,
  type CSSProperties,
  type MouseEvent,
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
            className={cn("toolkit-hand", aligned && "is-aligned")}
            aria-expanded={aligned}
          >
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
