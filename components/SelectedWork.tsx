import { Reveal } from "@/components/Reveal";
import { Arrow, Container, Kicker } from "@/components/ui";
import { work } from "@/lib/site";

export function SelectedWork() {
  return (
    <section id="work" className="relative py-28 md:py-36">
      <Container>
        <Reveal>
          <Kicker index="02" label="Selected work" />
          <h2 className="display-title mt-8 text-[clamp(2.8rem,6vw,5.4rem)]">
            What I&apos;ve been
            <br />
            building.
          </h2>
        </Reveal>
        <div className="mt-16 border-t border-line md:mt-20">
          {work.map((project, i) => (
            <Reveal key={project.index} delay={i * 80}>
              <a
                href={project.href}
                className="work-row group grid gap-4 border-b border-line py-10 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-12 md:py-12"
                {...(project.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <p className="font-mono text-[11px] tracking-[0.28em] text-electric">
                  {project.index}
                </p>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] text-paper/45 uppercase">
                    {project.tags}
                  </p>
                  <h3 className="work-title mt-3 text-2xl tracking-tight transition-colors duration-500 md:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
                    {project.description}
                  </p>
                </div>
                <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-paper/70 uppercase transition-colors group-hover:text-electric">
                  {project.cta} <Arrow />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
