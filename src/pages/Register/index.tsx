import { useNavigate } from "react-router-dom";
import { LayoutPage } from "../../components/LayoutPage";
import { LoginForm } from "../../components/LoginForm";
import { TextField } from "../../components/TextField";

const Register = () => {
  const navigate = useNavigate();

  const handleRegisterSuccess = () => {
    navigate("/");
  };

  return (
    <LayoutPage>
      <TextField
        title="Cadastre-se para postar"
        paragraph="Crie o seu usuário e compartilhe suas histórias"
      />
      <LoginForm isLogin={false} resetPassword={false} onSubmit={handleRegisterSuccess} />
    </LayoutPage>
  );
};

export default Register;
