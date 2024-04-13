// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";
import { useEffect } from "react";
import useLoginForm from "../../hooks/useLoginForm";

// components
import { LoginForm } from "../../components/LoginForm";
import { LayoutPage } from "../../components/LayoutPage";
import { TextField } from "../../components/TextField";

const Login = () => {
    const { error: authError } = useAuthentication();
    const { handleLoginSubmit } = useLoginForm();

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);
    return (
        <LayoutPage>
            <TextField
                title="Entrar"
                paragraph="Faça login para utilizar o sistema!"
            />
            <LoginForm onSubmit={handleLoginSubmit} isLogin={true} />
        </LayoutPage>
    );
};

export default Login;
