import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ActivityActionBadgeProps {
  action: string;
  showIcon?: boolean;
  className?: string; // Memungkinkan override class dari luar jika dibutuhkan
}

export function ActivityActionBadge({
  action,
  showIcon = true,
  className,
}: ActivityActionBadgeProps) {
  const getBadgeProps = () => {
    const normalizedAction = action?.toLowerCase() || "";

    switch (normalizedAction) {
      case "created":
        return {
          badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
          label: "Dibuat",
          icon: "🟢",
        };
      case "updated":
        return {
          badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
          label: "Diubah",
          icon: "🟡",
        };
      case "deleted":
        return {
          badgeClass: "bg-red-50 text-red-700 border-red-200",
          label: "Dihapus",
          icon: "🔴",
        };
      case "pending":
        return {
          badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
          label: "Pending",
          icon: "⏳",
        };
      case "rejected":
        return {
          badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
          label: "Ditolak",
          icon: "❌",
        };
      case "approved_unsynced":
        return {
          badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
          label: "Approved (Unsynced)",
          icon: "🔵",
        };
      case "sync_success":
        return {
          badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
          label: "Sync Sukses",
          icon: "✅",
        };
      case "sync_failed":
        return {
          badgeClass: "bg-red-50 text-red-700 border-red-200",
          label: "Sync Gagal",
          icon: "⚠️",
        };
      default:
        return {
          badgeClass: "bg-slate-100 text-slate-600 border-slate-200",
          label: action?.replace(/_/g, " ") || "Unknown",
          icon: "",
        };
    }
  };

  const { badgeClass, label, icon } = getBadgeProps();

  return (
    <Badge
      variant='outline'
      className={cn(
        "rounded-full px-3 py-1 text-[11px] font-semibold whitespace-nowrap capitalize transition-colors",
        badgeClass,
        className,
      )}
    >
      {showIcon && icon && <span className='mr-1.5'>{icon}</span>}
      {label}
    </Badge>
  );
}
