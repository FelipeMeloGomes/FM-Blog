import { useState } from "react";

const EditorContext = () => {
    const [content, setContent] = useState("");
    const handleEditorChange = (content) => {
        setContent(content);
    };
    return { handleEditorChange, content, setContent };
};

export default EditorContext;
