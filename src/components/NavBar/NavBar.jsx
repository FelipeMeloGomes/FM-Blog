// React Router Dom
import { NavLink } from "react-router-dom";

// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { useState } from "react";

// Estilos css
import styles from "./NavBar.module.css";

// Icons
import { FaBars } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const NavBar = () => {
    const [Mobile, setMobile] = useState(false);
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return (
        <nav className={styles.navbar}>
            <NavLink className={styles.brand} to="/">
                FM <span>Blog</span>
            </NavLink>
            <ul
                className={Mobile ? styles.nav_links_mobile : styles.nav_links}
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
                        Sobre
                    </NavLink>
                </li>

                {user && (
                    <li>
                        <button onClick={logout}>Sair</button>
                    </li>
                )}
            </ul>
            <button
                alt="menu mobile"
                role="menu mobile"
                aria-label="menu mobile"
                className={styles.mobile_menu_icon}
                onClick={() => setMobile(!Mobile)}
            >
                {Mobile ? <ImCross /> : <FaBars />}
            </button>
        </nav>
    );
};

export default NavBar;
