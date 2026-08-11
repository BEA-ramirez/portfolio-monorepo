"use client";
import { useState, useEffect, use } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import { CodeProps } from "@/components/custom-editor";
import axios from "axios";
import { extractToc } from "@/utils/extract-toc";
import { formatDateToText } from "@/utils/format-date";

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
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toc = extractToc(project?.content);

  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/projects/${slug}/details`,
        );
        console.log("Data from API:", response.data);
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjectData();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>No project found.</p>
      </div>
    );
  }

  return (
    <div className="p-30 pt-20 flex gap-20 flex-1">
      {/* Project Content */}
      <section className="flex flex-col gap-8 max-w-200 items-start">
        <button className="text-xsmall text-secondary-foreground hover:text-accent cursor-pointer transition-colors">
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
        <article className="prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-accent prose-a:text-accent hover:prose-a:text-secondary-accent text-foreground">
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
      <section>
        <h4 className="text-secondary-foreground text-small uppercase">
          On this page
        </h4>
        <nav className="flex flex-col gap-2 border-l border-border pl-4">
          {toc?.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`text-small text-muted-foreground transition-colors hover:text-accent hover:underline ${
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
