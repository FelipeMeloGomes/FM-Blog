// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";
import { useState, useEffect } from "react";

// components
import TitleParagraph from "../../components/TitleParagraph/TitleParagraph";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = (props) => {
    const { login, error: authError } = useAuthentication();
    const [error, setError] = useState("");

    const handleSubmit = async (formData) => {
        try {
            setError("");
            const res = await login({
                email: formData.email,
                password: formData.password,
            });
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);
    return (
        <div style={{ height: "100vh" }}>
            <TitleParagraph
                title="Entrar"
                paragraph="Faça login para utilizar o sistema!"
            />
            <LoginForm onSubmit={handleSubmit} isLogin={true} />
        </div>
    );
};

export default Login;
