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
import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import { CardSkeleton } from "@/features/shared/components/CardSkeleton";

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

  const { data: dashboardData, isLoading } = useDashboard();

  if (isAuthLoaded && hasRole(currentUser, "mahasiswa")) {
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

      {!isAuthLoaded || isLoading ? (
        <div className='flex flex-col gap-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
            {[1, 2, 3, 4].map((i) => (
              <CardSkeleton
                key={i}
                hasHeader={false}
                lines={2}
                className='h-32 justify-center'
              />
            ))}
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
            <CardSkeleton lines={5} className='h-[350px]' />
            <CardSkeleton lines={5} className='h-[350px]' />
          </div>

          <div className='grid grid-cols-1'>
            <CardSkeleton lines={8} className='h-[400px]' />
          </div>
        </div>
      ) : (
        <>
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
