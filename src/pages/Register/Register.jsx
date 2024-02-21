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
        e.preventDefault();

        setError("");

        const user = {
            displayName: formData.displayName,
            email: formData.email,
            password: formData.password,
        };

        if (formData.password !== formData.confirmPassword) {
            setError("As senhas precisam ser iguais");
            return;
        }

        const res = await createUser(user);
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
