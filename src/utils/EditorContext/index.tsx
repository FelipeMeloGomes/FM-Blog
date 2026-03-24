import { createContext, useCallback, useContext, useRef, useState } from "react";

interface EditorContextValue {
  content: string;
  setContent: (content: string) => void;
  getContent: () => string;
  clearContent: () => void;
  handleEditorChange: (content: string) => void;
  editorRef: React.RefObject<{ editor: { getHTML: () => string } | null }>;
}

const EditorContext = createContext<EditorContextValue | null>(null);

export const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditorContext must be used within EditorProvider");
  }
  return context;
};

interface EditorProviderProps {
  children: React.ReactNode;
}

export const EditorProvider = ({ children }: EditorProviderProps) => {
  const [content, setContentState] = useState<string>("");
  const editorRef = useRef<{ editor: { getHTML: () => string } | null }>({ editor: null });

  const setContent = useCallback((newContent: string) => {
    setContentState(newContent);
    if (editorRef.current?.editor) {
      // This will be handled by the Editor component
    }
  }, []);

  const getContent = useCallback((): string => {
    if (editorRef.current?.editor) {
      return editorRef.current.editor.getHTML();
    }
    return content;
  }, [content]);

  const clearContent = useCallback(() => {
    setContentState("");
  }, []);

  const handleEditorChange = useCallback((newContent: string) => {
    setContentState(newContent);
  }, []);

  return (
    <EditorContext.Provider
      value={{ content, setContent, getContent, clearContent, handleEditorChange, editorRef }}
    >
      {children}
    </EditorContext.Provider>
  );
};
