// React Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// React
import { forwardRef } from "react";

export const Editor = forwardRef(({ value, onChange }, ref) => {
    const toolbarOptions = [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        ["link"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
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
