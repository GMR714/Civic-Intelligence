"use client";

import React from "react";
import { useAuthStore, type DemographicStep } from "@/lib/store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, ChevronRight, Fingerprint } from "lucide-react";

const STEP_CONFIG: Record<
  DemographicStep,
  {
    title: string;
    subtitle: string;
    options: { value: string; label: string }[];
    demographicKey: "ageRange" | "education" | "economicStatus" | "politicalOrientation";
  }
> = {
  age: {
    title: "Faixa Etária",
    subtitle: "Usado apenas para análise demográfica agregada",
    demographicKey: "ageRange",
    options: [
      { value: "18-24", label: "18-24 anos" },
      { value: "25-40", label: "25-40 anos" },
      { value: "41-60", label: "41-60 anos" },
      { value: "60+", label: "60+ anos" },
    ],
  },
  education: {
    title: "Nível de Escolaridade",
    subtitle: "Ajuda a entender diferentes perspectivas",
    demographicKey: "education",
    options: [
      { value: "fundamental", label: "Ensino Fundamental" },
      { value: "medio", label: "Ensino Médio" },
      { value: "graduacao", label: "Graduação" },
      { value: "pos", label: "Pós-graduação" },
    ],
  },
  economics: {
    title: "Faixa Econômica",
    subtitle: "Nunca associado à sua carteira",
    demographicKey: "economicStatus",
    options: [
      { value: "baixa", label: "Até 2 salários mínimos" },
      { value: "media", label: "2 a 6 salários mínimos" },
      { value: "alta", label: "6 a 15 salários mínimos" },
      { value: "muito-alta", label: "Acima de 15 salários mínimos" },
    ],
  },
  orientation: {
    title: "Orientação Política",
    subtitle: "Sem julgamento — apenas para mapeamento de consenso",
    demographicKey: "politicalOrientation",
    options: [
      { value: "progressista", label: "Progressista" },
      { value: "moderado", label: "Moderado / Centro" },
      { value: "conservador", label: "Conservador" },
      { value: "nenhum", label: "Prefiro não informar" },
    ],
  },
};

const STEPS_ORDER: DemographicStep[] = ["age", "education", "economics", "orientation"];

export function OnboardingWizard() {
  const {
    showOnboarding,
    currentOnboardingStep,
    user,
    setDemographic,
    nextOnboardingStep,
    completeOnboarding,
  } = useAuthStore();

  if (!showOnboarding || !user) return null;

  const config = STEP_CONFIG[currentOnboardingStep];
  const stepIdx = STEPS_ORDER.indexOf(currentOnboardingStep);
  const selectedValue = user.demographics[config.demographicKey];

  const handleSelect = (value: string) => {
    setDemographic(config.demographicKey, value);
  };

  const handleContinue = () => {
    if (stepIdx < STEPS_ORDER.length - 1) {
      nextOnboardingStep();
    } else {
      completeOnboarding();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

        <motion.div
          className="relative glass-panel rounded-2xl p-8 w-full max-w-lg mx-4 border border-white/10"
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 25 }}
        >
          {/* Progress bar */}
          <div className="flex gap-1.5 mb-8">
            {STEPS_ORDER.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i <= stepIdx ? "bg-[#00FF66]" : "bg-white/10"
                }`}
              />
            ))}
          </div>

          {/* ZKP badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF00AA]/10 border border-[#FF00AA]/20 text-xs font-mono text-[#FF00AA] mb-6">
            <Shield className="w-3 h-3" />
            Zero-Knowledge Proof Protegido
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentOnboardingStep}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-white mb-1">
                {config.title}
              </h2>
              <p className="text-sm text-white/50 mb-6">{config.subtitle}</p>

              <div className="space-y-2">
                {config.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selectedValue === option.value
                        ? "bg-[#00FF66]/10 border-[#00FF66]/50 text-[#00FF66]"
                        : "bg-white/5 border-white/5 text-white/80 hover:bg-white/10 hover:border-white/15"
                    }`}
                  >
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2 text-[11px] text-white/30">
              <Fingerprint className="w-3 h-3" />
              <span>Dados criptografados on-chain</span>
            </div>

            <button
              onClick={handleContinue}
              disabled={!selectedValue}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                selectedValue
                  ? "bg-[#00FF66] text-black hover:bg-[#00FF66]/90"
                  : "bg-white/5 text-white/30 cursor-not-allowed"
              }`}
            >
              {stepIdx < STEPS_ORDER.length - 1 ? "Próximo" : "Concluir"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
