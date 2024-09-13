import { useAuthForm } from "../../hooks/useAuthForm";
import { LoginForm } from "../../components/LoginForm";
import { LayoutPage } from "../../components/LayoutPage";
import { TextField } from "../../components/TextField";

const ResetPassword = () => {
  const { handlePasswordReset } = useAuthForm();

  return (
    <LayoutPage>
      <TextField
        title="Esqueceu a senha?"
        paragraph="Digite no campo abaixo para recuperar a senha!"
      />
      <LoginForm onSubmit={handlePasswordReset} isLogin={true}  resetPassword={true}/>
    </LayoutPage>
  );
};

export { ResetPassword };
