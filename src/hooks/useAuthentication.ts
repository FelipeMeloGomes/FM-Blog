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
import { toast } from "react-toastify";
import { errorMessages } from "../utils/ErrorMessage";
import { AuthenticationResult, AuthenticationState, UserData } from "./types";

export const useAuthentication = (): AuthenticationResult => {
  const [state, setState] = useState<AuthenticationState>({
    error: null,
    loading: false,
    cancelled: false,
  });

  const auth = getAuth();

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
      toast.success("Registro bem-sucedido!");
    } catch (error) {
      const errorMessage = handleErrorMessage(error as AuthError);
      setState({ error: errorMessage, loading: false, cancelled: false });
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
      toast.success("Login bem-sucedido!");
    } catch (error) {
      const errorMessage = handleErrorMessage(error as AuthError);
      setState({ error: errorMessage, loading: false, cancelled: false });
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    checkIfIsCancelled();
    const provider = new GoogleAuthProvider();
    setState({ ...state, loading: true, error: null });
    try {
      await signInWithPopup(auth, provider);
      toast.success("Login com Google bem-sucedido!");
    } catch (error) {
      const errorMessage = handleErrorMessage(error as AuthError);
      setState({ error: errorMessage, loading: false, cancelled: false });
    }
  };

  const resetPassword = async (email: string): Promise<void> => {
    checkIfIsCancelled();
    setState({ ...state, loading: true });
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("E-mail de redefinição de senha enviado!");
    } catch (error) {
      const errorMessage = handleErrorMessage(error as AuthError);
      toast.error("Error ao enviar Email");
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
