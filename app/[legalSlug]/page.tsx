import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument } from "@/components/LegalDocument";
import { getLegalPage, legalPages } from "@/lib/legal";

type Props = {
  params: Promise<{ legalSlug: string }>;
};

export function generateStaticParams() {
  return legalPages.map((page) => ({ legalSlug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { legalSlug } = await params;
  const page = getLegalPage(legalSlug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    robots: { index: true, follow: true },
  };
}

export default async function LegalSlugPage({ params }: Props) {
  const { legalSlug } = await params;
  const page = getLegalPage(legalSlug);
  if (!page) notFound();

  return <LegalDocument page={page} />;
}
