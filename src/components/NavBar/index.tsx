// React Router Dom
import { NavLink } from "react-router-dom";

// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { useState } from "react";

// Components
import { Icon } from "../IconComponent";

// Estilos css
import styles from "./NavBar.module.css";
import { MobileMenuButtonProps } from "./types";

const NavBar: React.FC<MobileMenuButtonProps> = () => {
    const [Mobile, setMobile] = useState(false);
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return (
        <nav className={styles.navbar}>
            <NavLink className={styles.brand} to="/">
                FM <span>Blog</span>
            </NavLink>

            <button
                role="menu mobile"
                aria-label="menu mobile"
                className={styles.mobile_icon}
                onClick={() => setMobile(!Mobile)}
            >
                {Mobile ? <Icon name="cross" /> : <Icon name="bars" />}
            </button>
            <ul
                className={Mobile ? styles.nav_mobile : styles.nav_list}
                onClick={() => setMobile(false)}
            >
                <li>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive ? styles.active : ""
                        }
                    >
                        <Icon name="home" className={styles.icon} />
                        Home
                    </NavLink>
                </li>
                {!user && (
                    <>
                        <li>
                            <NavLink
                                to="/login"
                                end
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                <Icon name="user" className={styles.icon} />
                                Entrar
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/register"
                                end
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                {" "}
                                <Icon name="plus" className={styles.icon} />
                                Cadastrar
                            </NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li>
                            <NavLink
                                to="/posts/create"
                                end
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                <Icon name="add" className={styles.icon} />
                                Novo Post
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/dashboard"
                                end
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                <Icon
                                    name="dashboard"
                                    className={styles.icon}
                                />
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/weather"
                                end
                                className={({ isActive }) =>
                                    isActive ? styles.active : ""
                                }
                            >
                                <Icon name="cloud" className={styles.icon} />
                                Clima
                            </NavLink>
                        </li>
                    </>
                )}

                <li>
                    <NavLink
                        to="/about"
                        end
                        className={({ isActive }) =>
                            isActive ? styles.active : ""
                        }
                    >
                        <Icon name="info" className={styles.icon} />
                        Sobre
                    </NavLink>
                </li>

                {user && (
                    <li>
                        <button className={styles.bntLogout} onClick={logout}>
                            <Icon name="logout" className={styles.icon} />
                            Sair
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export { NavBar };
