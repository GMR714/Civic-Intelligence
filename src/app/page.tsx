"use client";

import React from "react";
import { BentoBox } from "@/components/ui/bento-box";
import { SentimentHeatmap } from "@/components/SentimentHeatmap";
import { TopConcerns } from "@/components/TopConcerns";
import { useMockDataStore } from "@/lib/store/mockDataStore";
import Link from "next/link";
import { ArrowRight, Users, Eye } from "lucide-react";

export default function Home() {
  const { proposals } = useMockDataStore.getState(); // Assuming static for the mock presentation

  return (
    <div className="container mx-auto px-6 space-y-8">
      <div className="max-w-3xl">
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Visualizando o Consenso em <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] to-[#E1FF00]">Ipê City</span>
        </h1>
        <p className="text-lg text-white/60">
          Uma abordagem baseada em dados para substituir o ruído das mídias sociais por feedback multidimensional e anonimato focado no argumento.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Proposals */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-heading font-medium text-xl flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#FF00AA]" />
            Propostas Ativas
          </h2>
          
          <div className="grid gap-4">
            {proposals.map((proposal) => (
              <BentoBox key={proposal.id} glowingAccent="none" className="hover:border-white/20 transition-all group">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <h3 className="font-bold text-lg text-white group-hover:text-[#00FF66] transition-colors">
                      {proposal.title}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2">
                      {proposal.abstract}
                    </p>
                  </div>
                  <div className="flex flex-row md:flex-col items-center justify-between gap-4 md:w-32 py-2">
                    <div className="text-center">
                      <div className="text-2xl font-black text-white">{proposal.metrics.approvalRate}%</div>
                      <div className="text-[10px] uppercase tracking-widest text-[#00FF66]">Aprovação</div>
                    </div>
                    <Link 
                      href={`/proposals/${proposal.id}`}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-md text-sm font-medium flex items-center justify-center w-full gap-2 transition-colors border border-white/10"
                    >
                      Ler Análise <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </BentoBox>
            ))}
          </div>
        </div>

        {/* Right Column: Analytics Overview */}
        <div className="space-y-6">
          <h2 className="font-heading font-medium text-xl flex items-center gap-2">
            <Users className="w-5 h-5 text-[#E1FF00]" />
            Panorama da Comunidade
          </h2>

          <BentoBox glowingAccent="magenta">
            <h3 className="text-sm font-medium text-white mb-6">Mapa Geral de Sentimento</h3>
            <SentimentHeatmap />
          </BentoBox>

          <BentoBox glowingAccent="yellow">
            <h3 className="text-sm font-medium text-white">Top Preocupações (IA Extraída)</h3>
            <TopConcerns />
          </BentoBox>
        </div>

      </div>
    </div>
  );
}
