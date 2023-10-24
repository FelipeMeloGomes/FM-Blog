// Hooks
import { memo } from "react";

// CSS
import styles from "./PageNotFound.module.css";

// img
import notfound from "./notfound.png";

// React
import React from "react";

// React Router Dom
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div>
            <h1>Ooops... Essa página não existe.</h1>
            <div className={styles.container_404}>
                <img src={notfound} alt="erro 404 imagem" />
            </div>
            <br />
            <Link to="/" className="btn btn-outline">
                Voltar
            </Link>
        </div>
    );
};

export default memo(PageNotFound);
