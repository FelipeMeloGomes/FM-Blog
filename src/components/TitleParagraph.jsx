// Estilos Css
import styles from "./TitleParagraph.module.css";

const TitleParagraph = ({ title = "", paragraph = "" }) => {
    return (
        <>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.paragraph}>{paragraph}</p>
        </>
    );
};

export default TitleParagraph;
