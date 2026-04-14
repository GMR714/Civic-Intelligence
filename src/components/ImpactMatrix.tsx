import React from "react";
import { type ImpactCategory } from "@/lib/store/mockDataStore";
import { ThumbsUp, ThumbsDown, Wallet } from "lucide-react";

interface ImpactMatrixProps {
  helps: ImpactCategory[];
  hurts: ImpactCategory[];
  costs: ImpactCategory[];
}

export function ImpactMatrix({ helps, hurts, costs }: ImpactMatrixProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      
      {/* Quem Ajuda */}
      <div className="glass-panel rounded-xl p-5 border-t-[2px] border-t-[#00FF66]/50 bg-gradient-to-b from-[#00FF66]/5 to-transparent">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-md bg-[#00FF66]/20 text-[#00FF66]">
            <ThumbsUp className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-white">Impacto Positivo</h3>
        </div>
        <ul className="space-y-2">
          {helps.map((item) => (
            <li key={item.id} className="text-sm bg-white/5 py-2 px-3 rounded-md text-white/80 border border-white/5">
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Quem Prejudica */}
      <div className="glass-panel rounded-xl p-5 border-t-[2px] border-t-[#FF00AA]/50 bg-gradient-to-b from-[#FF00AA]/5 to-transparent">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-md bg-[#FF00AA]/20 text-[#FF00AA]">
            <ThumbsDown className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-white">Impacto Negativo</h3>
        </div>
        <ul className="space-y-2">
          {hurts.map((item) => (
            <li key={item.id} className="text-sm bg-white/5 py-2 px-3 rounded-md text-white/80 border border-white/5">
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Custos */}
      <div className="glass-panel rounded-xl p-5 border-t-[2px] border-t-[#E1FF00]/50 bg-gradient-to-b from-[#E1FF00]/5 to-transparent">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-md bg-[#E1FF00]/20 text-[#E1FF00]">
            <Wallet className="w-4 h-4" />
          </div>
          <h3 className="font-semibold text-white">Custos Fiscais</h3>
        </div>
        <ul className="space-y-2">
          {costs.map((item) => (
            <li key={item.id} className="text-sm bg-white/5 py-2 px-3 rounded-md text-white/80 border border-white/5 font-mono text-xs">
              {item.name}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
