"use client";

import { Badge } from "@/components/ui/badge";
import { QueueSubmissionType } from "@/lib/queue/types";

export function SubmissionTypeBadge({ type }: { type: QueueSubmissionType }) {
  const styles = {
    prestasi: "bg-slate-100 text-slate-800 border-slate-200",
    sertifikat: "bg-purple-50 text-purple-700 border-purple-200",
    rekognisi: "bg-indigo-50 text-indigo-700 border-indigo-200",
  };

  return (
    <Badge
      variant='outline'
      className={`capitalize font-medium rounded-md text-[11px] px-2 py-0 ${styles[type]}`}
    >
      {type}
    </Badge>
  );
}
