// Hooks
import { useState } from "react";
import { useAuthentication } from "./useAuthentication";

const useLoginForm = () => {
    const { login, createUser } = useAuthentication();
    const [error, setError] = useState("");

    const handleLoginSubmit = async (formData) => {
        try {
            setError("");
            const res = await login(formData);
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    const handleSignupSubmit = async (formData) => {
        try {
            setError("");

            const user = await createUser(formData);

            if (user && user.uid) {
                console.log("Usuário criado:", user);
            } else {
                throw new Error("Erro ao criar usuário");
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    return { error, handleLoginSubmit, handleSignupSubmit };
};

export default useLoginForm;
