"use client";

import { useEffect, useState } from "react";
import { navSocial, site } from "@/lib/site";
import { cn } from "@/lib/cn";

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
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-[background,backdrop-filter,border-color] duration-500",
        scrolled || open
          ? "border-b border-line bg-navy/78 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-5 md:px-10 lg:px-14">
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
                className="font-mono text-[11px] tracking-[0.22em] text-paper/70 uppercase transition-colors hover:text-electric"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="relative h-10 w-10 md:hidden"
          aria-expanded={open}
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
        <div className="border-t border-line bg-navy/96 px-6 py-10 backdrop-blur-xl md:hidden">
          <ul className="space-y-6">
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
            <li>
              <a
                href="#work"
                className="font-mono text-sm tracking-[0.22em] text-electric uppercase"
                onClick={() => setOpen(false)}
              >
                Explore my work
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
