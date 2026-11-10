import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminDemoScreens from "../admin-demo-screens";
import { getAdminDemoStaticParams, isKnownAdminDemoPath } from "../admin-demo-routes";

export const metadata: Metadata = {
  title: "Administration · démonstration | Delifast",
  description: "Écrans d’administration fictifs de Delifast, sans compte réel, API ni persistance.",
};

export function generateStaticParams() {
  return getAdminDemoStaticParams();
}

type AdminDemoRouteProps = {
  params: Promise<{ segments?: string[] }>;
};

export default async function AdminDemoRoute({ params }: AdminDemoRouteProps) {
  const { segments = [] } = await params;
  if (!isKnownAdminDemoPath(segments)) notFound();
  return <AdminDemoScreens segments={segments} />;
}
