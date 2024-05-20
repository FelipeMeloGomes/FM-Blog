import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useAuthentication } from "./useAuthentication";

interface FormData {
    displayName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface AuthFormHook {
    formData: FormData;
    setFormData: Dispatch<SetStateAction<FormData>>;
    passwordVisible: boolean;
    setPasswordVisible: Dispatch<SetStateAction<boolean>>;
    passwordVisibleTwo: boolean;
    setPasswordVisibleTwo: Dispatch<SetStateAction<boolean>>;
    error: string;
    setError: Dispatch<SetStateAction<string>>;
    handleSubmit: (
        e: React.FormEvent<HTMLFormElement>,
        data?: FormData
    ) => Promise<void>;
    loading: boolean;
}

export const useAuthForm = (
    isLogin?: boolean,
    onSubmit?: (formData: FormData) => void
): AuthFormHook => {
    const {
        login,
        createUser,
        error: authError,
        loading,
    } = useAuthentication();

    const [formData, setFormData] = useState<FormData>({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [passwordVisibleTwo, setPasswordVisibleTwo] =
        useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        if (e && typeof e.preventDefault === "function") {
            e.preventDefault();
        } else {
            return;
        }

        setError("");

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError("As senhas precisam ser iguais");
            return;
        }

        try {
            if (isLogin) {
                await login(formData);
            } else {
                createUser(formData);
            }

            if (onSubmit) {
                onSubmit(formData);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return {
        formData,
        setFormData,
        passwordVisible,
        setPasswordVisible,
        passwordVisibleTwo,
        setPasswordVisibleTwo,
        error,
        setError,
        handleSubmit,
        loading,
    };
};
