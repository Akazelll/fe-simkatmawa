import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { recycleBinApi, GetTrashedParams } from "../services/api";

export function useRecycleBin(params: GetTrashedParams) {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["recycle-bin", params],
    queryFn: () => recycleBinApi.getTrashedItems(params),
    // Pertahankan data lama saat ganti tipe/halaman supaya tabel tidak "loncat".
    placeholderData: keepPreviousData,
  });

  const restoreMutation = useMutation({
    mutationFn: ({ type, id }: { type: string; id: string | number }) =>
      recycleBinApi.restoreItem(type, id),
    onSuccess: () => {
      toast.success("Berhasil dipulihkan", {
        description: "Data telah dikembalikan ke tabel aktif.",
      });
      // Refresh seluruh tipe trash (key prefix).
      queryClient.invalidateQueries({ queryKey: ["recycle-bin"] });
    },
    onError: (error: any) => {
      toast.error("Gagal melakukan restore", {
        description:
          error?.response?.data?.message || "Terjadi kesalahan pada server.",
      });
    },
  });

  return {
    items: data?.items ?? [],
    meta: data?.meta ?? null,
    totalTrash: data?.totalTrash ?? 0,
    isLoading,
    isFetching,
    isError,
    restoreItem: restoreMutation.mutate,
    isRestoring: restoreMutation.isPending,
  };
}
