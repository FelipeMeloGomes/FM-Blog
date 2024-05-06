import { useState } from "react";

const EditorContext = () => {
    const [content, setContent] = useState("");
    const handleEditorChange = (content:any) => {
        setContent(content);
    };
    return { handleEditorChange, content, setContent };
};

export default EditorContext;
