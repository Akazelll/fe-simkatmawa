import axios from "axios";
import { TrashedItem } from "../types";
import { MOCK_TRASHED_DATA } from "../constants";

// Mock implementation
export const recycleBinApi = {
  getTrashedItems: async (): Promise<TrashedItem[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    return [...MOCK_TRASHED_DATA];
  },

  restoreItem: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Simulate audit log integration
    console.log(`[AUDIT LOG] Superadmin restored submission ID: ${id}`);
    return Promise.resolve();
  },
};
