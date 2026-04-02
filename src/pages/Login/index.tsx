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
      <div className="text-center space-y-3 animate-slide-in-from-bottom-4 opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
          <span className="text-primary">Entrar</span>
        </h1>
        <p className="text-muted-foreground text-lg">Faça login para utilizar o sistema!</p>
      </div>
      <div className="animate-slide-in-from-bottom-4 opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
        <LoginForm isLogin={true} resetPassword={false} onSubmit={handleLoginSuccess} />
      </div>
    </LayoutPage>
  );
};

export default Login;
