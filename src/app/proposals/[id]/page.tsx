"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useMockDataStore } from "@/lib/store/mockDataStore";
import { BentoBox } from "@/components/ui/bento-box";
import { ImpactMatrix } from "@/components/ImpactMatrix";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2 } from "lucide-react";

export default function ProposalDetailPage() {
  const params = useParams();
  const { proposals } = useMockDataStore();
  const proposalId = params?.id as string;
  
  const proposal = proposals.find(p => p.id === proposalId);

  if (!proposal) {
    return (
      <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold">Proposta não encontrada</h1>
        <Link href="/" className="text-[#00FF66] border border-[#00FF66]/20 px-4 py-2 rounded-md bg-[#00FF66]/10">
          Voltar para inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 space-y-8 max-w-5xl">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Voltar para Dashboard
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70">
            <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse"></span>
            Votação Aberta até 20/04
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {proposal.title}
          </h1>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-4xl font-black text-[#00FF66]">{proposal.metrics.approvalRate}%</div>
          <div className="text-xs uppercase tracking-widest text-white/50">Aprovação Local</div>
          <div className="text-xs font-mono text-white/30 mt-1">{proposal.metrics.totalVotes} votos validados</div>
        </div>
      </div>

      {/* Abstract & ELI5 */}
      <BentoBox className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 p-6 bg-gradient-to-b from-[#00FF66] to-[#E1FF00] h-full opacity-20"></div>
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-[#E1FF00]" />
          <h2 className="font-heading font-semibold text-lg text-white">Resumo Executivo (ELI5)</h2>
        </div>
        <p className="text-white/80 leading-relaxed text-lg">
          {proposal.abstract}
        </p>
      </BentoBox>

      {/* Impact Matrix */}
      <div>
        <h2 className="font-heading font-semibold text-xl text-white mb-4 flex items-center gap-2">
          Matriz de Impacto <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-white/50">IA Extracted</span>
        </h2>
        <ImpactMatrix 
          helps={proposal.impactMatrix.helps} 
          hurts={proposal.impactMatrix.hurts} 
          costs={proposal.impactMatrix.costs} 
        />
      </div>

      {/* Placeholders for Phase 4 items */}
      <BentoBox glowingAccent="none" className="mt-8 border-dashed border-white/20 items-center justify-center py-12">
        <CheckCircle2 className="w-8 h-8 text-white/20 mb-3" />
        <h3 className="text-white/50 font-medium">Área de Votação Multidimensional (Phase 4)</h3>
        <p className="text-white/30 text-sm mt-1">Conecte sua carteira para interagir (Phase 2)</p>
      </BentoBox>

    </div>
  );
}
