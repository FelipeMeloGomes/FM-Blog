// Estilos css
import styles from "./NotFound.module.css";

// Components
import TitleParagraph from "../../components/TitleParagraph/TitleParagraph";

// Img
import NotFoundImg from "./assets/NotFoundImg.webp";

// React Router Dom
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <TitleParagraph
                color="black"
                title="404"
                paragraph="Página Não Encontrada Desculpe."
            />
            <div className={styles.containerBtn}>
                <Link to="/" className="btn btn-outline">
                    Home
                </Link>
            </div>
            <div className={styles.center}>
                <figure>
                    <img
                        className={styles.containerImg}
                        src={NotFoundImg}
                        alt="not found"
                        loading="lazy"
                    />
                </figure>
            </div>
        </div>
    );
};

export default NotFound;
