"use client";

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
          <h2 className="display-title mt-4 max-w-[9ch] text-[clamp(2.4rem,6vw,5.2rem)]">
            The stack.
          </h2>
        </div>

        <ul className="toolkit-orbit" aria-label="Tool stack">
          {toolkit.map((group, i) => (
            <li
              key={group.label}
              className="toolkit-orb"
              style={{ "--i": i } as CSSProperties}
            >
              <article className="toolkit-orb-face">
                <svg className="toolkit-orb-ring" viewBox="0 0 100 100" aria-hidden="true">
                  <circle cx="50" cy="50" r="47.5" />
                </svg>
                <p className="toolkit-orb-index">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="toolkit-orb-title">{group.label}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>
                      <ToolLogo name={item} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
        <p className="toolkit-swipe-hint">Swipe through the stack</p>
      </div>
    </PageSheet>
  );
}
