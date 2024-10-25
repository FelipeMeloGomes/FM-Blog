import { LayoutPage } from "../../components/LayoutPage";
import { LoginForm } from "../../components/LoginForm";
import { TextField } from "../../components/TextField";
import { useAuthForm } from "../../hooks/useAuthForm";

const Login = () => {
    const { handleSubmit } = useAuthForm();

    return (
        <LayoutPage>
            <TextField
                title="Entrar"
                paragraph="Faça login para utilizar o sistema!"
            />
            <LoginForm onSubmit={handleSubmit} isLogin={true} resetPassword={false} />
        </LayoutPage>
    );
};

export { Login };
