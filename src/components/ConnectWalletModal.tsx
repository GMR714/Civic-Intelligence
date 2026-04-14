"use client";

import React from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { motion, AnimatePresence } from "framer-motion";
import { X, Wallet, Shield, Loader2 } from "lucide-react";

const MOCK_WALLETS = [
  { name: "MetaMask", icon: "🦊", color: "#F6851B" },
  { name: "WalletConnect", icon: "🔗", color: "#3B99FC" },
  { name: "Coinbase Wallet", icon: "🔵", color: "#0052FF" },
];

export function ConnectWalletModal() {
  const { showConnectModal, closeConnectModal, simulateConnect, isConnecting } =
    useAuthStore();

  return (
    <AnimatePresence>
      {showConnectModal && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeConnectModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative glass-panel rounded-2xl p-8 w-full max-w-md mx-4 border border-white/10"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <button
              onClick={closeConnectModal}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30">
                <Wallet className="w-5 h-5 text-[#00FF66]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Conectar Carteira
                </h2>
                <p className="text-xs text-white/50">
                  Identidade anônima via Zero-Knowledge Proof
                </p>
              </div>
            </div>

            {isConnecting ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4">
                <Loader2 className="w-8 h-8 text-[#00FF66] animate-spin" />
                <p className="text-sm text-white/60">
                  Verificando identidade...
                </p>
                <div className="flex items-center gap-2 text-xs text-white/30">
                  <Shield className="w-3 h-3" />
                  <span>ZKP protegido • Dados nunca revelados</span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {MOCK_WALLETS.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={simulateConnect}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all group"
                  >
                    <span className="text-2xl">{wallet.icon}</span>
                    <span className="text-sm font-medium text-white group-hover:text-[#00FF66] transition-colors">
                      {wallet.name}
                    </span>
                  </button>
                ))}

                <p className="text-[11px] text-white/30 text-center pt-3">
                  Ao conectar, você aceita que seus dados demográficos serão
                  protegidos por provas criptográficas de conhecimento zero.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
