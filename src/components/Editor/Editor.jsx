// React Quill
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// React
import { forwardRef } from "react";

export const Editor = forwardRef(({ value, onChange }, ref) => {
    return (
        <ReactQuill
            className="editor"
            value={value}
            onChange={onChange}
            theme="snow"
            placeholder="Digite o conteúdo aqui"
            ref={ref}
        />
    );
});

export default Editor;
