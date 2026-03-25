import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type ToastStatus = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;
  title: string;
  description?: string;
  status: ToastStatus;
}

interface ToastContextType {
  toasts: Toast[];
  success: (title: string, description?: string) => string;
  error: (title: string, description?: string) => string;
  info: (title: string, description?: string) => string;
  warning: (title: string, description?: string) => string;
  removeToast: (id: string) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (status: ToastStatus, title: string, description?: string): string => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, title, description, status }]);

      setTimeout(() => {
        removeToast(id);
      }, 5000);

      return id;
    },
    [removeToast]
  );

  const success = useCallback(
    (title: string, description?: string) => addToast("success", title, description),
    [addToast]
  );

  const error = useCallback(
    (title: string, description?: string) => addToast("error", title, description),
    [addToast]
  );

  const info = useCallback(
    (title: string, description?: string) => addToast("info", title, description),
    [addToast]
  );

  const warning = useCallback(
    (title: string, description?: string) => addToast("warning", title, description),
    [addToast]
  );

  const value = useMemo(
    () => ({ toasts, success, error, info, warning, removeToast }),
    [toasts, success, error, info, warning, removeToast]
  );

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useFeedback = (): Omit<ToastContextType, "toasts" | "removeToast"> => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useFeedback must be used within a ToastProvider");
  }
  const { success, error, info, warning } = context;
  return { success, error, info, warning };
};
