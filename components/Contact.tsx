"use client";

import { useEffect, useRef, useState } from "react";
import { PageSheet } from "@/components/PageSheet";
import { Arrow, Kicker } from "@/components/ui";
import { site } from "@/lib/site";

const links = [
  { label: "Instagram", href: site.social.instagram.url },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "GitHub", href: site.social.github },
  { label: "Email", href: `mailto:${site.social.email}` },
] as const;

function PaperPlane() {
  return (
    <svg className="contact-plane-svg" viewBox="0 0 88 88" aria-hidden="true">
      <path
        className="contact-plane-wing"
        d="M10 44 78 14 42 48 38 72 46 52 78 14"
      />
      <path className="contact-plane-fold" d="M42 48 24 54 10 44" />
      <path className="contact-plane-crease" d="M42 48 78 14" />
    </svg>
  );
}

export function Contact() {
  const [flying, setFlying] = useState(false);
  const launchTimer = useRef<number>(0);

  useEffect(() => {
    return () => window.clearTimeout(launchTimer.current);
  }, []);

  const launch = () => {
    if (flying) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      window.open(site.portfolio, "_blank", "noopener,noreferrer");
      return;
    }

    setFlying(true);
    window.clearTimeout(launchTimer.current);
    launchTimer.current = window.setTimeout(() => {
      window.open(site.portfolio, "_blank", "noopener,noreferrer");
      launchTimer.current = window.setTimeout(() => setFlying(false), 700);
    }, 920);
  };

  return (
    <PageSheet id="contact" zIndex={80} last className="is-contact">
      <div className="contact-page">
        <div className="contact-copy">
          <Kicker index="06" label="Contact" />
          <h2 className="display-title mt-5 max-w-[9ch] text-[clamp(2.6rem,6vw,5.6rem)]">
            Let&apos;s build something meaningful.
          </h2>
          <p className="contact-lead">
            Have an idea?
            <br />
            Want to collaborate?
            <br />
            Just want to connect?
          </p>
          <a href={`mailto:${site.social.email}`} className="contact-mail">
            Get in touch <Arrow />
          </a>
          <ul className="contact-socials">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  {...(link.href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className={flying ? "contact-plane is-flying" : "contact-plane"}
          aria-label="Open the portfolio"
          onClick={launch}
        >
          <span className="contact-plane-pad">
            <span className="contact-plane-wake" aria-hidden="true" />
            <span className="contact-plane-body">
              <PaperPlane />
              <span className="contact-plane-kicker">Open the work</span>
              <span className="contact-plane-title">Portfolio.</span>
              <span className="contact-plane-note">
                Fold, launch, and land in the work.
              </span>
              <span className="contact-plane-go">
                Send it <Arrow />
              </span>
            </span>
          </span>
        </button>
      </div>
    </PageSheet>
  );
}
