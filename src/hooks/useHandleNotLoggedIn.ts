import { useToastNotification } from "./useToastNotification";

export const useHandleNotLoggedIn = () => {
  const { showToast } = useToastNotification();

  const handleNotLoggedIn = () => {
    showToast({
      title: "Info",
      description: "Faça login ou registre-se para curtir este post.",
      status: "error",
      position: "top-right",
      duration: 5000,
      isClosable: true,
    });
  };

  return handleNotLoggedIn;
};
