import Link from "next/link";
import { legalNav, type LegalPage } from "@/lib/legal";
import { site } from "@/lib/site";

export function LegalDocument({ page }: { page: LegalPage }) {
  return (
    <main className="legal-page relative z-10">
      <div className="legal-shell">
        <p className="kicker">Legal</p>
        <h1 className="display-title legal-title">{page.title}</h1>
        <p className="legal-lead">{page.description}</p>
        <p className="legal-updated">Dernière mise à jour : {page.updated}</p>

        <div className="legal-body">
          {page.sections.map((section) => (
            <section key={section.heading} className="legal-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.list ? (
                <ul>
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <nav className="legal-nav" aria-label="Pages légales">
          {legalNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={item.href.includes(`/${page.slug}/`) ? "is-active" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="legal-actions">
          <Link href="/" className="btn-primary">
            Retour à l’accueil
          </Link>
          <a href={`mailto:${site.social.email}`} className="legal-mail">
            {site.social.email}
          </a>
        </div>
      </div>
    </main>
  );
}
