import { LayoutPage } from "../../components/LayoutPage";
import { LoginForm } from "../../components/LoginForm";
import { TextField } from "../../components/TextField";
import { useAuthForm } from "../../hooks/useAuthForm";

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
