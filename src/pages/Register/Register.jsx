// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from "react";

// components
import TitleParagraph from "../../components/TitleParagraph/TitleParagraph";
import LoginForm from "../../components/LoginForm/LoginForm";
import LayoutPage from "./../../components/LayoutPage/LayoutPage";

const Register = () => {
    const { createUser, error: authError } = useAuthentication();
    const [error, setError] = useState("");

    const handleSubmit = async (formData) => {
        try {
            setError("");

            const user = await createUser({
                displayName: formData.displayName,
                email: formData.email,
                password: formData.password,
            });

            if (user) {
                console.log("Usuário criado:", user);
            } else {
                throw new Error("Erro ao criar usuário");
            }
        } catch (error) {
            console.error("Erro:", error);
            setError(error.message);
        }
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <LayoutPage>
            <TitleParagraph
                title="Cadastre-se para postar"
                paragraph="Crie o seu usuário e compartilhe suas histórias"
            />
            <LoginForm onSubmit={handleSubmit} isLogin={false} />
        </LayoutPage>
    );
};

export default Register;
