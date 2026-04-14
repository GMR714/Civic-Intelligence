"use client";

import React, { useState } from "react";
import { BentoBox } from "@/components/ui/bento-box";
import { ImpactMatrix } from "@/components/ImpactMatrix";
import { FeedbackSliders } from "@/components/FeedbackSliders";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  Lightbulb,
  GraduationCap,
  ToggleLeft,
  ToggleRight,
  Calendar,
} from "lucide-react";

export function ProposalDetailClient({ proposal }: { proposal: any }) {
  const [showEli5, setShowEli5] = useState(false);

  if (!proposal) {
    return (
      <div className="container mx-auto px-6 py-12 flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-bold text-white">Proposta não encontrada</h1>
        <Link
          href="/"
          className="text-[#00FF66] border border-[#00FF66]/20 px-4 py-2 rounded-md bg-[#00FF66]/10"
        >
          Voltar para inicio
        </Link>
      </div>
    );
  }

  // Parse Impacts
  const helps = proposal.helps?.map((h: any) => h.name) || [];
  const hurts = proposal.hurts?.map((h: any) => h.name) || [];
  const costs = proposal.costs?.map((c: any) => c.name) || [];

  return (
    <div className="container mx-auto px-6 space-y-8 max-w-5xl">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar para Dashboard
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/10 pb-6">
        <div className="space-y-3 max-w-3xl">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70">
              <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
              {proposal.status === "active" ? "Votação Aberta" : "Encerrada"}
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs text-white/40">
              <Calendar className="w-3 h-3" />
              até {new Date(proposal.deadline).toISOString().split('T')[0]}
            </div>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            {proposal.title}
          </h1>
        </div>

        <div className="flex flex-col items-end">
          <div className="text-4xl font-black text-[#00FF66]">
            {proposal.metrics.approvalRate}%
          </div>
          <div className="text-xs uppercase tracking-widest text-white/50">
            Aprovação Local
          </div>
          <div className="text-xs font-mono text-white/30 mt-1">
            {proposal.metrics.totalVotes.toLocaleString("pt-BR")} votos validados
          </div>
        </div>
      </div>

      <BentoBox className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 bg-gradient-to-b from-[#00FF66] to-[#E1FF00] h-full opacity-20" />
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#E1FF00]" />
            <h2 className="font-heading font-semibold text-lg text-white">
              {showEli5 ? "Explicação Simplificada (ELI5)" : "Resumo Executivo"}
            </h2>
          </div>
          <button
            onClick={() => setShowEli5(!showEli5)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            {showEli5 ? (
              <ToggleRight className="w-4 h-4 text-[#00FF66]" />
            ) : (
              <ToggleLeft className="w-4 h-4" />
            )}
            {showEli5 ? "Ver Técnico" : "Simplificar"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={showEli5 ? "eli5" : "abstract"}
            className="text-white/80 leading-relaxed text-lg pl-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {showEli5 ? proposal.eli5 : proposal.abstract}
          </motion.p>
        </AnimatePresence>
      </BentoBox>

      {proposal.smeNotes?.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-heading font-semibold text-lg text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-[#FF00AA]" />
            Notas de Especialistas Verificados
            <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-white/40">
              Neutro e Objetivo
            </span>
          </h2>
          <div className="grid gap-3">
            {proposal.smeNotes.map((note: any, idx: number) => (
              <motion.div
                key={idx}
                className="glass-panel rounded-xl p-5 border-l-2 border-l-[#FF00AA]/40"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold text-white">
                    {note.author}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF00AA]/10 border border-[#FF00AA]/20 text-[#FF00AA] font-mono">
                    {note.credential}
                  </span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  {note.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Trocamos ImpactMatrix para receber mapeado ou mock */}
      <div>
        <h2 className="font-heading font-semibold text-xl text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-[#E1FF00]" />
          Matriz de Impacto
          <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-white/50">
            IA Extracted
          </span>
        </h2>
        
        {/* Se o banco não tem impactos pois o seed foi básico, moca para visualização na V2 */}
        <ImpactMatrix
          helps={helps.length > 0 ? helps : ["Comerciantes locais", "Turistas", "Comunidade do Rio Tavares"]}
          hurts={hurts.length > 0 ? hurts : ["Proprietários rurais (com desapropriação)", "Motoristas durante as obras"]}
          costs={costs.length > 0 ? costs : ["R$ 15 Milhões (Aumento de IPTU Comercial)"]}
        />
      </div>

      <div className="pt-4 border-t border-white/10">
        <FeedbackSliders
          proposalId={proposal.id}
          currentFeedback={proposal.dimensionalFeedback}
        />
      </div>
    </div>
  );
}
