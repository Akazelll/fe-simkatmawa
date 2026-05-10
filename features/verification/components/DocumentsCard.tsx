import { Card, CardContent } from "@/components/ui/card";
import { SubmissionDocument } from "../types";
import { DocumentItem } from "./DocumentItem";

interface DocumentsCardProps {
  documents: SubmissionDocument[];
}

export function DocumentsCard({ documents }: DocumentsCardProps) {
  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl bg-white'>
      <CardContent className='p-6 md:p-8'>
        <div className='flex flex-col gap-1 mb-6'>
          <h3 className='text-lg font-bold text-slate-900'>Documents</h3>
          <p className='text-sm text-slate-500'>
            Semua dokumen dibuka melalui Google Drive
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          {documents.map((doc) => (
            <DocumentItem key={doc.id} document={doc} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
