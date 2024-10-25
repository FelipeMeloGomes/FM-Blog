import { forwardRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { EditorProps, EditorRef } from "./types";

export const Editor = forwardRef<EditorRef, EditorProps>(
  ({ value, onChange }, ref) => {
    const toolbarOptions = [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link"],
      ["clean"],
    ];
    return (
      <ReactQuill
        className="max-w-full w-full h-full"
        value={value}
        onChange={onChange}
        theme="snow"
        placeholder="Digite o conteúdo aqui"
        ref={ref}
        modules={{ toolbar: toolbarOptions }}
      />
    );
  },
);

export default Editor;
