// Hooks React
import { useState, useEffect } from "react";

// React Router Dom
import { Link } from "react-router-dom";

// Icons
import { FaUser, FaLock } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";

// Estilos css
import styles from "./LoginForm.module.css";

// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";

// Components
import TextInputWithIcon from "../TextInputWithIcon/TextInputWithIcon";
import PasswordInputWithToggle from "../PasswordInputWithToggle/PasswordInputWithToggle";
import SubmitButton from "../SubmitButton/SubmitButton";

const LoginForm = ({ isLogin = false, onSubmit }) => {
    const [formData, setFormData] = useState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordVisible2, setPasswordVisible2] = useState(false);
    const [error, setError] = useState("");
    const {
        login,
        createUser,
        error: authError,
        loading,
    } = useAuthentication();

    const handlePasswordToggle = (setPasswordVisible) => {
        setPasswordVisible((prev) => !prev);
    };

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
                    Icon={FaUser}
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
                value={formData.email}
                Icon={FiAtSign}
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
                Icon={FaLock}
                required
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Insira sua senha"
                alt="Insira sua senha"
                passwordVisible={passwordVisible2}
                togglePasswordVisibility={() =>
                    handlePasswordToggle(setPasswordVisible2)
                }
            />
            {!isLogin && (
                <PasswordInputWithToggle
                    label="Confirmar Senha"
                    placeholder="Confirme a sua senha"
                    alt="Confirme a  sua senha"
                    Icon={FaLock}
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
                        handlePasswordToggle(setPasswordVisible)
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
