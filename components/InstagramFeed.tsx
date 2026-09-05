import Image from "next/image";
import type { CSSProperties } from "react";
import { PageSheet } from "@/components/PageSheet";
import { Arrow, Kicker } from "@/components/ui";
import { instagramFeed, site } from "@/lib/site";

export function InstagramFeed() {
  return (
    <PageSheet id="instagram" zIndex={74} className="is-mosaic">
      <div className="ig-mosaic">
        {instagramFeed.map((photo, i) => (
          <a
            key={photo.src}
            href={site.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="ig-mosaic-cell"
            style={{ "--i": i } as CSSProperties}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          </a>
        ))}

        <div className="ig-mosaic-shade" aria-hidden="true" />

        <div className="ig-mosaic-copy">
          <Kicker index="03" label="Beyond the code" />
          <h2 className="display-title mt-5 max-w-[10ch] text-[clamp(2.4rem,6vw,5.4rem)]">
            Follow the
            <br />
            journey.
          </h2>
          <p className="mt-6 max-w-xs font-mono text-[10px] tracking-[0.22em] text-paper/50 uppercase">
            Technology · Lifestyle · Creativity · Life
          </p>
          <a
            href={site.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-paper uppercase transition-colors hover:text-electric"
          >
            Follow @{site.social.instagram.handle} <Arrow />
          </a>
        </div>
      </div>
    </PageSheet>
  );
}
