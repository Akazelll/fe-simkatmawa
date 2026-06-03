import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/features/shared/components/StatusBadge";
import { RejectionReasonButton } from "@/features/shared/components/RejectionReasonButton";
import { Rekognisi } from "../types";

const LEVEL_LABEL: Record<string, string> = {
  KAB: "Kabupaten/Kota",
  PROV: "Provinsi",
  NAS: "Nasional",
  INT: "Internasional",
};

const JENIS_LABEL: Record<string, string> = {
  SERKOM: "Sertifikasi Kompetensi",
  JURIOR: "Juri/Pelatih (JURIOR)",
  JURINOR: "Juri/Pelatih (JURINOR)",
  KEYCONF: "Keynote Speaker/Narasumber",
  KEYWORK: "Keynote Speaker/Workshop",
  PAMERAN: "Pameran",
  KARYA: "Karya",
  BUKU: "Buku",
  PATEN: "Paten",
  PUB: "Publikasi",
  DUTA: "Duta",
  PTG: "PTG",
  PSB: "PSB",
  PKD: "PKD",
};

const label = (map: Record<string, string>, key: string) => map[key] ?? key;

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex flex-col gap-1 min-w-0'>
      <span className='text-[11px] font-semibold uppercase tracking-wider text-slate-400'>
        {label}
      </span>
      <span className='text-sm font-semibold text-slate-800 wrap-break-word'>
        {value || "—"}
      </span>
    </div>
  );
}

function DocLink({ label, url }: { label: string; url?: string | null }) {
  return (
    <div className='flex flex-col gap-1 min-w-0'>
      <span className='text-[11px] font-semibold uppercase tracking-wider text-slate-400'>
        {label}
      </span>
      {url ? (
        <a
          href={url}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-flex items-center gap-1.5 text-sm font-semibold text-[#0F4C81] hover:underline break-all'
        >
          <ExternalLink size={14} className='shrink-0' />
          Buka dokumen
        </a>
      ) : (
        <span className='text-sm text-slate-300'>—</span>
      )}
    </div>
  );
}

export function RekognisiDetailView({ data }: { data: Rekognisi }) {
  return (
    <div className='flex flex-col gap-6'>
      <Card className='border-slate-200 shadow-sm rounded-2xl bg-white'>
        <CardContent className='p-6 md:p-8'>
          <div className='flex items-start justify-between gap-4 mb-7'>
            <div className='flex flex-col gap-1.5'>
              <h2 className='text-lg md:text-xl font-bold text-slate-900 leading-snug'>
                {data.nama}
              </h2>
              <p className='text-sm text-slate-500'>
                {label(JENIS_LABEL, data.jenis)} ·{" "}
                {label(LEVEL_LABEL, data.level)} · {data.tahun}
              </p>
            </div>
            <div className='flex flex-col items-end gap-1.5 shrink-0'>
              <StatusBadge status={data.status_internal} />
              {data.status_internal === "REJECTED" &&
                data.alasan_penolakan && (
                  <RejectionReasonButton reason={data.alasan_penolakan} />
                )}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6'>
            <Field label='Jenis' value={label(JENIS_LABEL, data.jenis)} />
            <Field label='Level' value={label(LEVEL_LABEL, data.level)} />
            <Field label='Penyelenggara' value={data.penyelenggara} />
            <Field
              label='Tanggal Sertifikat'
              value={data.tgl_sertifikat?.slice(0, 10) ?? ""}
            />
          </div>

          {data.keterangan && (
            <div className='mt-6 pt-6 border-t border-slate-100'>
              <Field label='Keterangan' value={data.keterangan} />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className='border-slate-200 shadow-sm rounded-2xl bg-white'>
        <CardContent className='p-6 md:p-8'>
          <h3 className='text-sm font-bold text-slate-700 mb-5'>
            Dokumen Pendukung
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-6'>
            <DocLink label='URL Peserta' url={data.url_peserta} />
            <DocLink label='Sertifikat' url={data.url_sertifikat} />
            <DocLink label='Foto UPP' url={data.url_foto_upp} />
            <DocLink label='Dokumen Undangan' url={data.url_dokumen_undangan} />
          </div>
        </CardContent>
      </Card>

      {(data.mahasiswa?.length || data.dosen?.length) && (
        <Card className='border-slate-200 shadow-sm rounded-2xl bg-white'>
          <CardContent className='p-6 md:p-8 flex flex-col gap-7'>
            {data.mahasiswa && data.mahasiswa.length > 0 && (
              <div>
                <h3 className='text-sm font-bold text-slate-700 mb-4'>
                  Mahasiswa Terlibat
                </h3>
                <div className='flex flex-col divide-y divide-slate-100'>
                  {data.mahasiswa.map((m, i) => (
                    <div key={i} className='flex items-center gap-4 py-2.5'>
                      <span className='text-xs font-mono text-slate-400 w-36 shrink-0'>
                        {m.nim}
                      </span>
                      <span className='text-sm font-semibold text-slate-800'>
                        {m.nama}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {data.dosen && data.dosen.length > 0 && (
              <div>
                <h3 className='text-sm font-bold text-slate-700 mb-4'>
                  Dosen Pembimbing
                </h3>
                <div className='flex flex-col divide-y divide-slate-100'>
                  {data.dosen.map((d, i) => (
                    <div
                      key={i}
                      className='flex items-center gap-4 py-2.5 flex-wrap'
                    >
                      <span className='text-xs font-mono text-slate-400 w-36 shrink-0'>
                        {d.nuptk}
                      </span>
                      <span className='text-sm font-semibold text-slate-800'>
                        {d.nama}
                      </span>
                      {d.url_surat_tugas && (
                        <a
                          href={d.url_surat_tugas}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center gap-1 text-xs font-semibold text-[#0F4C81] hover:underline'
                        >
                          <ExternalLink size={12} />
                          Surat Tugas
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
