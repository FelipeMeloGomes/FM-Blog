export interface TextFieldProps {
    title?: string;
    paragraph?: string;
    padding?: string;
    marginBottom?: string;
    textAlignTitle?: TextAlign | undefined;
    textAlignParagraph?: TextAlign | undefined;
    color?: string;
    margin?: string;
}

export type TextAlign = "left" | "right" | "center" | "justify";
