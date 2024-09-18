import { useToast, UseToastOptions } from "@chakra-ui/react";

interface UseToastNotification {
  showToast: (options: UseToastOptions) => void;
}

export const useToastNotification = (): UseToastNotification => {
  const toast = useToast();

  const showToast = (options: UseToastOptions) => {
    toast(options);
  };

  return { showToast };
};
