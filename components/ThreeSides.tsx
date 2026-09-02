import { Reveal } from "@/components/Reveal";
import { Arrow, Container } from "@/components/ui";
import { site } from "@/lib/site";

const sides = [
  {
    index: "01",
    title: "Software",
    body: "Building applications, interfaces and digital products.",
    href: "#work",
    cta: "Explore projects",
    external: false,
  },
  {
    index: "02",
    title: "Cybersecurity",
    body: "Learning security, networks, systems and defensive technologies.",
    href: "#now",
    cta: "Explore my journey",
    external: false,
  },
  {
    index: "03",
    title: "Lifestyle",
    body: "The person behind the screen.",
    href: site.social.instagram.url,
    cta: "Instagram",
    external: true,
  },
] as const;

export function ThreeSides() {
  return (
    <section id="identity" className="relative py-12 md:py-20">
      <Container>
        <Reveal>
          <h2 className="display-title max-w-[10ch] text-[clamp(3rem,7vw,6rem)]">
            Three sides.
            <br />
            One identity.
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
          {sides.map((side, i) => (
            <Reveal key={side.index} delay={i * 110}>
              <a
                href={side.href}
                {...(side.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="side-card group"
              >
                <p className="font-mono text-[11px] tracking-[0.28em] text-electric">
                  {side.index}
                </p>
                <h3 className="mt-16 font-mono text-sm tracking-[0.28em] uppercase">
                  {side.title}
                </h3>
                <p className="mt-6 max-w-[18ch] text-[1.05rem] leading-relaxed text-muted">
                  {side.body}
                </p>
                <span className="mt-auto flex items-center gap-2 pt-16 font-mono text-[11px] tracking-[0.2em] text-paper uppercase">
                  {side.cta} <Arrow />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
