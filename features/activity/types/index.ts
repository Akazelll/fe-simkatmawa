export type ActivityAction = "created" | "updated" | "deleted";
export type ActivityRole = "mahasiswa" | "admin" | "dosen" | "ormawa";

export interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  role: ActivityRole;
  action: ActivityAction;
  module: string;
  target: string;
  oldData: Record<string, string | null>;
  newData: Record<string, string | null>;
}
