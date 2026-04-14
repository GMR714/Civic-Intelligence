import React from "react";
import { getProposals } from "@/app/actions/proposals";
import { AnalyticsClient } from "@/components/AnalyticsClient";

export const revalidate = 0;

export default async function AnalyticsPage() {
  const proposals = await getProposals();

  // Para evitar sobrecargas de prop, poderíamos buscar as Proposal metrics separadamente
  // Mas como a V1 usava estado global (proposals), aqui replicamos via getProposals()

  return <AnalyticsClient proposals={proposals} />;
}
