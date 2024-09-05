import { TextFieldProps } from "./types";

const TextField = ({
  title = "",
  paragraph = "",
  padding = "",
  marginBottom = "",
  textAlignTitle = "center",
  textAlignParagraph = "center",
  color = "",
  margin = "",
}: TextFieldProps) => {
  return (
    <>
      <h1
        className="text-center p-4"
        style={{ padding, textAlign: textAlignTitle, color, margin }}
      >
        {title}
      </h1>
      <p
        className="text-gray-400 m-2 text-center"
        style={{ marginBottom, textAlign: textAlignParagraph, color }}
      >
        {paragraph}
      </p>
    </>
  );
};

export { TextField };
