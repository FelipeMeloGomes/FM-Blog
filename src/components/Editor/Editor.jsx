// React Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// React
import { forwardRef } from "react";

export const Editor = forwardRef(({ value, onChange }, ref) => {
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
            className="editor"
            value={value}
            onChange={onChange}
            theme="snow"
            placeholder="Digite o conteúdo aqui"
            ref={ref}
            modules={{ toolbar: toolbarOptions }}
        />
    );
});

export default Editor;
