// hooks
import { memo } from "react";

// estilos
import styles from "./PageNotFound.module.css";

// imagem
import notfound from "./notfound.jpg";

const PageNotFound = () => {
    return (
        <div>
            <h1 className={styles.h1}>Ooops... Essa página não existe.</h1>;
            <img src={notfound} alt="erro 404 imagem" />
        </div>
    );
};

export default memo(PageNotFound);
