import type { Metadata } from "next";
import { Suspense } from "react";
import { PublicFrame } from "../../../components/public-pages/public-shell";
import { PublicSearch } from "../../../components/public-pages/public-search";

export const metadata: Metadata = {
  title: "Recherche · Delifast",
  description: "Recherchez parmi des exemples fictifs de restaurants, produits et commerces.",
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

async function SearchResults({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = Array.isArray(params.q) ? params.q[0] : params.q;
  return <PublicSearch initialQuery={query ?? ""} />;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <PublicFrame active="catalogue">
      <Suspense fallback={<PublicSearch />}>
        <SearchResults searchParams={searchParams} />
      </Suspense>
    </PublicFrame>
  );
}
