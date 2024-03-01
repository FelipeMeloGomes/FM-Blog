// React Router Dom
import { NavLink } from "react-router-dom";

// Hooks
import { useAuthentication } from "../../hooks/useAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { useState } from "react";

// Estilos css
import styles from "./NavBar.module.css";

// Icons
import {
    FaBars,
    FaHome,
    FaInfo,
    FaCloud,
    FaPlus,
    FaUser,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { MdOutlinePostAdd, MdDashboard } from "react-icons/md";

const NavBar = () => {
    const [Mobile, setMobile] = useState(false);
    const { user } = useAuthValue();
    const { logout } = useAuthentication();

    return (
        <nav className={styles.navbar}>
            <NavLink className={styles.brand} to="/">
                FM <span>Blog</span>
            </NavLink>

            <button
                alt="menu mobile"
                role="menu mobile"
                aria-label="menu mobile"
                className={styles.mobile_icon}
                onClick={() => setMobile(!Mobile)}
            >
                {Mobile ? <ImCross /> : <FaBars />}
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
                        <FaHome className={styles.icon} />
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
                                <FaUser className={styles.icon} />
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
                                <FaPlus className={styles.icon} />
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
                                <MdOutlinePostAdd className={styles.icon} />
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
                                <MdDashboard className={styles.icon} />
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
                                <FaCloud className={styles.icon} />
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
                        <FaInfo className={styles.icon} />
                        Sobre
                    </NavLink>
                </li>

                {user && (
                    <li>
                        <button className={styles.bntLogout} onClick={logout}>
                            <FiLogOut className={styles.icon} />
                            Sair
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;
