import { useNavigate } from "react-router-dom";
import { LayoutPage } from "../../components/LayoutPage";
import { LoginForm } from "../../components/LoginForm";

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate("/");
  };

  return (
    <LayoutPage>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-heading font-bold text-foreground">Entrar</h1>
        <p className="text-muted-foreground">Faça login para utilizar o sistema!</p>
      </div>
      <LoginForm isLogin={true} resetPassword={false} onSubmit={handleLoginSuccess} />
    </LayoutPage>
  );
};

export default Login;
