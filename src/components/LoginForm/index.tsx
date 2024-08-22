// Hooks
import { useAuthForm } from "../../hooks/useAuthForm";

// React Router Dom
import { Link } from "react-router-dom";

// Estilos css
import styles from "./LoginForm.module.css";

// Components
import { TextInputWithIcon } from "../TextInputWithIcon";
import { PasswordInputWithToggle } from "../PasswordInputWithToggle";
import { SubmitButton } from "../SubmitButton";
import { Icon } from "../IconComponent";

// utils
import { PasswordToggle } from "../../utils/PasswordToggle";
import { loginFormProps } from "./types";

const LoginForm: React.FC<loginFormProps> = ({ isLogin, onSubmit }) => {
    const {
        error,
        formData,
        setFormData,
        passwordVisible,
        setPasswordVisible,
        passwordVisibleTwo,
        setPasswordVisibleTwo,
        handleSubmit,
        loading,
    } = useAuthForm(isLogin, onSubmit);

    return (
        <form
            onSubmit={(e) => handleSubmit(e, formData)}
            className={styles.form}
        >
            {!isLogin && (
                <TextInputWithIcon
                    label="Nome de usuário"
                    name="displayName"
                    value={formData.displayName}
                    iconName="User"
                    minLength={6}
                    maxLength={16}
                    required
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            displayName: e.target.value,
                        })
                    }
                    placeholder="Nome do usuário"
                    alt="Insira seu nome"
                />
            )}

            <TextInputWithIcon
                label="Email"
                name="email"
                iconName="Sign"
                value={formData.email}
                minLength={6}
                required
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Insira seu email"
                alt="Insira seu email"
            />

            <PasswordInputWithToggle
                label="Senha"
                name="password"
                value={formData.password}
                iconName="Lock"
                minLength={6}
                maxLength={64}
                icon={Icon}
                required
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Insira sua senha"
                alt="Insira sua senha"
                passwordVisible={passwordVisibleTwo}
                togglePasswordVisibility={() =>
                    PasswordToggle(setPasswordVisibleTwo)
                }
            />
            {!isLogin && (
                <PasswordInputWithToggle
                    iconName="Lock"
                    label="Confirmar Senha"
                    placeholder="Confirme a sua senha"
                    alt="Confirme a  sua senha"
                    icon={Icon}
                    minLength={6}
                    maxLength={64}
                    required
                    value={formData.confirmPassword}
                    passwordVisible={passwordVisible}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                        })
                    }
                    togglePasswordVisibility={() =>
                        PasswordToggle(setPasswordVisible)
                    }
                    name={""}
                />
            )}

            {isLogin && (
                <>
                    {!loading && (
                        <SubmitButton
                            alt="Entrar"
                            disabled={
                                formData.email === "" ||
                                formData.password.length < 6
                            }
                        >
                            Entrar
                        </SubmitButton>
                    )}

                    {loading && (
                        <SubmitButton disabled>Aguarde...</SubmitButton>
                    )}
                </>
            )}
            {!isLogin && (
                <SubmitButton
                    alt="Cadastrar"
                    disabled={
                        formData.email === "" || formData.password.length < 6
                    }
                    type="submit"
                >
                    Cadastrar
                </SubmitButton>
            )}

            {isLogin && (
                <div>
                    <p className={styles.p}>
                        Não tem uma conta?{" "}
                        <span className={styles.span}>
                            <Link to="/register">Cadastre-se</Link>
                        </span>
                    </p>
                </div>
            )}
            {!isLogin && (
                <div>
                    <p className={styles.p}>
                        Já tem uma conta?{" "}
                        <span className={styles.span}>
                            <Link to="/login">Entrar</Link>
                        </span>
                    </p>
                </div>
            )}
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export { LoginForm };
