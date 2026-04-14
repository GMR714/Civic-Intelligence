"use client";

import React from "react";
import { useMockDataStore } from "@/lib/store/mockDataStore";

export function SentimentHeatmap() {
  const { communitySentiment } = useMockDataStore();

  const getHeatmapColor = (approval: number) => {
    if (approval >= 75) return "bg-[#00FF66]/20 border-[#00FF66]/50 text-[#00FF66]";
    if (approval >= 50) return "bg-white/5 border-white/10 text-white/80";
    return "bg-[#FF00AA]/20 border-[#FF00AA]/50 text-[#FF00AA]";
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-wider text-white/50 uppercase">Aprovação por Idade</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {communitySentiment.ageGroups.map((group) => (
            <div key={group.name} className={`flex flex-col items-center justify-center p-3 rounded-lg border ${getHeatmapColor(group.approval)}`}>
              <span className="text-xs opacity-70 mb-1">{group.name}</span>
              <span className="text-lg font-bold">{group.approval}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-semibold tracking-wider text-white/50 uppercase">Renda Estimada</h3>
        <div className="grid grid-cols-3 gap-2">
          {communitySentiment.economicStatus.map((group) => (
            <div key={group.name} className={`flex flex-col items-center justify-center p-3 rounded-lg border ${getHeatmapColor(group.approval)}`}>
              <span className="text-xs opacity-70 mb-1 truncate w-full text-center">{group.name}</span>
              <span className="text-lg font-bold">{group.approval}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
