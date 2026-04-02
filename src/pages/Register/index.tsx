import { useNavigate } from "react-router-dom";
import { LayoutPage } from "../../components/LayoutPage";
import { LoginForm } from "../../components/LoginForm";

const Register = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate("/");
  };

  return (
    <LayoutPage>
      <div className="text-center space-y-3 animate-slide-in-from-bottom-4 opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
          Cadastre-se para <span className="text-primary">postar</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Crie o seu usuário e compartilhe suas histórias
        </p>
      </div>
      <div className="animate-slide-in-from-bottom-4 opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
        <LoginForm isLogin={false} resetPassword={false} onSubmit={handleRegisterSuccess} />
      </div>
    </LayoutPage>
  );
};

export default Register;
