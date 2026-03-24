import { type ToastId, type UseToastOptions, useToast } from "@chakra-ui/react";
import { createContext, useCallback, useContext, useMemo } from "react";

interface ToastContextType {
  success: (title: string, description?: string, options?: Partial<UseToastOptions>) => ToastId;
  error: (title: string, description?: string, options?: Partial<UseToastOptions>) => ToastId;
  info: (title: string, description?: string, options?: Partial<UseToastOptions>) => ToastId;
  warning: (title: string, description?: string, options?: Partial<UseToastOptions>) => ToastId;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const defaultOptions: Partial<UseToastOptions> = {
  position: "top-right",
  duration: 5000,
  isClosable: true,
};

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const toast = useToast();

  const success = useCallback(
    (title: string, description?: string, options?: Partial<UseToastOptions>): ToastId => {
      return toast({
        ...defaultOptions,
        title,
        description,
        status: "success",
        ...options,
      });
    },
    [toast]
  );

  const error = useCallback(
    (title: string, description?: string, options?: Partial<UseToastOptions>): ToastId => {
      return toast({
        ...defaultOptions,
        title,
        description,
        status: "error",
        ...options,
      });
    },
    [toast]
  );

  const info = useCallback(
    (title: string, description?: string, options?: Partial<UseToastOptions>): ToastId => {
      return toast({
        ...defaultOptions,
        title,
        description,
        status: "info",
        ...options,
      });
    },
    [toast]
  );

  const warning = useCallback(
    (title: string, description?: string, options?: Partial<UseToastOptions>): ToastId => {
      return toast({
        ...defaultOptions,
        title,
        description,
        status: "warning",
        ...options,
      });
    },
    [toast]
  );

  const value = useMemo(() => ({ success, error, info, warning }), [success, error, info, warning]);

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useFeedback = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useFeedback must be used within a ToastProvider");
  }
  return context;
};
