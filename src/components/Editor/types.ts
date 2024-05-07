import ReactQuill from "react-quill";

export interface EditorProps {
    value?: string;
    onChange?: (content: string) => void;
}

export type EditorRef = ReactQuill & {
    editor: HTMLElement | null;
};
