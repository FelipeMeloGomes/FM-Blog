import { useAuthForm } from "../../hooks/useAuthForm";
import { LoginForm } from "../../components/LoginForm";
import { LayoutPage } from "../../components/LayoutPage";
import { TextField } from "../../components/TextField";

const Register = () => {
  const { handleSubmit } = useAuthForm();

  return (
    <LayoutPage>
      <TextField
        title="Cadastre-se para postar"
        paragraph="Crie o seu usuário e compartilhe suas histórias"
      />
      <LoginForm onSubmit={handleSubmit} isLogin={false} resetPassword={false} />
    </LayoutPage>
  );
};

export { Register };
