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
          className="contact-disc"
        >
          <span className="contact-disc-face">
            <span className="contact-disc-grooves" aria-hidden="true" />
            <span className="contact-disc-veil" aria-hidden="true" />
            <svg className="contact-disc-ring" viewBox="0 0 100 100" aria-hidden="true">
              <circle cx="50" cy="50" r="47.5" />
            </svg>
            <span className="contact-disc-body">
              <span className="contact-disc-kicker">Open the work</span>
              <span className="contact-disc-title">Portfolio.</span>
              <span className="contact-disc-note">
                Projects, labs, and the proof behind the brand.
              </span>
              <span className="contact-disc-go">
                Enter <Arrow />
              </span>
            </span>
          </span>
        </a>
      </div>
    </PageSheet>
  );
}
