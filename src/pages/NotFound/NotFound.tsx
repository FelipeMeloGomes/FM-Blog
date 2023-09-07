// hooks
import { memo } from "react";

// estilos
import styles from "./NotFound.module.css";



const NotFound = () => {
    return <h1 className={styles.h1}>Ooops... Essa página não existe.</h1>;
};

export default memo(NotFound);
