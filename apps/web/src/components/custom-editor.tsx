"use client";

import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; //highlighter and theme
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { ComponentPropsWithoutRef } from "react";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

interface CodeProps extends ComponentPropsWithoutRef<"code"> {
  inline?: boolean;
  node?: unknown; // use 'unknown' instead of 'any' to make ESLint happy
}

export default function CustomEditor() {
  const { register, watch } = useForm({
    defaultValues: { content: "" },
  });

  const liveMarkdown = watch("content"); // watch content updates so the preview updates on every stroke

  console.log("Live mark down: ", liveMarkdown);

  return (
    <div className="grid h-140 grid-cols-2 gap-4 font-mono">
      <div className="flex flex-col">
        <h3 className="mb-2 font-bold">Write (Raw Markdown)</h3>
        <textarea
          {...register("content")}
          className="flex-1 resize-none rounded-md border p-4 font-mono text-sm"
          placeholder="```typescript\nconst hello = 'world';\n```"
        />
      </div>

      <div className="flex flex-col overflow-y-auto border-l pl-4">
        <h3 className="mb-2 font-bold">Preview</h3>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex]}
            components={{
              code({ node, inline, className, children, ...props }: CodeProps) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    // @ts-expect-error: react-syntax-highlighter types are incompatible with modern React CSSProperties
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {liveMarkdown}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
