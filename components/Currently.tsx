import type { CSSProperties } from "react";
import { PageSheet } from "@/components/PageSheet";
import { ToolLogo } from "@/components/ToolLogo";
import { Kicker } from "@/components/ui";
import { currently } from "@/lib/site";

export function Currently() {
  return (
    <PageSheet id="now" zIndex={78} className="is-now">
      <div className="now-page">
        <div className="now-copy">
          <Kicker index="05" label="Now" />
          <h2 className="display-title mt-4 max-w-[10ch] text-[clamp(2.2rem,5.4vw,4.8rem)]">
            Currently
            <br />
            learning.
          </h2>
          <p className="now-foot">Always learning. Never finished.</p>
        </div>

        <ul className="now-grid">
          {currently.map((item, i) => (
            <li
              key={item.title}
              className="now-tile"
              style={{ "--i": i } as CSSProperties}
            >
              <span className="now-tile-idx">{String(i + 1).padStart(2, "0")}</span>
              <span className="now-liquid" aria-hidden="true">
                <span className="now-liquid-core" />
              </span>
              <span className="now-logo">
                <ToolLogo name={item.logo} />
              </span>
              <p>{item.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </PageSheet>
  );
}
