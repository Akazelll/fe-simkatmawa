export interface KemdikbudCredential {
  email: string;
  hasPassword: boolean;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface UpdateKemdikbudCredentialPayload {
  email: string;
  password: string;
  confirmPassword?: string;
}
