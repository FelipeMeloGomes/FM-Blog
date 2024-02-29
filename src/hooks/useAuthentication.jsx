import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { useState, useEffect } from "react";

export const useAuthentication = () => {
    const [state, setState] = useState({
        error: null,
        loading: false,
        cancelled: false // Estado para lidar com vazamento de memória
    });

    const auth = getAuth();

    const handleErrorMessage = (error) => {
        let systemErrorMessage;
        if (error.message.includes("Password")) {
            systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
        } else if (error.message.includes("email-already")) {
            systemErrorMessage = "E-mail já cadastrado.";
        } else if (error.message.includes("user-not-found")) {
            systemErrorMessage = "Usuário não encontrado.";
        } else if (error.message.includes("wrong-password")) {
            systemErrorMessage = "Senha incorreta.";
        } else {
            systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
        }
        return systemErrorMessage;
    };

    const checkIfIsCancelled = () => {
        if (state.cancelled) {
            return;
        }
    };

    const createUser = async (data) => {
        checkIfIsCancelled();
        setState({ ...state, loading: true });
        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(user, { displayName: data.displayName });
            return user;
        } catch (error) {
            const errorMessage = handleErrorMessage(error);
            setState({ error: errorMessage, loading: false });
            throw new Error(errorMessage);
        }
    };

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    };

    const login = async (data) => {
        checkIfIsCancelled();
        setState({ ...state, loading: true, error: null });
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            const errorMessage = handleErrorMessage(error);
            setState({ error: errorMessage, loading: false });
        }
    };

    useEffect(() => {
        return () => setState({ ...state, cancelled: true }); // Função de limpeza para evitar vazamento de memória
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
