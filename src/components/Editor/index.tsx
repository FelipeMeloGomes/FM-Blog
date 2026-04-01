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
    <div className="editor-wrapper w-full border border-input rounded-md overflow-hidden bg-background [&_.ProseMirror]:text-foreground [&_.ProseMirror]:bg-background">
      <div className="editor-toolbar bg-muted border-b border-input p-2 flex flex-wrap gap-1">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-3 py-1 rounded text-sm font-bold transition-colors ${
            editor.isActive("bold")
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          B
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-3 py-1 rounded text-sm italic transition-colors ${
            editor.isActive("italic")
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          I
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-3 py-1 rounded text-sm line-through transition-colors ${
            editor.isActive("strike")
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          S
        </button>
        <span className="w-px h-6 bg-border mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`px-3 py-1 rounded text-sm font-bold transition-colors ${
            editor.isActive("heading", { level: 1 })
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`px-3 py-1 rounded text-sm font-bold transition-colors ${
            editor.isActive("heading", { level: 2 })
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`px-3 py-1 rounded text-sm font-bold transition-colors ${
            editor.isActive("heading", { level: 3 })
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          H3
        </button>
        <span className="w-px h-6 bg-border mx-1 self-center" />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            editor.isActive("bulletList")
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          Lista
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            editor.isActive("blockquote")
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          Citação
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`px-3 py-1 rounded text-sm transition-colors ${
            editor.isActive("codeBlock")
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent"
          }`}
        >
          Código
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="min-h-[200px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[200px] [&_.ProseMirror_p]:text-foreground [&_.ProseMirror_h1]:text-foreground [&_.ProseMirror_h2]:text-foreground [&_.ProseMirror_h3]:text-foreground [&_.ProseMirror_h4]:text-foreground [&_.ProseMirror_h5]:text-foreground [&_.ProseMirror_h6]:text-foreground [&_.ProseMirror_ul]:text-foreground [&_.ProseMirror_ol]:text-foreground [&_.ProseMirror_li]:text-foreground"
      />
      <style>{`
        .ProseMirror blockquote {
          border-left: 3px solid hsl(var(--primary));
          padding-left: 1rem;
          margin-left: 0;
          color: hsl(var(--foreground));
          background-color: hsl(var(--muted));
          padding: 0.75rem 1rem;
          border-radius: 0 0.375rem 0.375rem 0;
        }
        .ProseMirror pre {
          background-color: hsl(var(--muted));
          color: hsl(var(--foreground));
          padding: 1rem;
          border-radius: 0.375rem;
          overflow-x: auto;
          font-family: ui-monospace, monospace;
        }
        .ProseMirror pre code {
          background-color: transparent;
          color: inherit;
          padding: 0;
        }
        .ProseMirror code {
          background-color: hsl(var(--muted));
          color: hsl(var(--foreground));
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }
        .dark .ProseMirror blockquote {
          border-left-color: hsl(var(--primary));
          background-color: hsl(var(--muted) / 0.5);
        }
        .dark .ProseMirror pre {
          background-color: hsl(0 0% 15%);
        }
        .dark .ProseMirror code {
          background-color: hsl(0 0% 20%);
        }
      `}</style>
    </div>
  );
});

Editor.displayName = "Editor";

export default Editor;
