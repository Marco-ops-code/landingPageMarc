"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Arrow } from "@/components/ui";
import { site } from "@/lib/site";

export function Hero() {
  const frame = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = frame.current;
    const light = glow.current;
    if (!node || !light) return;

    const onMove = (event: MouseEvent) => {
      const rect = node.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      light.style.background = `radial-gradient(420px circle at ${x}% ${y}%, rgba(79,107,255,0.28), transparent 55%)`;
    };

    node.addEventListener("mousemove", onMove);
    return () => node.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="relative flex min-h-dvh items-center pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-14 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-14">
        <div>
          <h1 className="display-title max-w-[11ch] text-[clamp(3.4rem,8vw,6.4rem)] text-paper">
            Software developer
            <span className="block text-paper/55">&amp; cybersecurity</span>
          </h1>
          <p className="mt-8 max-w-md text-[1.05rem] leading-relaxed text-muted md:text-lg">
            I build digital experiences,
            <br className="hidden sm:block" /> explore technology and grow
            <br className="hidden sm:block" /> through every challenge.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#work" className="btn-primary">
              Explore my work
            </a>
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Instagram <Arrow />
            </a>
          </div>
        </div>

        <div className="lg:justify-self-end">
          <div
            ref={frame}
            className="relative max-w-[460px]"
          >
            <div
              ref={glow}
              className="pointer-events-none absolute -inset-10 -z-10 rounded-full opacity-90"
              style={{
                background:
                  "radial-gradient(420px circle at 70% 30%, rgba(79,107,255,0.28), transparent 55%)",
              }}
              aria-hidden="true"
            />
            <div className="relative overflow-hidden border border-line bg-glass">
              <div className="relative aspect-[3/4]">
                <Image
                  src="/images/hero-portrait.png"
                  alt={`${site.name}, professional studio portrait`}
                  fill
                  priority
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover object-[center_20%]"
                />
              </div>
            </div>
            <div className="mt-5 flex items-start justify-between gap-6">
              <p className="font-mono text-[10px] tracking-[0.26em] text-paper/55 uppercase">
                {site.locationLine}
              </p>
              <p className="max-w-[16ch] text-right font-mono text-[10px] tracking-[0.22em] text-paper/45 uppercase">
                Software · Security · Lifestyle
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
