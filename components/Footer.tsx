import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative z-[82] border-t border-line py-12">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between md:px-10 lg:px-14">
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
    </footer>
  );
}
