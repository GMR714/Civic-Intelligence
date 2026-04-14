"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sliders, Send, MessageSquare } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";
import { submitVote } from "@/app/actions/proposals";

interface FeedbackDimension {
  key: string;
  label: string;
  description: string;
  color: string;
}

const DIMENSIONS: FeedbackDimension[] = [
  {
    key: "fairness",
    label: "Justiça Social",
    description: "Essa proposta beneficia a comunidade de forma equitativa?",
    color: "#00FF66",
  },
  {
    key: "feasibility",
    label: "Viabilidade",
    description: "É tecnicamente e logisticamente realizável?",
    color: "#E1FF00",
  },
  {
    key: "economicImpact",
    label: "Impacto Econômico",
    description: "O custo-benefício é aceitável para o município?",
    color: "#FF00AA",
  },
  {
    key: "environmentalImpact",
    label: "Impacto Ambiental",
    description: "Contribui positivamente para o meio ambiente?",
    color: "#00BFFF",
  },
];

const DISAPPROVAL_REASONS = [
  "Custo excessivo para os contribuintes",
  "Beneficia apenas uma parcela da população",
  "Impacto ambiental negativo não endereçado",
  "Falta de estudos técnicos aprofundados",
  "Alternativas melhores não foram consideradas",
  "Conflito com outras prioridades da cidade",
  "Prazo de implementação irrealista",
  "Risco de gentrificação",
];

interface FeedbackSlidersProps {
  proposalId: string;
  currentFeedback: {
    fairness: number;
    feasibility: number;
    economicImpact: number;
    environmentalImpact: number;
  };
}

export function FeedbackSliders({ proposalId, currentFeedback }: FeedbackSlidersProps) {
  const { isConnected } = useAuthStore();
  const [values, setValues] = useState<Record<string, number>>({
    fairness: 50,
    feasibility: 50,
    economicImpact: 50,
    environmentalImpact: 50,
  });
  const [showDisapproval, setShowDisapproval] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [textFeedback, setTextFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSliderChange = (key: string, value: number) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    // Check if any value is below 30 to suggest disapproval reasons
    if (value < 30 && !showDisapproval) {
      setShowDisapproval(true);
    }
  };

  const toggleReason = (reason: string) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmit = async () => {
    if (!isConnected) return;
    try {
      await submitVote({
        proposalId,
        walletAddress: "0x7a3F...e92B", // Mocked as Wagmi isn't fully integrated yet, keeping the seed wallet
        fairness: values.fairness,
        feasibility: values.feasibility,
        economicImpact: values.economicImpact,
        environmentalImpact: values.environmentalImpact,
        disapprovalReasons: selectedReasons,
        feedbackText: textFeedback
      });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  if (!isConnected) {
    return (
      <div className="glass-panel rounded-2xl p-8 flex flex-col items-center justify-center gap-4 border-dashed border-white/20">
        <Sliders className="w-10 h-10 text-white/20" />
        <h3 className="text-white/50 font-medium text-lg">
          Votação Multidimensional
        </h3>
        <p className="text-white/30 text-sm text-center max-w-md">
          Conecte sua carteira para deslizar seus votos em cada dimensão da
          proposta. Seu feedback é anônimo via Zero-Knowledge Proof.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Dimensional Sliders */}
      <div className="glass-panel rounded-2xl p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#E1FF00]" />
            <h3 className="font-semibold text-white">
              Sua Avaliação Multidimensional
            </h3>
          </div>
          {/* Show aggregate */}
          <span className="text-xs font-mono text-white/30">
            Comunidade: {currentFeedback.fairness}% média
          </span>
        </div>

        {DIMENSIONS.map((dim) => (
          <div key={dim.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span
                  className="text-sm font-medium"
                  style={{ color: dim.color }}
                >
                  {dim.label}
                </span>
                <p className="text-xs text-white/40">{dim.description}</p>
              </div>
              <span className="text-lg font-mono font-bold text-white w-12 text-right">
                {values[dim.key]}
              </span>
            </div>

            {/* Custom slider with gradient track */}
            <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${dim.color}33, ${dim.color})`,
                  width: `${values[dim.key]}%`,
                }}
                animate={{ width: `${values[dim.key]}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={values[dim.key]}
              onChange={(e) =>
                handleSliderChange(dim.key, parseInt(e.target.value))
              }
              className="w-full h-2 appearance-none bg-transparent cursor-pointer -mt-2 relative z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:cursor-pointer"
            />
          </div>
        ))}
      </div>

      {/* Disapproval Matrix */}
      {showDisapproval && (
        <motion.div
          className="glass-panel rounded-2xl p-6 space-y-4 border-t-2 border-t-[#FF00AA]/50"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-[#FF00AA] flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Por que você discorda? (selecione o que se aplica)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {DISAPPROVAL_REASONS.map((reason) => (
              <button
                key={reason}
                onClick={() => toggleReason(reason)}
                className={`text-left p-3 rounded-lg text-sm transition-all border ${
                  selectedReasons.includes(reason)
                    ? "bg-[#FF00AA]/10 border-[#FF00AA]/30 text-[#FF00AA]"
                    : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {reason}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Text feedback */}
      <div className="glass-panel rounded-2xl p-6 space-y-3">
        <h3 className="text-sm font-medium text-white/70">
          Comentário opcional
        </h3>
        <textarea
          value={textFeedback}
          onChange={(e) => setTextFeedback(e.target.value)}
          placeholder="Compartilhe seu raciocínio de forma construtiva..."
          className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-white/90 placeholder-white/30 resize-none h-24 focus:outline-none focus:border-[#00FF66]/30"
        />
      </div>

      {/* Submit */}
      <motion.button
        onClick={handleSubmit}
        className={`w-full py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all ${
          submitted
            ? "bg-[#00FF66] text-black"
            : "bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] hover:bg-[#00FF66]/20"
        }`}
        whileTap={{ scale: 0.98 }}
      >
        <Send className="w-4 h-4" />
        {submitted ? "Feedback enviado com sucesso!" : "Submeter Avaliação"}
      </motion.button>
    </motion.div>
  );
}
