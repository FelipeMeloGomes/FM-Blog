import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface UserData {
    displayName: string;
    email: string;
    password: string;
}

interface AuthenticationState {
    error: string | null;
    loading: boolean;
    cancelled: boolean;
}

interface AuthenticationResult {
    auth: ReturnType<typeof getAuth>;
    createUser: (data: UserData) => Promise<void>;
    error: string | null;
    logout: () => void;
    login: (data: UserData) => Promise<void>;
    loading: boolean;
}

export const useAuthentication = (): AuthenticationResult => {
    const [state, setState] = useState<AuthenticationState>({
        error: null,
        loading: false,
        cancelled: false,
    });

    const auth = getAuth();

    const handleErrorMessage = (error: any): string => {
        let systemErrorMessage;
        if (error.message.includes("Password")) {
            systemErrorMessage =
                "A senha precisa conter pelo menos 6 caracteres.";
        } else if (error.message.includes("email-already")) {
            systemErrorMessage = "E-mail já cadastrado.";
        } else if (error.message.includes("user-not-found")) {
            systemErrorMessage = "Usuário não encontrado.";
        } else if (error.message.includes("wrong-password")) {
            systemErrorMessage = "Senha incorreta.";
        } else {
            systemErrorMessage =
                "Ocorreu um erro, por favor tente novamente mais tarde.";
        }
        return systemErrorMessage;
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
                data.password
            );
            await updateProfile(user, { displayName: data.displayName });
            toast.success("Registro bem-sucedido!");
        } catch (error) {
            const errorMessage = handleErrorMessage(error);
            setState({ error: errorMessage, loading: false, cancelled: false });
            throw new Error(errorMessage);
        }
    };

    const logout = (): void => {
        checkIfIsCancelled();
        signOut(auth);
    };

    const login = async (data: UserData): Promise<void> => {
        checkIfIsCancelled();
        setState({ ...state, loading: true, error: null });
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            toast.success("Login bem-sucedido!");
        } catch (error) {
            const errorMessage = handleErrorMessage(error);
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
        loading: state.loading,
    };
};
