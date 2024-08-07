// Estilos Css
import styles from "./TextField.module.css";
import { TextFieldProps } from "./types";

const TextField: React.FC<TextFieldProps> = ({
    title = "",
    paragraph = "",
    padding = "",
    marginBottom = "",
    textAlignTitle = "center",
    textAlignParagraph = "center",
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

export { TextField };
