import type { CSSProperties } from "react";
import { ToolLogo } from "@/components/ToolLogo";
import { PageSheet } from "@/components/PageSheet";
import { Kicker } from "@/components/ui";
import { toolkit } from "@/lib/site";

const faces = [
  { rank: "A", suit: "spade" },
  { rank: "K", suit: "club" },
  { rank: "Q", suit: "diamond" },
  { rank: "J", suit: "heart" },
] as const;

type SuitName = (typeof faces)[number]["suit"];

function Suit({ name }: { name: SuitName }) {
  if (name === "spade") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.2C8.4 7.1 4.2 10.6 4.2 14.4c0 2.8 2.1 4.6 4.6 4.6 1 0 1.8-.3 2.4-.8-.2 1.1-.7 2.2-1.7 3h5c-1-.8-1.5-1.9-1.7-3 .6.5 1.4.8 2.4.8 2.5 0 4.6-1.8 4.6-4.6 0-3.8-4.2-7.3-7.8-12.2Z" />
      </svg>
    );
  }

  if (name === "club") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.1a3.7 3.7 0 1 0 1.5 7.1 3.7 3.7 0 1 0 2.7 6.2H13.4c.2 1.2.7 2.3 1.8 3.1h-6.4c1.1-.8 1.6-1.9 1.8-3.1H7.8A3.7 3.7 0 1 0 10.5 10a3.7 3.7 0 1 0 1.5-6.9Z" />
      </svg>
    );
  }

  if (name === "diamond") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.2 20.4 12 12 21.8 3.6 12Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 21.4S3.4 14.2 3.4 8.8A4.5 4.5 0 0 1 12 6.6a4.5 4.5 0 0 1 8.6 2.2c0 5.4-8.6 12.6-8.6 12.6Z" />
    </svg>
  );
}

function Pip({ rank, suit }: { rank: string; suit: SuitName }) {
  return (
    <span className="toolkit-pip" aria-hidden="true">
      <b>{rank}</b>
      <Suit name={suit} />
    </span>
  );
}

export function Toolkit() {
  return (
    <PageSheet id="toolkit" zIndex={76} className="is-toolkit">
      <div className="toolkit-page">
        <div className="toolkit-copy">
          <div>
            <Kicker index="04" label="Toolkit" />
            <h2 className="display-title mt-4 max-w-[9ch] text-[clamp(2.2rem,5.4vw,4.6rem)]">
              The stack.
            </h2>
          </div>
          <p className="toolkit-aside">Four hands. One table.</p>
        </div>

        <div className="toolkit-grid" aria-label="Tool groups">
          {toolkit.map((group, i) => {
            const face = faces[i] ?? faces[0];

            return (
              <article
                key={group.label}
                className="toolkit-card"
                style={{ "--i": i } as CSSProperties}
              >
                <span className="toolkit-card-sheen" aria-hidden="true" />
                <Pip rank={face.rank} suit={face.suit} />
                <span className="toolkit-suit-face" aria-hidden="true">
                  <Suit name={face.suit} />
                </span>
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
                <span className="toolkit-pip is-inverted" aria-hidden="true">
                  <b>{face.rank}</b>
                  <Suit name={face.suit} />
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </PageSheet>
  );
}
