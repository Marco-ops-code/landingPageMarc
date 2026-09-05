"use client";

import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Arrow, Container } from "@/components/ui";
import { PageSheet } from "@/components/PageSheet";
import { site } from "@/lib/site";

const sides = [
  {
    index: "01",
    title: "Software",
    body: "Building applications, interfaces and digital products.",
    href: "#work",
    cta: "Explore projects",
    external: false,
    image: "/images/ig-02-code.png",
    alt: "Laptop in the dark with code on screen",
    position: "52% 40%",
  },
  {
    index: "02",
    title: "Cybersecurity",
    body: "Learning security, networks, systems and defensive technologies.",
    href: "#now",
    cta: "Explore my journey",
    external: false,
    image: "/images/ig-04-cyber.png",
    alt: "Network hardware and cables in a server rack",
    position: "50% 55%",
  },
  {
    index: "03",
    title: "Lifestyle",
    body: "The person behind the screen.",
    href: site.social.instagram.url,
    cta: "Instagram",
    external: true,
    image: "/images/ig-03-lifestyle.png",
    alt: "Leather jacket and watch in low light",
    position: "42% 35%",
  },
] as const;

export function ThreeSides() {
  return (
    <PageSheet id="identity" zIndex={70} className="is-triptych">
      <div className="identity-triptych-page">
          <Container className="identity-triptych-head">
            <Reveal>
              <h2 className="display-title max-w-[12ch] text-[clamp(2.2rem,4.6vw,4.2rem)]">
                Three sides. One identity.
              </h2>
            </Reveal>
          </Container>

          <div className="identity-triptych">
            {sides.map((side, i) => (
              <Reveal key={side.index} className="h-full" delay={i * 90}>
                <a
                  href={side.href}
                  {...(side.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="side-panel group"
                >
                  <Image
                    src={side.image}
                    alt={side.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                    style={{ objectPosition: side.position }}
                  />
                  <div className="side-panel-veil" aria-hidden="true" />
                  <div className="side-panel-copy">
                    <p className="font-mono text-[11px] tracking-[0.28em] text-electric">
                      {side.index}
                    </p>
                    <h3 className="mt-3 font-mono text-sm tracking-[0.28em] uppercase">
                      {side.title}
                    </h3>
                    <p className="mt-4 max-w-[20ch] text-[0.98rem] leading-relaxed text-paper/70">
                      {side.body}
                    </p>
                    <span className="mt-6 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-paper uppercase">
                      {side.cta} <Arrow />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
    </PageSheet>
  );
}
