import { RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { QueueJob } from "../types";

export function QueueTable({ data }: { data: QueueJob[] }) {
  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl overflow-hidden bg-white'>
      <Table>
        <TableHeader>
          <TableRow className='border-slate-100'>
            <TableHead className='text-[11px] font-bold uppercase text-slate-400 pl-6'>
              Job ID
            </TableHead>
            <TableHead className='text-[11px] font-bold uppercase text-slate-400'>
              Submission
            </TableHead>
            <TableHead className='text-[11px] font-bold uppercase text-slate-400'>
              Status
            </TableHead>
            <TableHead className='text-[11px] font-bold uppercase text-slate-400'>
              Attempts
            </TableHead>
            <TableHead className='text-[11px] font-bold uppercase text-slate-400'>
              Created At
            </TableHead>
            <TableHead className='text-[11px] font-bold uppercase text-slate-400 text-right pr-6'>
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((job) => (
            <TableRow
              key={job.id}
              className='border-slate-100 hover:bg-slate-50/70'
            >
              <TableCell className='pl-6 font-medium text-slate-600'>
                #{job.id}
              </TableCell>
              <TableCell className='font-semibold text-slate-700'>
                {job.submission}
              </TableCell>
              <TableCell>
                <Badge
                  className={`rounded-full px-3 py-0.5 text-xs border-0 ${
                    job.status === "failed"
                      ? "bg-rose-50 text-rose-600"
                      : job.status === "processing"
                        ? "bg-blue-50 text-blue-600"
                        : "bg-amber-50 text-amber-600"
                  }`}
                >
                  {job.status}
                </Badge>
              </TableCell>
              <TableCell className='text-slate-600'>{job.attempts}/5</TableCell>
              <TableCell className='text-slate-600'>
                {job.createdAt.toLocaleTimeString()}
              </TableCell>
              <TableCell className='text-right pr-6'>
                {job.status === "failed" && (
                  <Button
                    variant='outline'
                    size='sm'
                    className='gap-2 border-rose-200 text-rose-600 hover:bg-rose-50 rounded-xl font-bold'
                  >
                    <RefreshCw size={14} /> Retry
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
