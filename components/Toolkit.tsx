import type { CSSProperties } from "react";
import { ToolLogo } from "@/components/ToolLogo";
import { PageSheet } from "@/components/PageSheet";
import { Kicker } from "@/components/ui";
import { toolkit } from "@/lib/site";

export function Toolkit() {
  return (
    <PageSheet id="toolkit" zIndex={76} className="is-toolkit">
      <div className="toolkit-page">
        <div className="toolkit-copy">
          <Kicker index="04" label="Toolkit" />
          <h2 className="display-title mt-4 max-w-[9ch] text-[clamp(2.2rem,5.4vw,4.6rem)]">
            The stack.
          </h2>
        </div>

        <div className="toolkit-grid" aria-label="Tool groups">
          {toolkit.map((group, i) => (
            <article
              key={group.label}
              className="toolkit-card"
              style={{ "--i": i } as CSSProperties}
            >
              <span className="toolkit-card-sheen" aria-hidden="true" />
              <header className="toolkit-card-head">
                <span>{String(i + 1).padStart(2, "0")}</span>
                <p>{group.label}</p>
              </header>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <ToolLogo name={item} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </PageSheet>
  );
}
