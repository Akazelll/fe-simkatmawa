import { api } from "@/lib/api";

export type RekognisiQueryParams = {
  status?: string;
  level?: string;
  search?: string;
  page?: number;
};

export const rekognisiService = {
  getRekognisiList: async (params?: RekognisiQueryParams) => {
    const response = await api.get("/mahasiswa/rekognisi", { params });
    return response.data;
  },
  getRekognisiDetail: async (id: string | number) => {
    const response = await api.get(`/mahasiswa/rekognisi/${id}`);
    return response.data;
  },

  createRekognisi: async (payload: any) => {
    const response = await api.post("/mahasiswa/rekognisi", payload);
    return response.data;
  },

  updateRekognisi: async (id: string | number, payload: any) => {
    const response = await api.put(`/mahasiswa/rekognisi/${id}`, payload);
    return response.data;
  },

  deleteRekognisi: async (id: string | number) => {
    const response = await api.delete(`/mahasiswa/rekognisi/${id}`);
    return response.data;
  },
};
