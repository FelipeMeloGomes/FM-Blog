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
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-heading font-bold text-foreground">Cadastre-se para postar</h1>
        <p className="text-muted-foreground">Crie o seu usuário e compartilhe suas histórias</p>
      </div>
      <LoginForm isLogin={false} resetPassword={false} onSubmit={handleRegisterSuccess} />
    </LayoutPage>
  );
};

export default Register;
