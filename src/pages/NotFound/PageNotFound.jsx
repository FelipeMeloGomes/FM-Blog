// Hooks
import { memo } from "react";

// Estilos css
import styles from "./PageNotFound.module.css";

// Img
import NotFoundImg from "../NotFound/NotFoundImg.webp";

// React Router Dom
import { Link } from "react-router-dom";
import TitleParagraph from "./../../components/TitleParagraph/TitleParagraph";
import LayoutPage from './../../components/LayoutPage/LayoutPage';

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
