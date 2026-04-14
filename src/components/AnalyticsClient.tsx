"use client";

import React from "react";
import { useMockDataStore } from "@/lib/store/mockDataStore";
import { BentoBox } from "@/components/ui/bento-box";
import { SentimentHeatmap } from "@/components/SentimentHeatmap";
import { TopConcerns } from "@/components/TopConcerns";
import { motion } from "framer-motion";
import {
  BarChart3,
  Handshake,
  TrendingUp,
  Users,
  ShieldCheck,
  Eye,
  EyeOff,
} from "lucide-react";

function ConsensusFinder() {
  const { consensusPoints } = useMockDataStore();

  return (
    <div className="space-y-4">
      {consensusPoints.map((point, idx) => (
        <motion.div
          key={idx}
          className="glass-panel rounded-xl p-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-white mb-2">
                {point.topic}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {point.groups.map((group) => (
                  <span
                    key={group}
                    className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 border border-white/10 text-white/50 font-mono"
                  >
                    {group}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right shrink-0">
              <div
                className="text-2xl font-black"
                style={{
                  color:
                    point.agreementLevel >= 90
                      ? "#00FF66"
                      : point.agreementLevel >= 75
                      ? "#E1FF00"
                      : "#FF00AA",
                }}
              >
                {point.agreementLevel}%
              </div>
              <div className="text-[9px] uppercase tracking-widest text-white/40">
                Concordância
              </div>
            </div>
          </div>

          <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  point.agreementLevel >= 90
                    ? "linear-gradient(90deg, #00FF6633, #00FF66)"
                    : point.agreementLevel >= 75
                    ? "linear-gradient(90deg, #E1FF0033, #E1FF00)"
                    : "linear-gradient(90deg, #FF00AA33, #FF00AA)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${point.agreementLevel}%` }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ProposalFeedbackSummary({ proposals }: { proposals: any[] }) {
  return (
    <div className="space-y-4">
      {proposals.map((proposal, idx) => {
        // mockando o dimensional feedback localmente ja que no DB pra page analytics precisariamos rodar o agregation de getProposalById para o array inteiro
        const df = proposal.dimensionalFeedback || { fairness: 50, feasibility: 50, economicImpact: 50, environmentalImpact: 50 };
        return (
        <motion.div
          key={proposal.id}
          className="glass-panel rounded-xl p-5 space-y-3"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <div className="flex justify-between items-start">
            <h4 className="text-sm font-semibold text-white max-w-[70%]">
              {proposal.title}
            </h4>
            <span className="text-lg font-black text-[#00FF66]">
              {proposal.metrics.approvalRate}%
            </span>
          </div>

          <div className="space-y-2">
            {[
              {
                label: "Justiça Social",
                value: df.fairness,
                color: "#00FF66",
              },
              {
                label: "Viabilidade",
                value: df.feasibility,
                color: "#E1FF00",
              },
              {
                label: "Impacto Econômico",
                value: df.economicImpact,
                color: "#FF00AA",
              },
              {
                label: "Impacto Ambiental",
                value: df.environmentalImpact,
                color: "#00BFFF",
              },
            ].map((dim) => (
              <div key={dim.label} className="flex items-center gap-3">
                <span className="text-[10px] text-white/40 w-28 shrink-0 truncate">
                  {dim.label}
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${dim.color}33, ${dim.color})`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${dim.value}%` }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                  />
                </div>
                <span className="text-xs font-mono text-white/50 w-8 text-right">
                  {dim.value}
                </span>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-white/30 font-mono">
            {proposal.metrics.totalVotes.toLocaleString("pt-BR")} votos •{" "}
            {proposal.status === "active" ? "Aberta" : "Encerrada"}
          </div>
        </motion.div>
      )})}
    </div>
  );
}

function ThresholdNotice() {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#E1FF00]/5 border border-[#E1FF00]/10">
      <ShieldCheck className="w-5 h-5 text-[#E1FF00] shrink-0 mt-0.5" />
      <div>
        <h4 className="text-sm font-medium text-[#E1FF00] mb-1">
          Threshold Revealing Ativado
        </h4>
        <p className="text-xs text-white/50 leading-relaxed">
          Grupos demográficos com menos de 10 participantes são automaticamente
          ocultados para proteger a privacidade individual.{" "}
          <span className="inline-flex items-center gap-1 text-white/30">
            <EyeOff className="w-3 h-3" /> 2 grupos ocultos
          </span>
        </p>
      </div>
    </div>
  );
}

export function AnalyticsClient({ proposals }: { proposals: any[] }) {
  const totalVotes = proposals.reduce(
    (acc, p) => acc + p.metrics.totalVotes,
    0
  );
  
  const avgApproval = proposals.length > 0 ? Math.round(
    proposals.reduce((acc, p) => acc + p.metrics.approvalRate, 0) /
      proposals.length
  ) : 0;

  return (
    <div className="container mx-auto px-6 space-y-8">
      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Painel de{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF00AA] to-[#E1FF00]">
            Consenso
          </span>
        </h1>
        <p className="text-lg text-white/60">
          Visualização agregada do sentimento comunitário, pontos de
          convergência e feedback multidimensional de todas as propostas ativas.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Votos Totais",
            value: totalVotes.toLocaleString("pt-BR"),
            icon: Users,
            color: "#00FF66",
          },
          {
            label: "Aprovação Média",
            value: `${avgApproval}%`,
            icon: TrendingUp,
            color: "#E1FF00",
          },
          {
            label: "Propostas Ativas",
            value: proposals.filter((p) => p.status === "active").length.toString(),
            icon: Eye,
            color: "#FF00AA",
          },
          {
            label: "Pontos de Consenso",
            value: "4",
            icon: Handshake,
            color: "#00BFFF",
          },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            <BentoBox className="flex flex-col items-center gap-2 py-6">
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                {stat.label}
              </div>
            </BentoBox>
          </motion.div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Consensus Finder + Sentiment */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="font-heading font-medium text-xl flex items-center gap-2">
            <Handshake className="w-5 h-5 text-[#00FF66]" />
            Consensus Finder
            <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-white/40">
              IA Analysis
            </span>
          </h2>
          <ConsensusFinder />

          <h2 className="font-heading font-medium text-xl flex items-center gap-2 pt-4">
            <BarChart3 className="w-5 h-5 text-[#FF00AA]" />
            Feedback por Proposta
          </h2>
          <ProposalFeedbackSummary proposals={proposals} />
        </div>

        {/* Right: Sentiment Heatmap + Top Concerns */}
        <div className="space-y-6">
          <BentoBox glowingAccent="magenta">
            <h3 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
              Mapa de Sentimento Demográfico
            </h3>
            <SentimentHeatmap />
            <div className="mt-4">
              <ThresholdNotice />
            </div>
          </BentoBox>

          <BentoBox glowingAccent="yellow">
            <h3 className="text-sm font-medium text-white">
              Top Preocupações (IA Extraída)
            </h3>
            <TopConcerns />
          </BentoBox>
        </div>
      </div>
    </div>
  );
}
