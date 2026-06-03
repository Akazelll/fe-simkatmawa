"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DateRangeInputProps {
  value: { start: string; end: string };
  onChange: (value: { start: string; end: string }) => void;
  className?: string;
}

export function DateRangeInput({
  value,
  onChange,
  className,
}: DateRangeInputProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-3", className)}>
      <div className='flex-1'>
        <label className='text-[10px] font-bold uppercase text-slate-500 mb-1 block'>
          Start Date
        </label>
        <input
          type='date'
          className='w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-400'
          value={value.start}
          onChange={(e) => onChange({ ...value, start: e.target.value })}
        />
      </div>
      <div className='flex-1'>
        <label className='text-[10px] font-bold uppercase text-slate-500 mb-1 block'>
          End Date
        </label>
        <input
          type='date'
          className='w-full h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-400'
          value={value.end}
          onChange={(e) => onChange({ ...value, end: e.target.value })}
        />
      </div>
    </div>
  );
}
