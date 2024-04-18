// Estilos Css
import styles from "./TextField.module.css";

const TextField = ({
    title = "",
    paragraph = "",
    padding = "",
    marginBottom = "",
    textAlignTitle = "",
    textAlignParagraph = "",
    color = "",
    margin = "",
}) => {
    return (
        <>
            <h1
                className={styles.title}
                style={{ padding, textAlign: textAlignTitle, color, margin }}
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

export default TextField;
