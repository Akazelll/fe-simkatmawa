import { AdminUser } from "../types";

export const DEFAULT_ADMINS: AdminUser[] = [
  {
    id: "USR-001",
    name: "Adam Raga",
    email: "adam.raga@university.ac.id",
    role: "Superadmin",
    status: "Active",
    lastLogin: new Date(),
  },
  {
    id: "USR-002",
    name: "Siti Dewi",
    email: "siti.dewi@university.ac.id",
    role: "Admin",
    status: "Active",
    lastLogin: new Date(Date.now() - 3600000 * 2),
  },
  {
    id: "USR-003",
    name: "Budi Perkasa",
    email: "budi.p@university.ac.id",
    role: "Admin",
    status: "Inactive",
    lastLogin: new Date(Date.now() - 86400000 * 5),
  },
];
