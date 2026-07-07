"use client";

import { useRouter } from "next/navigation";
import { Loader2, BellOff, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { AppNotification } from "../types";
import { resolveActionUrl } from "../utils/resolveActionUrl";
import { timeAgo } from "../utils/timeAgo";
import { getCategoryIcon, getTypeStyle } from "../utils/notificationVisuals";

interface Props {
  items: AppNotification[];
  isLoading: boolean;
  onClose: () => void;
  onMarkAsRead: (id: AppNotification["id"]) => void;
  onMarkAllAsRead: () => void;
  onDelete: (id: AppNotification["id"]) => void;
}

export function NotificationDropdown({
  items,
  isLoading,
  onClose,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
}: Props) {
  const router = useRouter();
  const hasUnread = items.some((n) => !n.is_read);

  const handlePick = (n: AppNotification) => {
    if (!n.is_read) onMarkAsRead(n.id);
    const to = resolveActionUrl(n.action_url);
    if (to) router.push(to);
    onClose();
  };

  return (
    <div className='absolute right-0 mt-2 w-[380px] max-w-[calc(100vw-2rem)] bg-white rounded-xl border border-slate-200 shadow-xl overflow-hidden z-50'>
      <div className='flex items-center justify-between px-4 py-3 border-b border-slate-100'>
        <span className='text-sm font-bold text-slate-800'>Notifikasi</span>
        {hasUnread && (
          <button
            type='button'
            onClick={onMarkAllAsRead}
            className='text-xs font-semibold text-[#0F4C81] hover:underline'
          >
            Tandai semua dibaca
          </button>
        )}
      </div>

      <div className='max-h-[420px] overflow-y-auto'>
        {isLoading ? (
          <div className='flex items-center justify-center gap-2 py-10 text-sm text-slate-500'>
            <Loader2 size={16} className='animate-spin' /> Memuat notifikasi...
          </div>
        ) : items.length === 0 ? (
          <div className='flex flex-col items-center justify-center gap-2 py-10 text-sm text-slate-500'>
            <BellOff size={28} className='text-slate-300' />
            <span>Belum ada notifikasi.</span>
          </div>
        ) : (
          <ul className='divide-y divide-slate-100'>
            {items.slice(0, 10).map((n) => {
              const style = getTypeStyle(n.type);
              const Icon = getCategoryIcon(n.category);
              const isUnread = !n.is_read;
              return (
                <li key={n.id} className='group relative'>
                  <button
                    type='button'
                    onClick={() => handlePick(n)}
                    className={cn(
                      "w-full text-left px-4 py-3 pr-10 hover:bg-slate-50 transition-colors flex gap-3 items-start",
                      isUnread && "bg-sky-50/40",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center h-9 w-9 rounded-lg shrink-0",
                        style.iconBg,
                        style.iconColor,
                      )}
                    >
                      <Icon size={18} />
                    </div>

                    <div className='flex flex-col min-w-0 flex-1'>
                      <div className='flex items-start justify-between gap-2'>
                        <span className='text-sm font-semibold text-slate-800 leading-tight'>
                          {n.title}
                        </span>
                        {isUnread && (
                          <span
                            className='size-2 rounded-full bg-rose-500 shrink-0 mt-1.5'
                            aria-label='Belum dibaca'
                          />
                        )}
                      </div>
                      <p className='text-xs text-slate-500 mt-0.5 leading-relaxed line-clamp-2'>
                        {n.message}
                      </p>
                      <span className='text-[11px] text-slate-400 mt-1'>
                        {timeAgo(n.created_at)}
                      </span>
                    </div>
                  </button>

                  <button
                    type='button'
                    aria-label='Hapus notifikasi'
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(n.id);
                    }}
                    className='absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md text-slate-300 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-500 focus-visible:opacity-100 group-hover:opacity-100'
                  >
                    <Trash2 size={14} />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
