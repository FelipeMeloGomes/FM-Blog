// Estilos Css
import styles from "./TitleParagraph.module.css";

const TitleParagraph = ({
    title = "",
    paragraph = "",
    padding = "",
    marginBottom = "",
    textAlignTitle = "",
    textAlignParagraph = "",
    color = "",
}) => {
    return (
        <>
            <h1
                className={styles.title}
                style={{ padding, textAlign: textAlignTitle, color }}
            >
                {title}
            </h1>
            <p
                className={styles.paragraph}
                style={{ marginBottom, textAlign: textAlignParagraph, color }}
            >
                {paragraph}
            </p>
        </>
    );
};

export default TitleParagraph;
