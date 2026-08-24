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

// Alasan Penolakan
export interface AlasanPenolakan {
  id: number;
  judul: string;
  alasan: string;
  is_active: boolean;
  creator?: {
    id: number;
    name: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface AlasanPenolakanInput {
  judul: string;
  alasan: string;
  is_active?: boolean;
}

export interface AlasanPenolakanMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}