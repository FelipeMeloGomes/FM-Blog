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
  onAuthStateChanged,
  getIdToken,
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
    user: null,
    token: null,
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
      const token = await getIdToken(user);
      setState({ ...state, user, token });
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
      setState((prevState) => ({
        ...prevState,
        error: errorMessage,
        loading: false,
        cancelled: false,
        token: null,
        user: null,
      }));

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

  const logout = async (): Promise<void> => {
    checkIfIsCancelled();
    await signOut(auth);
    setState({ ...state, user: null, token: null });
  };

  const login = async (data: Omit<UserData, "displayName">): Promise<void> => {
    checkIfIsCancelled();
    setState({ ...state, loading: true, error: null });
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const token = await getIdToken(user);
      setState({ ...state, user, token });
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
      setState((prevState) => ({
        ...prevState,
        error: errorMessage,
        loading: false,
        cancelled: false,
      }));
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    checkIfIsCancelled();
    const provider = new GoogleAuthProvider();
    setState({ ...state, loading: true, error: null });
    try {
      const { user } = await signInWithPopup(auth, provider);
      const token = await getIdToken(user);
      setState({ ...state, user, token });
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
      setState((prevState) => ({
        ...prevState,
        error: errorMessage,
        loading: false,
        cancelled: false,
      }));
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
      setState((prevState) => ({
        ...prevState,
        error: errorMessage,
        loading: false,
        cancelled: false,
      }));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getIdToken(user).then((token) => {
          setState((prevState) => ({
            ...prevState,
            user: user,
            token: token,
          }));
        });
      } else {
        setState({ ...state, user: null, token: null });
      }
    });

    return () => {
      unsubscribe();
      setState({ ...state, cancelled: true });
    };
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
    user: state.user,
    token: state.token,
  };
};
