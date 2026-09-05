import { PageSheet } from "@/components/PageSheet";
import { Arrow, Kicker } from "@/components/ui";
import { site } from "@/lib/site";

const links = [
  { label: "Instagram", href: site.social.instagram.url },
  { label: "LinkedIn", href: site.social.linkedin },
  { label: "GitHub", href: site.social.github },
  { label: "Email", href: `mailto:${site.social.email}` },
] as const;

export function Contact() {
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

        <a
          href={site.portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-window"
        >
          <span className="contact-window-bar">
            <span className="contact-window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>portfolio.exe</span>
          </span>
          <span className="contact-window-body">
            <span className="contact-window-kicker">Open the work</span>
            <span className="contact-window-title">Portfolio.</span>
            <span className="contact-window-note">
              Projects, labs, and the proof behind the brand.
            </span>
            <span className="contact-window-go">
              Enter <Arrow />
            </span>
          </span>
        </a>
      </div>
    </PageSheet>
  );
}
