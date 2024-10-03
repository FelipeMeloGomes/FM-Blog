import { useState, useCallback } from "react";

const useEditorContext = () => {
  const [content, setContent] = useState<string>("");

  const handleEditorChange = useCallback((content: string) => {
    setContent(content);
  }, []);

  return { content, handleEditorChange, setContent };
};

export { useEditorContext };
