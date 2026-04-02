import { LayoutPage } from "../../components/LayoutPage";
import { LoginForm } from "../../components/LoginForm";

const ResetPassword = () => {
  return (
    <LayoutPage>
      <div className="text-center space-y-3 animate-slide-in-from-bottom-4 opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
          Esqueceu a <span className="text-primary">senha?</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Digite no campo abaixo para recuperar a senha!
        </p>
      </div>
      <div className="animate-slide-in-from-bottom-4 opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
        <LoginForm isLogin={true} resetPassword={true} />
      </div>
    </LayoutPage>
  );
};

export default ResetPassword;
