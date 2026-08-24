import { toast } from "sonner";

export const customToast = {
  success: (message: string, options?: { description?: string }) => {
    toast.success(message, {
      description: options?.description,
    });
  },
  error: (message: string, options?: { description?: string }) => {
    toast.error(message, {
      description: options?.description,
    });
  },
  info: (message: string, options?: { description?: string }) => {
    toast.info(message, {
      description: options?.description,
    });
  },
  warning: (message: string, options?: { description?: string }) => {
    toast.warning(message, {
      description: options?.description,
    });
  },
};