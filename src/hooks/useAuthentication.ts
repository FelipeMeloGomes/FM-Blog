import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
  AuthError,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { useState, useEffect } from "react";
import { errorMessages } from "../utils/ErrorMessage";
import { AuthenticationResult, AuthenticationState, UserData } from "./types";
import { useToastNotification } from "./useToastNotification";

export const useAuthentication = (): AuthenticationResult => {
  const [state, setState] = useState<AuthenticationState>({
    error: null,
    loading: false,
    cancelled: false,
  });

  const auth = getAuth();
  const { showToast } = useToastNotification();

  const handleErrorMessage = (error: AuthError): string => {
    const matchedError = Object.entries(errorMessages).find(([key]) =>
      error.message.includes(key),
    );

    return matchedError
      ? matchedError[1]
      : "Ocorreu um erro, por favor tente novamente mais tarde.";
  };

  const checkIfIsCancelled = (): void => {
    if (state.cancelled) {
      return;
    }
  };

  const createUser = async (data: UserData): Promise<void> => {
    checkIfIsCancelled();
    setState({ ...state, loading: true });
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      await updateProfile(user, { displayName: data.displayName });
      showToast({
        title: "Success",
        description: "Usuário registrado com sucesso.",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage = handleErrorMessage(error as AuthError);
      setState({ error: errorMessage, loading: false, cancelled: false });
      showToast({
        title: "Error",
        description: errorMessage,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      throw new Error(errorMessage);
    }
  };

  const logout = (): void => {
    checkIfIsCancelled();
    signOut(auth);
  };

  const login = async (data: Omit<UserData, "displayName">): Promise<void> => {
    checkIfIsCancelled();
    setState({ ...state, loading: true, error: null });
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      showToast({
        title: "Success",
        position: "top-right",
        description: "Login efetuado com sucesso.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage = handleErrorMessage(error as AuthError);
      showToast({
        title: "Error",
        description: errorMessage,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setState({ error: errorMessage, loading: false, cancelled: false });
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    checkIfIsCancelled();
    const provider = new GoogleAuthProvider();
    setState({ ...state, loading: true, error: null });
    try {
      await signInWithPopup(auth, provider);
      showToast({
        title: "Success",
        description: "Login efetuado com sucesso no Google.",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage = handleErrorMessage(error as AuthError);
      showToast({
        title: "Error",
        description: errorMessage,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      setState({ error: errorMessage, loading: false, cancelled: false });
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    checkIfIsCancelled();
    setState({ ...state, loading: true });
    try {
      await sendPasswordResetEmail(auth, email);
      showToast({
        title: "Success",
        description: "E-mail de redefinição de senha enviado!",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      const errorMessage = handleErrorMessage(error as AuthError);
      showToast({
        title: "Error",
        description: errorMessage,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      setState({ error: errorMessage, loading: false, cancelled: false });
    }
  };

  useEffect(() => {
    return () => setState({ ...state, cancelled: true });
  }, []);

  return {
    auth,
    createUser,
    error: state.error,
    logout,
    login,
    loginWithGoogle,
    resetPassword,
    loading: state.loading,
  };
};
