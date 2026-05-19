import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const STATUS_STYLES: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected: "bg-rose-50 text-rose-700 border-rose-200",
};

const DOT_STYLES: Record<string, string> = {
  Pending: "bg-amber-500",
  Approved: "bg-emerald-500",
  Rejected: "bg-rose-500",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const style = STATUS_STYLES[status] ?? "bg-slate-50 text-slate-700 border-slate-200";
  const dotStyle = DOT_STYLES[status] ?? "bg-slate-400";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold",
        style,
        className
      )}
    >
      <span className={cn("size-1.5 rounded-full", dotStyle)} />
      {status}
    </span>
  );
}
