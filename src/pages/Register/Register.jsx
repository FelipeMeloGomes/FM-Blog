// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";
import { useEffect } from "react";
import { useLoginForm } from "../../hooks/useLoginForm";

// components
import { LoginForm } from "../../components/LoginForm";
import { LayoutPage } from "./../../components/LayoutPage";
import { TextField } from "../../components/TextField";

const Register = () => {
    const { error: authError } = useAuthentication();
    const { handleSignupSubmit } = useLoginForm();

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <LayoutPage>
            <TextField
                title="Cadastre-se para postar"
                paragraph="Crie o seu usuário e compartilhe suas histórias"
            />
            <LoginForm onSubmit={handleSignupSubmit} isLogin={false} />
        </LayoutPage>
    );
};

export default Register;
