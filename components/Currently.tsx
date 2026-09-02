import { Reveal } from "@/components/Reveal";
import { Container, Kicker } from "@/components/ui";
import { currently } from "@/lib/site";

export function Currently() {
  return (
    <section id="now" className="relative py-28 md:py-36">
      <Container>
        <div className="grid gap-14 border-y border-line py-16 md:grid-cols-[1fr_1fr] md:items-center md:py-24">
          <Reveal>
            <Kicker index="05" label="Now" />
            <h2 className="display-title mt-8 text-[clamp(2.8rem,6vw,5.4rem)]">
              Currently
              <br />
              learning.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <ul className="space-y-5">
              {currently.map((item) => (
                <li
                  key={item}
                  className="flex items-baseline gap-4 font-mono text-sm tracking-[0.12em] uppercase md:text-base"
                >
                  <span className="text-electric">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-12 font-display text-2xl italic text-paper/80 md:text-3xl">
              Always learning. Never finished.
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
