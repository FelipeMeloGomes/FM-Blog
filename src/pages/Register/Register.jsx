// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";
import { useEffect } from "react";
import useLoginForm from "../../hooks/useLoginForm";

// components
import { TitleParagraph } from "../../components/TitleParagraph";
import { LoginForm } from "../../components/LoginForm";
import { LayoutPage } from "./../../components/LayoutPage";

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
            <TitleParagraph
                title="Cadastre-se para postar"
                paragraph="Crie o seu usuário e compartilhe suas histórias"
            />
            <LoginForm onSubmit={handleSignupSubmit} isLogin={false} />
        </LayoutPage>
    );
};

export default Register;
