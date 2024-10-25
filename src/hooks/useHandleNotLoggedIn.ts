import { useCallback } from "react";
import { useToastNotification } from "./useToastNotification";

export const useHandleNotLoggedIn = () => {
  const { showToast } = useToastNotification();

  const handleNotLoggedIn = useCallback(() => {
    showToast({
      title: "Info",
      description: "Faça login ou registre-se para curtir este post.",
      status: "error",
      position: "top-right",
      duration: 5000,
      isClosable: true,
    });
  }, [showToast]);

  return handleNotLoggedIn;
};
