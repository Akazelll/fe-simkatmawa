"use client";

import { useSyncExternalStore } from "react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { hasRole } from "@/lib/auth/permissions";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { SubmissionTrendsChart } from "@/features/dashboard/components/SubmissionTrendsChart";
import { ApprovalRateChart } from "@/features/dashboard/components/ApprovalRateChart";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";
import { WorkflowInfographic } from "@/features/dashboard/components/student/WorkflowInfographic";
import { SubmissionStatsGrid } from "@/features/dashboard/components/student/SubmissionStatsGrid";
import { RecentSubmissions } from "@/features/dashboard/components/student/RecentSubmissions";
import { PageHeader } from "@/features/shared/components/PageHeader";
import { useDashboard } from "@/features/dashboard/hooks/useDashboard"; // IMPORT HOOK BARU

const getGreeting = (hour: number) => {
  if (hour >= 4 && hour < 11) return "Selamat pagi";
  if (hour >= 11 && hour < 15) return "Selamat siang";
  if (hour >= 15 && hour < 18) return "Selamat sore";
  return "Selamat malam";
};

const subscribeHour = (cb: () => void) => {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
};

export default function DashboardPage() {
  const { currentUser, isLoaded: isAuthLoaded } = useAuth();
  const hour = useSyncExternalStore(
    subscribeHour,
    () => new Date().getHours(),
    () => 8,
  );

  // Panggil Data dari Backend
  const { data: dashboardData, isLoading } = useDashboard();

  if (!isAuthLoaded) return null;

  if (hasRole(currentUser, "mahasiswa")) {
    return (
      <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
        <h1 className='text-2xl font-bold text-slate-800'>
          {getGreeting(hour)}, {currentUser?.name}
        </h1>
        <SubmissionStatsGrid />
        <WorkflowInfographic />
        <RecentSubmissions />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8 animate-in fade-in duration-500'>
      <PageHeader
        title='Dashboard'
        description='Pantau ringkasan pengajuan dan performa sistem SIMKATMAWA.'
      />

      {isLoading ? (
        // Loading skeleton sederhana
        <div className='flex items-center justify-center h-64'>
          <div className='w-10 h-10 border-4 border-[#0F4C81] border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : (
        <>
          {/* Distribusikan Data API ke Komponen */}
          <StatsGrid stats={dashboardData?.stats} />

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
            <SubmissionTrendsChart data={dashboardData?.trends} />
            <ApprovalRateChart data={dashboardData?.approval_rates} />
          </div>

          <div className='grid grid-cols-1'>
            <RecentActivity logs={dashboardData?.recent_activities} />
          </div>
        </>
      )}
    </div>
  );
}
