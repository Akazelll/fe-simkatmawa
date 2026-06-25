"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { AppNotification } from "../types";
import { resolveActionUrl } from "../utils/resolveActionUrl";
import { getCategoryIcon, getTypeStyle } from "../utils/notificationVisuals";

interface NotificationToastProps {
  notification: AppNotification;
  toastId: string | number;
}

export function NotificationToast({
  notification,
  toastId,
}: NotificationToastProps) {
  const router = useRouter();
  const style = getTypeStyle(notification.type);
  const Icon = getCategoryIcon(notification.category);
  const to = resolveActionUrl(notification.action_url);

  const handleClick = () => {
    if (to) router.push(to);
    toast.dismiss(toastId);
  };

  return (
    <div
      role={to ? "button" : undefined}
      onClick={to ? handleClick : undefined}
      className={cn(
        "relative flex w-[360px] max-w-[calc(100vw-2rem)] gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg",
        to && "cursor-pointer transition-colors hover:border-slate-300",
      )}
    >
      <div
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-lg shrink-0",
          style.iconBg,
          style.iconColor,
        )}
      >
        <Icon size={18} />
      </div>

      <div className='flex min-w-0 flex-1 flex-col pr-5'>
        <span className='text-sm font-semibold leading-tight text-slate-800'>
          {notification.title}
        </span>
        <p className='mt-0.5 text-xs leading-relaxed text-slate-500 line-clamp-3'>
          {notification.message}
        </p>
      </div>

      <button
        type='button'
        aria-label='Tutup'
        onClick={(e) => {
          e.stopPropagation();
          toast.dismiss(toastId);
        }}
        className='absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600'
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function showNotificationToast(notification: AppNotification) {
  return toast.custom(
    (id) => <NotificationToast notification={notification} toastId={id} />,
    {
      position: "top-right",
      duration: 6000,
    },
  );
}
