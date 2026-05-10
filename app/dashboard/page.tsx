import { ApprovalRateChart } from "@/components/dashboard/approval-rate-chart";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { SubmissionTrendsChart } from "@/components/dashboard/submission-trends-chart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <StatsGrid />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <SubmissionTrendsChart />
        <ApprovalRateChart />
      </div>
    </div>
  );
}
