import { Card, CardContent } from "@/components/ui/card";
import { VerificationSubmission } from "../types";

interface SubmissionInfoCardProps {
  submission: VerificationSubmission;
}

interface InfoFieldProps {
  label: string;
  value: string;
}

function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className='flex flex-col gap-1.5'>
      <span className='text-xs font-medium text-slate-400'>{label}</span>
      <span className='text-sm font-bold text-slate-800'>{value}</span>
    </div>
  );
}

export function SubmissionInfoCard({ submission }: SubmissionInfoCardProps) {
  const formattedDate = submission.date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl bg-white'>
      <CardContent className='p-6 md:p-8'>
        <h2 className='text-lg md:text-xl font-bold text-slate-900 mb-6'>
          {submission.name}
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6'>
          <InfoField label='Kategori' value={submission.category} />
          <InfoField label='Level' value={submission.level} />
          <InfoField label='Penyelenggara' value={submission.organizer} />
          <InfoField label='Tanggal' value={formattedDate} />
          <InfoField
            label='Submitted by'
            value={`${submission.submittedBy} (${submission.nim})`}
          />
        </div>
      </CardContent>
    </Card>
  );
}
