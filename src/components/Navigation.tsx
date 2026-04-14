"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Lightbulb, BarChart3, Wallet, LogOut } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";

export function Navigation() {
  const { isConnected, user, openConnectModal, disconnect } = useAuthStore();

  return (
    <header className="w-full border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-[#00FF66]/20 flex items-center justify-center border border-[#00FF66]/50">
            <Terminal className="w-4 h-4 text-[#00FF66]" />
          </div>
          <Link href="/" className="font-heading font-bold text-xl tracking-tight text-white flex items-center gap-1">
            Ipê <span className="text-[#00FF66] opacity-90">Civic</span>
          </Link>
        </div>
        
        <nav className="flex items-center gap-6 text-sm font-medium text-white/70">
          <Link href="/" className="flex items-center gap-2 hover:text-[#00FF66] transition-colors">
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">Propostas</span>
          </Link>
          <Link href="/analytics" className="flex items-center gap-2 hover:text-[#FF00AA] transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Painel de Consenso</span>
          </Link>

          {isConnected && user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/20 text-xs font-mono text-[#00FF66]">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                {user.walletAddress}
              </div>
              <button
                onClick={disconnect}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={openConnectModal}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] hover:bg-[#00FF66]/20 transition-all text-sm font-medium"
            >
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Conectar</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
