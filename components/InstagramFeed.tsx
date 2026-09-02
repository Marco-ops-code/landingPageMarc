import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { Arrow, Container, Kicker } from "@/components/ui";
import { instagramFeed, site } from "@/lib/site";

export function InstagramFeed() {
  return (
    <section id="instagram" className="relative bg-night/55 py-28 md:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <Reveal>
            <Kicker index="03" label="Beyond the code" />
            <h2 className="display-title mt-8 text-[clamp(2.8rem,6vw,5.4rem)]">
              Follow the
              <br />
              journey.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="display-title text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.15] text-paper/78">
              Technology.
              <br />
              Lifestyle.
              <br />
              Creativity.
              <br />
              Life.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-2 md:mt-20 md:grid-cols-3 md:gap-3">
          {instagramFeed.map((photo, i) => (
            <Reveal key={photo.src} delay={i * 70}>
              <a
                href={site.social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ig-cell group relative block aspect-square overflow-hidden bg-glass"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover"
                />
                <span className="veil absolute inset-0 flex items-end bg-gradient-to-t from-navy/75 to-transparent p-4 font-mono text-[10px] tracking-[0.2em] text-paper uppercase">
                  View on Instagram
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <a
            href={site.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-12"
          >
            Follow @{site.social.instagram.handle} <Arrow />
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
