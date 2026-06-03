"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";

interface Props {
  stats: {
    waitingCount: number;
    processingCount: number;
    successCount: number;
    failedCount: number;
  };
}

export function QueueStatCards({ stats }: Props) {
  const cardsData = [
    { label: "Menunggu", count: stats.waitingCount, desc: "Job dalam antrean", icon: Clock, color: "text-yellow-500 bg-yellow-50" },
    { label: "Diproses", count: stats.processingCount, desc: "Sedang diproses worker", icon: RefreshCw, color: "text-blue-500 bg-blue-50" },
    { label: "Berhasil", count: stats.successCount, desc: "Sukses ke Kemdikbud", icon: CheckCircle2, color: "text-green-500 bg-green-50" },
    { label: "Gagal", count: stats.failedCount, desc: "Job gagal sinkronisasi", icon: AlertTriangle, color: "text-red-500 bg-red-50" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-down">
      {cardsData.map((card, idx) => (
        <Card key={idx} className="border border-slate-100 shadow-sm rounded-2xl bg-white overflow-hidden">
          <CardContent className="p-5 flex items-center gap-4">
            <div className={`p-3 rounded-xl shrink-0 ${card.color}`}>
              <card.icon className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.label}</span>
              <span className="text-2xl font-extrabold text-slate-800 leading-tight my-0.5">{card.count}</span>
              <span className="text-[11px] font-medium text-slate-400 truncate">{card.desc}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}