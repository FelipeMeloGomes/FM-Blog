// Hooks React
import { useState, useRef, useEffect } from "react";

// React Router Dom
import { Link } from "react-router-dom";

// Icons
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";

// Estilos css
import styles from "./LoginForm.module.css";

// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";

// Utils
import { togglePasswordVisibility } from "../../utils/passwordUtils";

const LoginForm = ({ isLogin = false, onSubmit }) => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = [useRef(), useRef(), useRef()];
    const {
        login,
        createUser,
        error: authError,
        loading,
    } = useAuthentication();

    const handlePasswordToggle = (ref) => {
        togglePasswordVisibility(ref, passwordVisible, setPasswordVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!isLogin && password !== confirmPassword) {
            setError("As senhas precisam ser iguais");
            return;
        }

        try {
            const formData = { email, password, displayName };

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
                <div className={styles.flex_column}>
                    <label>Nome de usuário</label>
                    <div className={styles.inputForm}>
                        <FaUser className="icon_font" />
                        <input
                            type="text"
                            name="displayName"
                            value={displayName}
                            alt="Insira seu nome"
                            minLength={6}
                            maxLength={16}
                            required
                            onChange={(e) => setDisplayName(e.target.value)}
                            className={styles.input}
                            placeholder="Nome do usuário"
                        />
                    </div>
                </div>
            )}
            <div className={styles.flex_column}>
                <label>Email</label>
            </div>
            <div className={styles.inputForm}>
                <FiAtSign className="icon_font" />
                <input
                    type="email"
                    name="email"
                    value={email}
                    minLength={6}
                    alt="Insira seu email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    placeholder="Insira seu email"
                />
            </div>
            <div className={styles.flex_column}>
                <label>Senha</label>
            </div>
            <div className={styles.inputForm}>
                <FaLock className="icon_font" />
                <input
                    type="password"
                    name="password"
                    required
                    value={password}
                    className={styles.input}
                    placeholder="Insira sua senha"
                    alt="Insira sua senha"
                    minLength={6}
                    maxLength={64}
                    ref={inputRefs[0]}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordVisible ? (
                    <FaEye
                        className="icon icon_font"
                        onClick={() =>
                            handlePasswordToggle(
                                inputRefs[0],
                                passwordVisible,
                                setPasswordVisible
                            )
                        }
                    />
                ) : (
                    <FaEyeSlash
                        className="icon icon_font"
                        onClick={() =>
                            handlePasswordToggle(
                                inputRefs[0],
                                passwordVisible,
                                setPasswordVisible
                            )
                        }
                    />
                )}
            </div>

            {!isLogin && (
                <div className={styles.flex_column}>
                    <label>Confirmar Senha</label>
                </div>
            )}
            {!isLogin && (
                <div className={styles.inputForm}>
                    <FaLock className="icon_font" />
                    <input
                        type="password"
                        name="confirmPassword"
                        required={!isLogin}
                        className={styles.input}
                        placeholder="Confirme sua senha"
                        alt="Confirme sua senha"
                        value={confirmPassword}
                        minLength={6}
                        maxLength={64}
                        ref={inputRefs[2]}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {passwordVisible ? (
                        <FaEye
                            className="icon icon_font"
                            onClick={() =>
                                handlePasswordToggle(
                                    inputRefs[2],
                                    passwordVisible,
                                    setPasswordVisible
                                )
                            }
                        />
                    ) : (
                        <FaEyeSlash
                            className="icon icon_font"
                            onClick={() =>
                                handlePasswordToggle(
                                    inputRefs[2],
                                    passwordVisible,
                                    setPasswordVisible
                                )
                            }
                        />
                    )}
                </div>
            )}
            {isLogin && (
                <>
                    {!loading && (
                        <button
                            alt="Entrar"
                            disabled={email === "" || password.length < 6}
                            className={styles.btn}
                        >
                            Entrar
                        </button>
                    )}

                    {loading && (
                        <button alt="Aguarde" className={styles.btn} disabled>
                            Aguarde...
                        </button>
                    )}
                </>
            )}
            {!isLogin && (
                <button
                    alt="Cadastrar"
                    disabled={email === "" || password.length < 6}
                    className={styles.btn}
                    type="submit"
                >
                    Cadastrar
                </button>
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
