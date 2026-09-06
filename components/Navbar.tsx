"use client";

import { useEffect, useState } from "react";
import { navSocial, site } from "@/lib/site";
import { cn } from "@/lib/cn";

const sectionLinks = [
  { label: "About", href: "#about", index: "01" },
  { label: "Work", href: "#work", index: "02" },
  { label: "Beyond", href: "#instagram", index: "03" },
  { label: "Toolkit", href: "#toolkit", index: "04" },
  { label: "Now", href: "#now", index: "05" },
  { label: "Contact", href: "#contact", index: "06" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : previousOverflow;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header
      className={cn(
        "site-nav fixed top-0 right-0 left-0 z-50 transition-[background,backdrop-filter,border-color] duration-500",
        scrolled || open
          ? "border-b border-line bg-navy/78 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="site-nav-inner mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 md:px-10 lg:px-14">
        <a href="#main" className="leading-[0.92] tracking-[0.18em]">
          <span className="block font-mono text-[11px] text-paper">
            {site.firstName.toUpperCase()}
          </span>
          <span className="block font-mono text-[11px] text-paper/70">
            {site.lastName.toUpperCase()}
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navSocial.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-social-link font-mono text-[11px] tracking-[0.22em] text-paper/70 uppercase transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="site-nav-toggle relative h-10 w-10 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span
            className={cn(
              "absolute top-[14px] left-2 h-px w-6 bg-paper transition-transform",
              open && "translate-y-[5px] rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute top-[24px] left-2 h-px w-6 bg-paper transition-transform",
              open && "-translate-y-[5px] -rotate-45",
            )}
          />
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-navigation"
          className="site-nav-panel border-t border-line bg-navy/96 px-6 py-8 backdrop-blur-xl md:hidden"
        >
          <p className="font-mono text-[10px] tracking-[0.26em] text-paper/40 uppercase">
            Navigate
          </p>
          <ul className="site-nav-sections mt-4">
            {sectionLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  <span>{item.index}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-8 border-t border-line pt-6 font-mono text-[10px] tracking-[0.26em] text-paper/40 uppercase">
            Elsewhere
          </p>
          <ul className="site-nav-socials mt-3">
            {navSocial.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm tracking-[0.22em] uppercase"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
