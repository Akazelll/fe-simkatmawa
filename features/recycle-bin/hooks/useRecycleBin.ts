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
    mutationFn: (id: string) => recycleBinApi.restoreItem(id),
    onSuccess: (_, id) => {
      toast.success("Berhasil direstore", {
        description: `Data ${id} telah dikembalikan ke tabel aktif.`,
      });
      queryClient.invalidateQueries({ queryKey: ["recycle-bin"] });
    },
    onError: () => {
      toast.error("Gagal melakukan restore", {
        description: "Terjadi kesalahan pada server.",
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
