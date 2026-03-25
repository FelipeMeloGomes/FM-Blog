import { useFeedback } from "../providers/ToastProvider";

interface UseToastNotification {
  showToast: (
    title: string,
    description?: string,
    status?: "success" | "error" | "info" | "warning"
  ) => void;
}

export const useToastNotification = (): UseToastNotification => {
  const { success, error, info, warning } = useFeedback();

  const showToast = (
    title: string,
    description?: string,
    status: "success" | "error" | "info" | "warning" = "info"
  ) => {
    switch (status) {
      case "success":
        success(title, description);
        break;
      case "error":
        error(title, description);
        break;
      case "warning":
        warning(title, description);
        break;
      default:
        info(title, description);
        break;
    }
  };

  return { showToast };
};
