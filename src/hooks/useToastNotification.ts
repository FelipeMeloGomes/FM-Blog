import { toast } from "sonner";

interface ToastOptions {
  title: string;
  description?: string;
  status?: "success" | "error" | "warning" | "info";
  duration?: number;
}

interface UseToastNotification {
  showToast: (options: ToastOptions) => void;
}

export const useToastNotification = (): UseToastNotification => {
  const showToast = ({ title, description, status, duration }: ToastOptions) => {
    const message = description ? `${title}: ${description}` : title;
    const options = { duration: duration || 5000 };

    if (status === "success") toast.success(message, options);
    else if (status === "error") toast.error(message, options);
    else if (status === "warning") toast.warning(message, options);
    else toast.info(message, options);
  };

  return { showToast };
};
