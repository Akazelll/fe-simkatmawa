// Bentuk response GET /superadmin/settings/kemdikbud (SettingsController@showKemdikbud).
// Password tidak pernah dikembalikan backend — hanya flag is_password_set.
export interface KemdikbudCredential {
  email: string;
  is_password_set: boolean;
  terakhir_diperbarui: string | null;
  diperbarui_oleh: string | null;
}

// Payload form — sama persis dengan yang divalidasi backend (updateKemdikbud).
export interface UpdateKemdikbudCredentialPayload {
  email: string;
  password: string;
}

export interface AlasanPenolakan {
  id: number;
  judul: string;
  alasan: string;
  is_active: boolean;
  created_by?: string | null;
  updated_by?: string | null;
  deleted_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
  creator?: { id: string; name: string } | null;
  updater?: { id: string; name: string } | null;
}

export interface AlasanPenolakanReferensi {
  id: number;
  judul: string;
  alasan: string;
}

export interface AlasanPenolakanInput {
  judul: string;
  alasan: string;
  is_active?: boolean;
}

export interface AlasanPenolakanQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean | string;
}

export interface AlasanPenolakanMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface AlasanPenolakanListResponse {
  success: boolean;
  message: string;
  data: AlasanPenolakan[];
  meta: AlasanPenolakanMeta;
}

