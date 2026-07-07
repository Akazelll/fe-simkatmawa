import { api } from "@/lib/api";

export const settingsService = {
  getKemdikbud: async () => {
    const response = await api.get("/superadmin/settings/kemdikbud");
    return response.data;
  },

  updateKemdikbud: async (payload: { email: string; password: string }) => {
    const response = await api.put("/superadmin/settings/kemdikbud", payload);
    return response.data;
  },
};
