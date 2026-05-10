import { StatsGrid } from "@/features/dashboard/components/StatsGrid";
import { SubmissionTrendsChart } from "@/features/dashboard/components/SubmissionTrendsChart";
import { ApprovalRateChart } from "@/features/dashboard/components/ApprovalRateChart";
import { RecentActivity } from "@/features/dashboard/components/RecentActivity";
import { PageHeader } from "@/features/shared/components/PageHeader";

export default function DashboardPage() {
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
