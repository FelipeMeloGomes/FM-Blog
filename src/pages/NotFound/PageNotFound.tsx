// Hooks
import { memo } from "react";

// Estilos css
import styles from "./PageNotFound.module.css";

// Img
import NotFoundImg from "../NotFound/NotFoundImg.webp";

// React Router Dom
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div className={styles.erro_page}>
            <div className={styles.typograph}>
                <h1>404</h1>
                <p>Página Não Encontrada Desculpe.</p>
            </div>
            <div className={styles.center}>
                <figure>
                    <img
                        className={styles.container}
                        src={NotFoundImg}
                        alt="not found"
                    />
                </figure>
            </div>
            <Link to="/" className="btn btn-outline">
                Retornar a Home
            </Link>
        </div>
    );
};

export default memo(PageNotFound);
