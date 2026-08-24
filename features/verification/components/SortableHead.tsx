"use client";

import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { TableHead } from "@/components/ui/table";
import { HEAD_CLASS } from "../utils/VerificationTableUtils";

interface SortableHeadProps {
  label: string;
  sortKey?: string;
  currentSortBy?: string;
  currentSortDir?: "asc" | "desc";
  onSort?: (key: string) => void;
  className?: string;
}

export function SortableHead({
  label,
  sortKey,
  currentSortBy,
  currentSortDir,
  onSort,
  className = "",
}: SortableHeadProps) {
  if (!sortKey || !onSort) {
    return <TableHead className={`${HEAD_CLASS} ${className}`}>{label}</TableHead>;
  }

  const isActive = currentSortBy === sortKey;

  const handleClick = () => {
    if (!isActive) {
      onSort(sortKey);
    } else if (currentSortDir === "asc") {
      onSort(sortKey);
    } else {
      onSort(sortKey);
    }
  };

  return (
    <TableHead className={`${HEAD_CLASS} ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-1.5 font-bold text-[11px] tracking-wide uppercase text-slate-400 hover:text-slate-900 transition-colors cursor-pointer group text-left"
      >
        <span>{label}</span>
        {isActive ? (
          currentSortDir === "asc" ? (
            <ArrowUp size={13} className="text-[#0F4C81] shrink-0 font-bold" />
          ) : (
            <ArrowDown size={13} className="text-[#0F4C81] shrink-0 font-bold" />
          )
        ) : (
          <ArrowUpDown size={12} className="text-slate-300 group-hover:text-slate-500 shrink-0" />
        )}
      </button>
    </TableHead>
  );
}