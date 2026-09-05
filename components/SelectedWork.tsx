"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PageSheet } from "@/components/PageSheet";
import { Arrow, Kicker } from "@/components/ui";
import { cn } from "@/lib/cn";
import { work } from "@/lib/site";

function Chevron({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="work-orb-chevron">
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

export function SelectedWork() {
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  const [dir, setDir] = useState<"next" | "prev">("next");

  const go = (index: number, direction: "next" | "prev") => {
    if (index === active) return;
    setDir(direction);
    setLeaving(active);
    setActive(index);
  };

  const step = (delta: -1 | 1) => {
    go((active + delta + work.length) % work.length, delta === 1 ? "next" : "prev");
  };

  useEffect(() => {
    if (leaving === null) return;
    const timer = window.setTimeout(() => setLeaving(null), 920);
    return () => window.clearTimeout(timer);
  }, [leaving]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <PageSheet id="work" zIndex={72} className="is-work">
      <div className="work-page">
        <div className="work-page-head">
          <Kicker index="02" label="Selected work" />
          <h2 className="display-title mt-4 text-[clamp(2rem,4.4vw,3.6rem)]">
            What I&apos;ve done
          </h2>
        </div>

        <div className="work-orb-stage">
          <button
            type="button"
            className="work-orb-arrow"
            aria-label="Previous project"
            onClick={() => step(-1)}
          >
            <Chevron dir="prev" />
          </button>

          <div className="work-platter" data-dir={dir}>
            {work.map((item, i) => {
              const state =
                i === active ? "is-active" : i === leaving ? "is-leaving" : "is-wait";

              return (
                <article key={item.index} className={cn("work-disc", state)}>
                  <div className="work-disc-face">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 768px) 70vw, 90vw"
                      className="object-cover"
                    />
                    <span className="work-disc-grooves" aria-hidden="true" />
                    <span className="work-orb-veil" aria-hidden="true" />
                    <svg className="work-orb-ring" viewBox="0 0 100 100" aria-hidden="true">
                      <circle cx="50" cy="50" r="47.5" />
                    </svg>
                    <div className="work-orb-body">
                      <p className="font-mono text-[11px] tracking-[0.28em] text-electric">
                        {item.index}
                      </p>
                      <h3 className="display-title mt-3 max-w-[12ch] text-[clamp(1.8rem,4.2vw,3.4rem)]">
                        {item.title}
                      </h3>
                      <p className="mt-3 font-mono text-[10px] tracking-[0.22em] text-paper/45 uppercase">
                        {item.tags}
                      </p>
                      <p className="work-orb-copy mt-5 max-w-[28ch] text-[0.98rem] leading-relaxed text-muted">
                        {item.description}
                      </p>
                      <a
                        href={item.href}
                        className="mt-6 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-paper uppercase transition-colors hover:text-electric"
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {item.cta} <Arrow />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            className="work-orb-arrow"
            aria-label="Next project"
            onClick={() => step(1)}
          >
            <Chevron dir="next" />
          </button>
        </div>

        <div
          className="work-orb-nav"
          role="listbox"
          aria-label="Selected projects"
          aria-activedescendant={`work-tick-${work[active].index}`}
        >
          {work.map((item, i) => (
            <button
              key={item.index}
              id={`work-tick-${item.index}`}
              type="button"
              role="option"
              aria-selected={i === active}
              className={cn("work-orb-tick", i === active && "is-active")}
              onClick={() => go(i, i > active ? "next" : "prev")}
            >
              {item.index}
            </button>
          ))}
        </div>
      </div>
    </PageSheet>
  );
}
