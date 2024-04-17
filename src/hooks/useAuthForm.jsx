// Hooks
import { useState, useEffect } from "react";
import { useAuthentication } from "./useAuthentication";

export const useAuthForm = (isLogin, onSubmit) => {
    const {
        login,
        createUser,
        error: authError,
        loading,
    } = useAuthentication();

    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisibleTwo, setPasswordVisibleTwo] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
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
            let res = "";
            if (isLogin) {
                res = await login(formData);
            } else {
                res = await createUser(formData);
            }

            if (onSubmit) {
                onSubmit(formData);
            }
        } catch (error) {
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
