"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "marc-legal-notice";

export function LegalNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) !== "1") {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="legal-notice" role="dialog" aria-label="Information cookies et analytique">
      <p>
        Ce site n’utilise pas de cookies publicitaires ni de suivi analytique tiers.
        Stockage local éventuel : mémorisation de ce bandeau.{" "}
        <Link href="/politique-de-cookies/">Cookies</Link>
        {" · "}
        <Link href="/suivi-analytique/">Analytique</Link>
      </p>
      <button type="button" className="btn-primary" onClick={dismiss}>
        Compris
      </button>
    </div>
  );
}
