import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import React from "react";

interface Props {
  setContent: (content: string) => void;
  className?: string;
}

function Tiptap({ className, setContent }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write a description...",
        emptyNodeClass:
          "first:before:h-0 first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none ",
      }),
    ],
    editorProps: {
      attributes: {
        class: "prose prose-sm text-sm focus:outline-none px-3" + className,
      },
    },
    content: ``,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  );
}
export { Tiptap };
