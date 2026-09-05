"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { assetPath } from "@/lib/base-path";
import { site } from "@/lib/site";

const HELLO_WORDS = ["Hello!", "you're", "welcome."] as const;

export function Hero() {
  const pin = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pinEl = pin.current;
    const stageEl = stage.current;
    if (!pinEl || !stageEl) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      stageEl.style.setProperty("--hero-reveal", "1");
      stageEl.style.setProperty("--hero-hello", "0");
      return;
    }

    let frame = 0;

    const update = () => {
      const scrolled = Math.max(0, -pinEl.getBoundingClientRect().top);
      const revealTrack = window.innerHeight;
      const raw =
        revealTrack <= 0 ? 1 : Math.min(1, scrolled / revealTrack);
      const reveal = raw * raw * (3 - 2 * raw);
      stageEl.style.setProperty("--hero-reveal", reveal.toFixed(4));
      stageEl.style.setProperty("--hero-hello", (1 - reveal).toFixed(4));
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
    };
  }, []);

  return (
    <section ref={pin} className="hero-pin">
      <div ref={stage} className="hero-stage">
        <div className="hero-backdrop" aria-hidden="true">
          <Image
            src={assetPath("/images/hero-portrait.png")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[70%_18%]"
          />
        </div>

        <div className="hero-layout">
          <div className="hero-copy">
            <h1 className="display-title max-w-[11ch] text-[clamp(3.4rem,8vw,6.4rem)] text-paper">
              Software developer
              <span className="block text-paper/55">&amp; cybersecurity</span>
            </h1>
            <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-muted md:text-lg">
              I build digital experiences,
              <br className="hidden sm:block" /> explore technology and grow
              <br className="hidden sm:block" /> through every challenge.
            </p>
            <p className="mt-12 max-w-md border-t border-line pt-5 font-mono text-[10px] tracking-[0.26em] text-paper/45 uppercase">
              Software · Security · Lifestyle
            </p>
          </div>

          <div className="hero-photo">
            <div className="hero-shot">
              <Image
                src={assetPath("/images/hero-portrait.png")}
                alt={`${site.name}, professional studio portrait`}
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover object-[68%_12%]"
              />
            </div>
            <div className="hero-photo-veil pointer-events-none" aria-hidden="true">
              <div className="absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-navy via-navy/45 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-[26%] bg-gradient-to-l from-navy via-navy/32 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-navy via-navy/42 to-transparent" />
            </div>
            <div className="hero-photo-meta">
              <p className="font-mono text-[10px] tracking-[0.26em] text-paper/55 uppercase">
                {site.locationLine}
              </p>
            </div>
          </div>
        </div>

        <p className="hero-hello" aria-hidden="true">
          {HELLO_WORDS.map((word, wordIndex) => {
            const preceding = HELLO_WORDS.slice(0, wordIndex).reduce(
              (count, item) => count + item.length,
              0,
            );

            return (
              <span key={word} className="hero-hello-word">
                {word.split("").map((letter, letterIndex) => (
                  <span
                    key={`${word}-${letterIndex}`}
                    className="hero-hello-letter"
                    style={{
                      animationDelay: `${0.18 + (preceding + letterIndex) * 0.075}s`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            );
          })}
        </p>
      </div>
    </section>
  );
}
