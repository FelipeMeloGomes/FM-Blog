// Hooks
import { memo } from "react";

// Estilos css
import styles from "./NotFound.module.css";

// Components
import TitleParagraph from "../../components/TitleParagraph/TitleParagraph";
import LayoutPage from "../../components/LayoutPage/LayoutPage";

// Img
import NotFoundImg from "./assets/NotFoundImg.webp";

// React Router Dom
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <LayoutPage>
            <TitleParagraph
                title="404"
                paragraph="Página Não Encontrada Desculpe."
            />
            <div className={styles.center}>
                <figure>
                    <img
                        className={styles.container}
                        src={NotFoundImg}
                        alt="not found"
                        loading="lazy"
                    />
                </figure>
            </div>
            <Link to="/" className="btn btn-outline">
                Retornar a Home
            </Link>
        </LayoutPage>
    );
};

export default memo(PageNotFound);
