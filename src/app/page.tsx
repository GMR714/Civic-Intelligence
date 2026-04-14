import React from "react";
import { getProposals } from "./actions/proposals";
import { DashboardClient } from "@/components/DashboardClient";

// Revalidar a página conforme necessário no app router
export const revalidate = 0; // Para sempre pegar do DB na demo, mas podemos mudar para cached

export default async function Home() {
  const proposals = await getProposals();

  return (
    <DashboardClient proposals={proposals} />
  );
}
