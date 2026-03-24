export interface EditorProps {
  value?: string;
  onChange?: (content: string) => void;
}

export interface EditorRef {
  editor: HTMLElement | null;
}
