import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { recycleBinApi } from "../services/api";

export function useRecycleBin() {
  const queryClient = useQueryClient();

  const {
    data: trashedItems = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["recycle-bin"],
    queryFn: recycleBinApi.getTrashedItems,
  });

  const restoreMutation = useMutation({
    // Mutation sekarang menerima object { type, id }
    mutationFn: ({ type, id }: { type: string; id: string | number }) =>
      recycleBinApi.restoreItem(type, id),
    onSuccess: (_, variables) => {
      toast.success("Berhasil dipulihkan", {
        description: `Data telah dikembalikan secara permanen ke tabel aktif.`,
      });
      // Refresh ulang data tabel Recycle Bin
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
    trashedItems,
    isLoading,
    isError,
    restoreItem: restoreMutation.mutate,
    isRestoring: restoreMutation.isPending,
  };
}
