"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import { CodeProps } from "@/components/custom-editor";
import { extractToc } from "@/utils/extract-toc";
import { formatDateToText } from "@/utils/format-date";
import { api } from "@/lib/api";
import { RxHamburgerMenu } from "react-icons/rx";
import { useQuery } from "@tanstack/react-query";

interface ProjectDetailsParams {
  params: Promise<{
    slug: string;
  }>;
}

interface Project {
  id: string;
  title: string;
  description?: string | null;
  role?: string | null;
  startDate?: string | null | undefined;
  endDate?: string | null | undefined;
  liveUrl: string | null;
  githubUrl: string | null;
  slug: string;
  content: string | null;
}

export default function ProjectDetailsPage({ params }: ProjectDetailsParams) {
  const router = useRouter();
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects", "detail", slug],
    queryFn: async () => {
      const response = await api.get(`/api/projects/${slug}/details`);
      return response.data;
    },
  });

  const [showToc, setShowToc] = useState(false);
  const toc = extractToc(project?.content);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center h-screen justify-center">
        <p>Loading project...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col flex-1 items-center h-screen justify-center gap-4">
        <p className="text-red-500">
          Failed to load this project. The server might be unreachable.
        </p>
        <button
          onClick={() => router.push("/projects")}
          className="text-small text-accent hover:underline"
        >
          ← Go back to projects
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-1 items-center h-screen justify-center">
        <p>No project found.</p>
      </div>
    );
  }

  return (
    <div className="p-10 md:p-20 lg:p-30 pt-20 flex gap-20 flex-1 relative">
      {/* Project Content */}
      <section className="flex flex-col gap-8 max-w-200 items-start">
        <button
          onClick={() => router.push("/projects")}
          className="text-xsmall text-secondary-foreground hover:text-accent cursor-pointer transition-colors"
        >
          ← cd ../projects
        </button>
        <header className="flex flex-col border-b border-border gap-2 pb-12">
          <h3 className="text-3xl font-medium text-foreground">
            {project?.title}
          </h3>
          <p className="text-small text-foreground">{project?.description}</p>
          <div className="flex items-center gap-4 text-accent mt-4">
            <p className="text-xsmall uppercase border-r border-border pr-6">
              {project?.role}
            </p>
            <p className="text-xsmall uppercase">
              {formatDateToText(project?.startDate, project?.endDate)}
            </p>
          </div>
        </header>
        <article className="prose prose-sm max-w-none prose-headings:scroll-mt-24 prose-headings:mt-10 prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-accent prose-a:text-accent hover:prose-a:text-secondary-accent text-foreground">
          <ReactMarkdown
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeRaw, rehypeKatex, rehypeSlug]}
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
            {project?.content}
          </ReactMarkdown>
        </article>
      </section>

      {/* Table of Contents */}
      <section className="xl:hidden fixed right-4 md:right-20 z-50">
        <button
          onClick={() => setShowToc(!showToc)}
          className="flex justify-end w-full cursor-pointer hover:bg-accent-foreground/60"
        >
          <div className="border border-border rounded-md p-1 ">
            <RxHamburgerMenu />
          </div>
        </button>
        {showToc && (
          <div className="bg-card text-card-foreground rounded-md p-1">
            <h4 className="text-secondary-foreground text-small uppercase mb-3">
              On this page
            </h4>
            <nav className="flex flex-col gap-2 border-l border-border pl-4">
              {toc?.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-small mb-1 text-muted-foreground transition-colors hover:text-accent hover:font-medium ${
                    item.level === 3 ? "ml-4 text-xs" : ""
                  }`}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          </div>
        )}
      </section>
      <section className="hidden xl:block fixed right-10 md:right-34 z-50">
        <h4 className="text-secondary-foreground text-small uppercase mb-3">
          On this page
        </h4>
        <nav className="flex flex-col gap-2 border-l border-border pl-4">
          {toc?.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-small mb-1 text-muted-foreground transition-colors hover:text-accent hover:font-medium ${
                item.level === 3 ? "ml-4 text-xs" : ""
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>
      </section>
    </div>
  );
}
