import { useState } from "react";

const useEditorContext = () => {
  const [content, setContent] = useState("");

  const handleEditorChange = (content: string) => setContent(content);

  return { content, handleEditorChange, setContent };
};

export { useEditorContext };
