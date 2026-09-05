"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Container, Kicker } from "@/components/ui";
import { PageSheet } from "@/components/PageSheet";
import { site } from "@/lib/site";

const pillars = [
  { index: "01", label: "Build" },
  { index: "02", label: "Secure" },
  { index: "03", label: "Create" },
] as const;

export function About() {
  return (
    <PageSheet id="about" zIndex={60}>
      <Container className="py-16 md:py-20 lg:py-24">
          <Reveal>
            <Kicker index="01" label="About" />
          </Reveal>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
            <div className="flex min-h-0 flex-col">
              <Reveal delay={80}>
                <h2 className="display-title text-[clamp(2.4rem,5.4vw,5rem)]">
                  More than a
                  <br />
                  tech profile.
                </h2>
              </Reveal>
              <Reveal delay={160}>
                <div className="mt-8 max-w-md space-y-5 text-[1.05rem] leading-relaxed text-muted">
                  <p>
                    I&apos;m a computer science graduate interested in software
                    development, cybersecurity and digital experiences.
                  </p>
                  <p>
                    I like understanding how things work, building things from
                    scratch and continuously pushing my skills further.
                  </p>
                </div>
              </Reveal>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8 lg:mt-auto lg:pt-12">
                {pillars.map((pillar, i) => (
                  <Reveal key={pillar.index} delay={i * 90}>
                    <p className="font-mono text-[11px] tracking-[0.28em] text-electric">
                      {pillar.index}
                    </p>
                    <p className="mt-3 font-mono text-xs tracking-[0.28em] uppercase md:text-sm">
                      {pillar.label}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={200}>
              <figure className="about-still">
                <div className="about-still-frame">
                  <Image
                    src="/images/about-graduate.png"
                    alt={`${site.name} at graduation, holding a computer science diploma`}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover object-[32%_40%]"
                  />
                  <div className="about-still-veil" aria-hidden="true">
                    <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-navy/80 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-navy via-navy/35 to-transparent" />
                    <div className="absolute inset-y-0 right-0 w-[18%] bg-gradient-to-l from-navy/55 to-transparent" />
                  </div>
                </div>
                <figcaption className="mt-4 font-mono text-[10px] tracking-[0.26em] text-paper/45 uppercase">
                  Graduate · Computer Science
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
    </PageSheet>
  );
}
