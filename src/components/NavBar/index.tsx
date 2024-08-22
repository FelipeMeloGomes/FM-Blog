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
    const { user } = useAuthValue() || {};
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
                {Mobile ? <Icon name="Cross" /> : <Icon name="Bars" />}
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
                        <Icon name="Home" className={styles.icon} />
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
                                <Icon name="User" className={styles.icon} />
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
                                <Icon name="Plus" className={styles.icon} />
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
                                <Icon name="Add" className={styles.icon} />
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
                                    name="Dashboard"
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
                                <Icon name="Cloud" className={styles.icon} />
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
                        <Icon name="Info" className={styles.icon} />
                        Sobre
                    </NavLink>
                </li>

                {user && (
                    <li>
                        <button className={styles.bntLogout} onClick={logout}>
                            <Icon name="Logout" className={styles.icon} />
                            Sair
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export { NavBar };
