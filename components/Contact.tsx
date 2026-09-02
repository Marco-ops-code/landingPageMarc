import { Reveal } from "@/components/Reveal";
import { Arrow, Container } from "@/components/ui";
import { site } from "@/lib/site";

const links = [
  { label: "Instagram", href: site.social.instagram.url },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "GitHub", href: site.social.github },
  { label: "Email", href: `mailto:${site.social.email}` },
] as const;

export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40">
      <Container>
        <Reveal>
          <h2 className="display-title max-w-[9ch] text-[clamp(3.4rem,8vw,7rem)]">
            Let&apos;s build something meaningful.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-10 max-w-sm text-lg leading-relaxed text-muted">
            Have an idea?
            <br />
            Want to collaborate?
            <br />
            Just want to connect?
          </p>
          <a href={`mailto:${site.social.email}`} className="btn-primary mt-10">
            Get in touch <Arrow />
          </a>
        </Reveal>
        <div className="mt-24 grid grid-cols-2 gap-y-6 md:max-w-md">
          {links.map((link, i) => (
            <Reveal key={link.label} delay={i * 60}>
              <a
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-mono text-[12px] tracking-[0.22em] text-paper/70 uppercase transition-colors hover:text-electric"
              >
                {link.label}
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
