import React from "react";
import { ProposalDetailClient } from "@/components/ProposalDetailClient";
import { getProposalById } from "@/app/actions/proposals";

export const revalidate = 0; // Para sempre pegar do DB (MVP)

export default async function ProposalDetailPage({ params }: { params: { id: string } }) {
  const proposalId = params.id;
  const proposal = await getProposalById(proposalId);

  return <ProposalDetailClient proposal={proposal} />;
}
