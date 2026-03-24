import { LayoutPage } from "../../components/LayoutPage";
import { LoginForm } from "../../components/LoginForm";
import { TextField } from "../../components/TextField";

const Login = () => {
  return (
    <LayoutPage>
      <TextField title="Entrar" paragraph="Faça login para utilizar o sistema!" />
      <LoginForm isLogin={true} resetPassword={false} />
    </LayoutPage>
  );
};

export default Login;
