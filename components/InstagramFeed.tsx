import Image from "next/image";
import type { CSSProperties } from "react";
import { PageSheet } from "@/components/PageSheet";
import { Arrow, Kicker } from "@/components/ui";
import { instagramFeed, site } from "@/lib/site";

const moments = ["Night", "Technology", "Style", "Security", "Street", "Life"] as const;

export function InstagramFeed() {
  return (
    <PageSheet id="instagram" zIndex={74} className="is-mosaic">
      <div className="ig-neo">
        <div className="ig-neo-copy">
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
            className="ig-neo-follow"
          >
            Follow @{site.social.instagram.handle} <Arrow />
          </a>
        </div>

        <div className="ig-neo-grid">
          {instagramFeed.map((photo, i) => (
            <a
              key={photo.src}
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ig-neo-card"
              style={{ "--i": i } as CSSProperties}
            >
              <span className="ig-neo-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="ig-neo-photo">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 22vw, 42vw"
                  className="object-cover"
                />
              </span>
              <span className="ig-neo-meta">
                <span>{moments[i]}</span>
                <Arrow />
              </span>
            </a>
          ))}
        </div>
      </div>
    </PageSheet>
  );
}
