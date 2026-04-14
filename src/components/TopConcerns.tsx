"use client";

import React from "react";
import { useMockDataStore } from "@/lib/store/mockDataStore";
import { MessageSquareWarning } from "lucide-react";

export function TopConcerns() {
  const { topConcerns } = useMockDataStore();

  return (
    <ul className="space-y-3 mt-4">
      {topConcerns.map((concern, idx) => (
        <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
          <MessageSquareWarning className="w-5 h-5 text-[#E1FF00] shrink-0 mt-0.5" />
          <span className="text-sm text-white/90 leading-snug">{concern}</span>
        </li>
      ))}
    </ul>
  );
}
