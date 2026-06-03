"use client";

import { Badge } from "@/components/ui/badge";

interface Props {
  status: "waiting" | "processing" | "success" | "failed";
}

export function QueueStatusBadge({ status }: Props) {
  const configs = {
    waiting: {
      label: "Menunggu",
      styles: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    processing: {
      label: "Diproses",
      styles: "bg-blue-50 text-blue-700 border-blue-200 animate-pulse",
    },
    success: {
      label: "Berhasil",
      styles: "bg-green-50 text-green-700 border-green-200",
    },
    failed: {
      label: "Gagal",
      styles: "bg-red-50 text-red-700 border-red-200",
    },
  };

  const current = configs[status];

  return (
    <Badge
      variant='outline'
      className={`font-semibold rounded-full px-2 py-0.5 text-[11px] ${current.styles}`}
    >
      {current.label}
    </Badge>
  );
}
