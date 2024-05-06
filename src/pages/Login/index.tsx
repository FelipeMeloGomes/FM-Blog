// Hooks
import { useAuthForm } from "../../hooks/useAuthForm";

// components
import { LoginForm } from "../../components/LoginForm";
import { LayoutPage } from "../../components/LayoutPage";
import { TextField } from "../../components/TextField";

const Login = () => {
    const { handleSubmit } = useAuthForm();

    return (
        <LayoutPage>
            <TextField
                title="Entrar"
                paragraph="Faça login para utilizar o sistema!"
            />
            <LoginForm onSubmit={handleSubmit} isLogin={true} />
        </LayoutPage>
    );
};

export { Login };
