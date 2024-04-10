// Hooks React
import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

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

const LoginForm = ({ isLogin = false, onSubmit }) => {
    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisibleTwo, setPasswordVisibleTwo] = useState(false);
    const [error, setError] = useState("");
    const {
        login,
        createUser,
        error: authError,
        loading,
    } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!isLogin && formData.password !== formData.confirmPassword) {
            setError("As senhas precisam ser iguais");
            return;
        }

        try {
            let res;
            if (isLogin) {
                res = await login(formData);
            } else {
                res = await createUser(formData);
            }

            onSubmit(formData);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {!isLogin && (
                <TextInputWithIcon
                    label="Nome de usuário"
                    name="displayName"
                    value={formData.displayName}
                    icon={Icon}
                    iconName={"user"}
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
                icon={Icon}
                iconName={"sign"}
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
                minLength={6}
                maxLength={64}
                icon={Icon}
                iconName={"lock"}
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
                    label="Confirmar Senha"
                    placeholder="Confirme a sua senha"
                    alt="Confirme a  sua senha"
                    icon={Icon}
                    iconName={"lock"}
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

export default LoginForm;
