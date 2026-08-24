import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileX2, Link2 } from "lucide-react";

function AlasanPenolakanSkeleton() {
  return (
    <Card className="mx-auto max-w-3xl overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-rose-500/10">
              <FileX2 className="h-6 w-6 text-rose-400" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-5 w-48 bg-slate-200" />
              <Skeleton className="h-3.5 w-64 max-w-full bg-slate-100" />
            </div>
          </div>
          <Skeleton className="h-10 w-36 rounded-xl bg-[#0F4C81]/15" />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 border-t border-slate-100 pt-5">
          <Skeleton className="h-10 flex-1 rounded-xl border border-slate-200 bg-white" />
          <div className="flex items-center gap-2 shrink-0 rounded-xl bg-slate-100 p-1 border border-slate-200">
            <Skeleton className="h-7 w-16 rounded-lg bg-white" />
            <Skeleton className="h-7 w-14 rounded-lg bg-slate-200/50" />
            <Skeleton className="h-7 w-18 rounded-lg bg-slate-200/50" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 last:border-b-0"
            >
              <div className="space-y-2 flex-1 pr-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-40 bg-slate-200" />
                  <Skeleton className="h-5 w-16 rounded-full bg-emerald-100" />
                </div>
                <Skeleton className="h-3.5 w-full max-w-md bg-slate-100" />
                <Skeleton className="h-3 w-48 bg-slate-100" />
              </div>
              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                <Skeleton className="h-8 w-8 rounded-lg bg-slate-100" />
                <Skeleton className="h-8 w-8 rounded-lg bg-rose-50" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <Skeleton className="h-4 w-48 bg-slate-100" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-16 rounded-lg border border-slate-200 bg-white" />
            <Skeleton className="h-8 w-16 rounded-lg border border-slate-200 bg-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function KemdikbudIntegrationSkeleton() {
  return (
    <Card className="mx-auto max-w-3xl overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#0F4C81]/10">
              <Link2 className="h-6 w-6 text-[#0F4C81]/40" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Skeleton className="h-5 w-56 bg-slate-200" />
              <Skeleton className="h-3.5 w-40 bg-slate-100" />
            </div>
          </div>
          <Skeleton className="h-6 w-24 rounded-full border border-emerald-200 bg-emerald-50" />
        </div>

        <div className="grid grid-cols-1 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <Skeleton className="h-3.5 w-28 bg-slate-200" />
              <Skeleton className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50" />
            </div>
          ))}
        </div>

        <div className="flex justify-end border-t border-slate-100 pt-5">
          <Skeleton className="h-12 w-40 rounded-xl bg-[#0F4C81]/15" />
        </div>
      </CardContent>
    </Card>
  );
}

export function SettingsSkeleton() {
  return (
    <div className="space-y-6">
      <AlasanPenolakanSkeleton />
      <KemdikbudIntegrationSkeleton />
    </div>
  );
}