import { LayoutPage } from "../../components/LayoutPage";
import { LoginForm } from "../../components/LoginForm";
import { TextField } from "../../components/TextField";

const ResetPassword = () => {
  return (
    <LayoutPage>
      <TextField
        title="Esqueceu a senha?"
        paragraph="Digite no campo abaixo para recuperar a senha!"
      />
      <LoginForm isLogin={true} resetPassword={true} />
    </LayoutPage>
  );
};

export default ResetPassword;
