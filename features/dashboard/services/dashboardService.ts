import { api } from "@/lib/api";

export const dashboardService = {
  getAdminDashboard: async () => {
    const response = await api.get("/admin/dashboard");
    return response.data;
  },
};
