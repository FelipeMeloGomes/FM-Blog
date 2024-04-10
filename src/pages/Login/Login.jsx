// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";
import { useEffect } from "react";
import useLoginForm from "../../hooks/useLoginForm";

// components
import { TitleParagraph } from "../../components/TitleParagraph";
import { LoginForm } from "../../components/LoginForm";
import { LayoutPage } from "../../components/LayoutPage";

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
            <TitleParagraph
                title="Entrar"
                paragraph="Faça login para utilizar o sistema!"
            />
            <LoginForm onSubmit={handleLoginSubmit} isLogin={true} />
        </LayoutPage>
    );
};

export default Login;
