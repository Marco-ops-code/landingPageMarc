"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePageRise } from "@/hooks/usePageRise";
import { legalNav } from "@/lib/legal";
import { site } from "@/lib/site";

export function Footer() {
  const page = useRef<HTMLElement>(null);
  usePageRise(page, "--page-rise", "footer");

  return (
    <footer ref={page} role="contentinfo" className="site-footer border-t border-line py-12">
      <div className="site-footer-inner flex flex-col gap-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase">
              {site.name}
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.22em] text-paper/45 uppercase">
              Software · Cybersecurity · Lifestyle
            </p>
          </div>
          <div className="space-y-2 text-left md:text-right">
            <p className="font-mono text-[10px] tracking-[0.18em] text-paper/45 uppercase">
              © {new Date().getFullYear()} {site.name}
            </p>
            <p className="font-display text-sm italic text-paper/55">
              Designed &amp; built with intention.
            </p>
          </div>
        </div>

        <nav className="site-footer-legal" aria-label="Informations légales">
          {legalNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
