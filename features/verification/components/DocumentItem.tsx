"use client";

import { useState } from "react";
import { Link2, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface SubmissionDocument {
  id: string | number;
  title: string;
  url: string;
}

interface DocumentItemProps {
  document: SubmissionDocument;
}

function formatUrl(url: string): string {
  try {
    const u = new URL(url);
    const path =
      u.pathname.length > 16 ? `...${u.pathname.slice(-8)}` : u.pathname;
    return `${u.hostname}${path}`;
  } catch {
    return url;
  }
}

export function DocumentItem({ document }: DocumentItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(document.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleOpen = () => {
    window.open(document.url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-slate-50/60 border border-slate-200 rounded-xl transition-colors duration-150 hover:bg-slate-50 hover:border-slate-300'>
      <div className='flex items-center gap-3 min-w-0 flex-1'>
        <div className='shrink-0 flex items-center justify-center w-10 h-10 bg-[#6CBDFE1A] rounded-lg'>
          <Link2 size={18} className='text-[#0F4C81]' />
        </div>

        <div className='flex flex-col min-w-0'>
          <span className='text-sm font-semibold text-slate-800 truncate'>
            {document.title}
          </span>
          <span className='hidden sm:block text-xs text-slate-500 truncate font-mono mt-0.5'>
            {formatUrl(document.url)}
          </span>
        </div>
      </div>

      <div className='flex items-center gap-2 shrink-0'>
        <Button
          onClick={handleOpen}
          className='h-8 sm:h-9 px-3 sm:px-4 gap-1.5 rounded-lg text-[11px] sm:text-xs font-semibold bg-[#0F4C81] text-white shadow-sm transition-colors duration-150 hover:bg-[#0c3e6b] focus-visible:ring-2 focus-visible:ring-[#0F4C81]/30 focus-visible:ring-offset-2'
        >
          <ExternalLink size={14} />
          Buka Link
        </Button>
        <Button
          variant='outline'
          onClick={handleCopy}
          className='h-8 sm:h-9 px-3 sm:px-4 gap-1.5 rounded-lg text-[11px] sm:text-xs font-semibold border-slate-200 bg-white text-slate-600 transition-colors duration-150 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 focus-visible:ring-2 focus-visible:ring-slate-300 focus-visible:ring-offset-2'
        >
          {copied ? (
            <Check size={14} className='text-emerald-500' />
          ) : (
            <Copy size={14} />
          )}
          {copied ? "Tersalin" : "Salin"}
        </Button>
      </div>
    </div>
  );
}
