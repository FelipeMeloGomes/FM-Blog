import { useNavigate } from "react-router-dom";
import { LayoutPage } from "../../components/LayoutPage";
import { LoginForm } from "../../components/LoginForm";
import { TextField } from "../../components/TextField";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/");
  };

  return (
    <LayoutPage>
      <TextField title="Entrar" paragraph="Faça login para utilizar o sistema!" />
      <LoginForm isLogin={true} resetPassword={false} onSubmit={handleLoginSuccess} />
    </LayoutPage>
  );
};

export default Login;
