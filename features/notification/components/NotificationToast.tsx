"use client";

import { useRouter } from "next/navigation";
import { X, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { AppNotification } from "../types";
import { resolveActionUrl } from "../utils/resolveActionUrl";
import { getCategoryIcon, getTypeStyle } from "../utils/notificationVisuals";

interface NotificationToastProps {
  notification: AppNotification;
  toastId: string | number;
  duration?: number;
}

export function NotificationToast({
  notification,
  toastId,
  duration = 6000,
}: NotificationToastProps) {
  const router = useRouter();
  const style = getTypeStyle(notification.type);
  const Icon = getCategoryIcon(notification.category);
  const to = resolveActionUrl(notification.action_url);

  const handleClick = () => {
    if (to) router.push(to);
    toast.dismiss(toastId);
  };

  const handleAnimationEnd = () => {
    toast.dismiss(toastId);
  };

  return (
    <div
      role={to ? "button" : undefined}
      onClick={to ? handleClick : undefined}
      className={cn(
        "group relative flex w-[380px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border bg-white/95 p-4 pr-10 shadow-xl backdrop-blur-md transition-all duration-300",
        style.borderColor,
        style.glowShadow,
        to && "cursor-pointer hover:bg-slate-50/80 hover:scale-[1.01]"
      )}
    >
      {/* Icon + Text */}
      <div className='flex items-start gap-3.5 flex-1'>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105",
            style.iconBg,
            style.iconColor
          )}
        >
          <Icon size={20} />
        </div>

        <div className='flex min-w-0 flex-1 flex-col'>
          <h4 className='text-sm font-bold leading-snug text-slate-900'>
            {notification.title}
          </h4>
          <p className='mt-1 text-xs leading-relaxed text-slate-600 line-clamp-3'>
            {notification.message}
          </p>

          {to && (
            <div className='mt-2.5 flex items-center gap-1 text-[11px] font-semibold text-[#0F4C81] transition-all group-hover:translate-x-0.5'>
              <span>Buka Tautan</span>
              <ArrowRight size={12} />
            </div>
          )}
        </div>
      </div>

      {/* Close */}
      <button
        type='button'
        aria-label='Tutup'
        onClick={(e) => {
          e.stopPropagation();
          toast.dismiss(toastId);
        }}
        className='absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 hover:rotate-90'
      >
        <X size={14} />
      </button>

      {/* Progress Bar — countdown berkurang ke kiri */}
      <div className='absolute bottom-0 left-0 right-0 h-1 bg-slate-100 overflow-hidden rounded-b-2xl'>
        <div
          onAnimationEnd={handleAnimationEnd}
          className={cn(
            "h-full toast-progress bg-gradient-to-r",
            style.progressGradient
          )}
          style={{
            animation: `shrinkProgress ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
}

// Set ID notifikasi yang sedang/pernah ditampilkan sebagai toast (deduplikasi sinkron)
const toastShownIds = new Set<string>();

export function showNotificationToast(notification: AppNotification) {
  if (!notification || !notification.id) return;

  const strId = String(notification.id);

  // Deduplikasi sinkron — cek & tandai dalam satu langkah agar
  // dua panggilan bersamaan tidak lolos bersamaan.
  if (toastShownIds.has(strId)) return;
  toastShownIds.add(strId);

  const toastId = `notif-${strId}`;
  const duration = 6000;

  // Dismiss toast lama dengan ID yang sama (jaga-jaga) sebelum menampilkan baru
  toast.dismiss(toastId);

  return toast.custom(
    (id) => (
      <NotificationToast
        notification={notification}
        toastId={id}
        duration={duration}
      />
    ),
    {
      id: toastId,
      position: "top-right",
      duration: duration,
      onDismiss: () => {
        toastShownIds.delete(strId);
      },
      onAutoClose: () => {
        toastShownIds.delete(strId);
      },
    }
  );
}


