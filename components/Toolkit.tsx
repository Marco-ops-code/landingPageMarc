import { Reveal } from "@/components/Reveal";
import { Container, Kicker } from "@/components/ui";
import { cn } from "@/lib/cn";
import { toolkit } from "@/lib/site";

export function Toolkit() {
  return (
    <section id="toolkit" className="relative py-28 md:py-36">
      <Container>
        <Reveal>
          <Kicker index="04" label="Toolkit" />
          <h2 className="display-title mt-8 text-[clamp(2.8rem,6vw,5.4rem)]">
            Currently
            <br />
            building my stack.
          </h2>
        </Reveal>
        <div className="mt-16 grid md:mt-20 md:grid-cols-2">
          {toolkit.map((group, i) => (
            <Reveal
              key={group.label}
              delay={i * 80}
              className={cn(
                "border-t border-line",
                i % 2 === 0 ? "md:border-r md:pr-12" : "md:pl-12",
              )}
            >
              <article className="py-10 md:py-14">
                <p className="font-mono text-[11px] tracking-[0.28em] text-electric uppercase">
                  {group.label}
                </p>
                <p className="mt-5 text-xl tracking-tight text-paper md:text-2xl">
                  {group.items.join(" · ")}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
