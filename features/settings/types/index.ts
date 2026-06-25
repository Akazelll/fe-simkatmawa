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
