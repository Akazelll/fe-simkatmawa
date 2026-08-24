import { redirect } from "next/navigation";

export default function VerificationPage() {
  const [typeFilter, setTypeFilter] = useState("Prestasi");

  const apiTypeFormat = typeFilter.toLowerCase() as TipeKegiatan;

  const { data, isLoading } = useVerifikasiList(apiTypeFormat);

  const skeletonRows = useSkeletonRows(
    `verification:${apiTypeFormat}`,
    data.length,
    !isLoading,
  );

  return (
    <RoleGuard allowedRoles={["admin", "superadmin"]}>
      <div className='flex flex-col gap-6 animate-in fade-in duration-500'>
        <PageHeader
          title='Verifikasi Pengajuan'
          description='Review dan setujui pengajuan prestasi, sertifikasi, dan rekognisi mahasiswa.'
        />

        <FilterSection
          category={typeFilter}
          setCategory={setTypeFilter}
          categories={["Prestasi", "Sertifikasi", "Rekognisi"]}
        />

        <div className='space-y-4'>
          {isLoading ? (
            <TableSkeleton
              columns={VERIFICATION_TABLE_COLUMNS}
              rows={skeletonRows}
            />
          ) : (
            <VerificationTable tipeKegiatan={apiTypeFormat} data={data} />
          )}
        </div>
      </div>
    </RoleGuard>
  );
}
