// Hooks
import { memo } from "react";

// Estilos css
import styles from "./PageNotFound.module.css";

// Img
import notFound from "../NotFound/Erro.png";

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
                        src={notFound}
                        alt="not found"
                    />
                </figure>
            </div>
            <Link to="/" className="btn btn-outline">
                Retornar a Home
            </Link>
            <br />
        </div>
    );
};

export default memo(PageNotFound);
