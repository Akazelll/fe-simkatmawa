import { Card, CardContent } from "@/components/ui/card";

interface SubmissionMetaCardProps {
  createdAt?: string | null;
  approvedAt?: string | null;
  pusatKemdikbudId?: string | null;
  createdByName?: string | null;
}

function MetaField({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex flex-col gap-1 min-w-0'>
      <span className='text-[11px] font-semibold uppercase tracking-wider text-slate-400'>
        {label}
      </span>
      <span className='text-sm font-semibold text-slate-800 wrap-break-word'>
        {value}
      </span>
    </div>
  );
}

const formatDate = (value?: string | null) =>
  value
    ? new Date(value).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

/**
 * Kartu metadata pengajuan (dipakai mahasiswa & admin pada halaman detail).
 * Hanya menampilkan field yang tersedia; bila tak ada satupun, tidak dirender.
 */
export function SubmissionMetaCard({
  createdAt,
  approvedAt,
  pusatKemdikbudId,
  createdByName,
}: SubmissionMetaCardProps) {
  const tanggalPengajuan = formatDate(createdAt);
  const tanggalDisetujui = formatDate(approvedAt);

  const hasContent =
    !!tanggalPengajuan ||
    !!tanggalDisetujui ||
    !!pusatKemdikbudId ||
    !!createdByName;

  if (!hasContent) return null;

  return (
    <Card className='border-slate-200 shadow-sm rounded-2xl bg-white'>
      <CardContent className='p-6 md:p-8'>
        <h3 className='text-sm font-bold text-slate-700 mb-5'>
          Informasi Pengajuan
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6'>
          {createdByName && (
            <MetaField label='Diajukan Oleh' value={createdByName} />
          )}
          {tanggalPengajuan && (
            <MetaField label='Tanggal Pengajuan' value={tanggalPengajuan} />
          )}
          {tanggalDisetujui && (
            <MetaField label='Tanggal Disetujui' value={tanggalDisetujui} />
          )}
          {pusatKemdikbudId && (
            <MetaField
              label='ID Kemdiktisaintek'
              value={String(pusatKemdikbudId)}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
