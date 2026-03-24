import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { forwardRef, useCallback, useEffect, useRef } from "react";
import { useEditorContext } from "../../utils/EditorContext";
import type { EditorProps, EditorRef } from "./types";

export const Editor = forwardRef<EditorRef, EditorProps>(({ value }, _ref) => {
  const { setContent, editorRef: contextEditorRef } = useEditorContext();
  const internalEditorRef = useRef<{ editor: { getHTML: () => string } | null } | null>(null);

  const handleUpdate = useCallback(
    ({ editor }: { editor: { getHTML: () => string } }) => {
      const html = editor.getHTML();
      setContent(html);
    },
    [setContent]
  );

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Placeholder.configure({
        placeholder: "Digite o conteúdo aqui",
      }),
    ],
    content: value || "",
    onUpdate: handleUpdate,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[200px] p-4",
      },
    },
  });

  useEffect(() => {
    if (editor) {
      internalEditorRef.current = { editor };
      if (contextEditorRef) {
        (
          contextEditorRef as React.MutableRefObject<{ editor: { getHTML: () => string } | null }>
        ).current = {
          editor,
        };
      }
    }
  }, [editor, contextEditorRef]);

  useEffect(() => {
    if (editor && value !== undefined && editor.getHTML() !== value) {
      editor.commands.setContent(value || "");
    }
  }, [editor, value]);

  if (!editor) {
    return null;
  }

  return (
    <div className="editor-wrapper w-full border border-gray-300 rounded-md overflow-hidden">
      <div className="editor-toolbar bg-gray-50 border-b border-gray-300 p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-bold ${
            editor.isActive("bold") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm italic ${
            editor.isActive("italic") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded text-sm line-through ${
            editor.isActive("strike") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          S
        </button>
        <span className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded text-sm font-bold ${
            editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded text-sm font-bold ${
            editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded text-sm font-bold ${
            editor.isActive("heading", { level: 3 }) ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          H3
        </button>
        <span className="w-px h-6 bg-gray-300 mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("bulletList") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          Lista
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("blockquote") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          Citação
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 rounded text-sm ${
            editor.isActive("codeBlock") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          Código
        </button>
      </div>
      <EditorContent editor={editor} className="min-h-[200px]" />
    </div>
  );
});

Editor.displayName = "Editor";

export default Editor;
