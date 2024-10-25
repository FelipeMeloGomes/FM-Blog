import { LayoutPage } from "../../components/LayoutPage";
import { LoginForm } from "../../components/LoginForm";
import { TextField } from "../../components/TextField";
import { useAuthForm } from "../../hooks/useAuthForm";

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
