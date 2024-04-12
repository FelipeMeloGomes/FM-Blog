// Estilos Css
import styles from "./TitleParagraph.module.css";

const TitleParagraph = ({
    title = "",
    paragraph = "",
    padding = "",
    marginBottom = "",
    textAlign = "",
    color = "",
}) => {
    return (
        <>
            <h1 className={styles.title} style={{ padding, textAlign, color }}>
                {title}
            </h1>
            <p
                className={styles.paragraph}
                style={{ marginBottom, textAlign, color }}
            >
                {paragraph}
            </p>
        </>
    );
};

export default TitleParagraph;
