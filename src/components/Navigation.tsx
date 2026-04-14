import React from "react";
import Link from "next/link";
import { Terminal, Lightbulb, BarChart3, Settings } from "lucide-react";

export function Navigation() {
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
            <span>Propostas</span>
          </Link>
          <div className="flex items-center gap-2 hover:text-[#FF00AA] transition-colors cursor-pointer">
            <BarChart3 className="w-4 h-4" />
            <span>Painel de Consenso</span>
          </div>
          <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            <Settings className="w-4 h-4" />
            <span>Ajustes</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
