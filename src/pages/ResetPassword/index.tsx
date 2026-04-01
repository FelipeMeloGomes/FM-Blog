import { LayoutPage } from "../../components/LayoutPage";
import { LoginForm } from "../../components/LoginForm";

const ResetPassword = () => {
  return (
    <LayoutPage>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-heading font-bold text-foreground">Esqueceu a senha?</h1>
        <p className="text-muted-foreground">Digite no campo abaixo para recuperar a senha!</p>
      </div>
      <LoginForm isLogin={true} resetPassword={true} />
    </LayoutPage>
  );
};

export default ResetPassword;
