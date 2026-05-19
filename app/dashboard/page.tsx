"use client";

import { useSyncExternalStore } from "react";
import { useAuth } from "@/features/auth/hooks/use-auth";
import { hasRole } from "@/lib/auth/permissions";
import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { SubmissionTrendsChart } from "@/features/dashboard/components/SubmissionTrendsChart";
import { ApprovalRateChart } from "@/features/dashboard/components/ApprovalRateChart";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";
import { WorkflowInfographic } from "@/features/dashboard/components/student/WorkflowInfographic";
import { PageHeader } from "@/features/shared/components/PageHeader";

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
  const { currentUser, isLoaded } = useAuth();
  const hour = useSyncExternalStore(
    subscribeHour,
    () => new Date().getHours(),
    () => 8,
  );

  if (!isLoaded) return null;

  if (hasRole(currentUser, "mahasiswa")) {
    return (
      <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
        <h1 className='text-2xl font-bold text-slate-800'>
          {getGreeting(hour)}, {currentUser?.name}
        </h1>
        <WorkflowInfographic />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-8 animate-in fade-in duration-500'>
      <PageHeader
        title='Dashboard'
        description='Monitor submission activity and system performance'
      />
      <StatsGrid />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        <SubmissionTrendsChart />
        <ApprovalRateChart />
      </div>
      <div className='lg:col-span-1'>
        <RecentActivity />
      </div>
    </div>
  );
}
