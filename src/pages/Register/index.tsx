import { LayoutPage } from "../../components/LayoutPage";
import { LoginForm } from "../../components/LoginForm";
import { TextField } from "../../components/TextField";

const Register = () => {
  return (
    <LayoutPage>
      <TextField
        title="Cadastre-se para postar"
        paragraph="Crie o seu usuário e compartilhe suas histórias"
      />
      <LoginForm isLogin={false} resetPassword={false} />
    </LayoutPage>
  );
};

export default Register;
