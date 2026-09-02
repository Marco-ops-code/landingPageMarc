import { Reveal } from "@/components/Reveal";
import { Container, Kicker } from "@/components/ui";

const pillars = [
  { index: "01", label: "Build" },
  { index: "02", label: "Secure" },
  { index: "03", label: "Create" },
] as const;

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <Container>
        <Reveal>
          <Kicker index="01" label="About" />
        </Reveal>
        <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <Reveal delay={80}>
            <h2 className="display-title text-[clamp(2.8rem,6vw,5.4rem)]">
              More than a
              <br />
              tech profile.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <div className="max-w-md space-y-6 pt-2 text-[1.05rem] leading-relaxed text-muted lg:pt-4">
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
        </div>
        <div className="mt-20 grid grid-cols-3 gap-6 border-t border-line pt-10 md:mt-28">
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
      </Container>
    </section>
  );
}
