import { NavLink } from "react-router-dom";
import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";

// css
import styles from "./NavBar.module.css";

const NavBar = () => {
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return (
        <nav className={styles.navbar}>
            <NavLink to="/" end className={styles.brand}>
                
            </NavLink>
            <ul className={styles.links_list}>
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
        </nav>
    );
};

export default NavBar;
