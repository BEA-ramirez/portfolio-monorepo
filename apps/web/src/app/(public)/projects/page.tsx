"use client";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { formatDateInProjects } from "@/utils/format-date";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export interface Project {
  id: string;
  title: string;
  description?: string | null;
  role?: string | null;
  startDate?: string | null | undefined;
  endDate?: string | null | undefined;
  liveUrl: string | null;
  githubUrl: string | null;
  slug: string;
  content: string;
  company?: string;
  isFeatured: boolean;
}

export default function ProjectsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects", "live"],
    queryFn: async () => {
      const response = await api.get("/api/projects/live");
      return response.data;
    },
  });

  const filteredProjects = projects.filter((project: Project) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = project.title.toLowerCase().includes(query);
    const descMatch =
      project.description?.toLowerCase().includes(query) || false;

    return titleMatch || descMatch;
  });

  if (isError) {
    return (
      <div className="flex flex-col flex-1 items-center h-screen justify-center gap-4">
        <p className="text-red-500">
          Failed to load this project. The server might be unreachable.
        </p>
        <button
          onClick={() => router.push("/")}
          className="text-small text-accent hover:underline"
        >
          ← Go back to main page
        </button>
      </div>
    );
  }

  return (
    <div className="font-mono flex flex-col flex-1 p-10 md:p-30">
      <h6 className="text-xsmall text-accent mb-4">
        ~ / projects / {filteredProjects.length} of {projects.length} entries
      </h6>

      <h2 className="text-5xl md:text-6xl text-foreground font-semibold mb-4">
        $ ls -al <span className="text-accent">~/projects</span>
      </h2>
      <p className="text-small text-foreground">
        All things I&apos;ve worked on. Some are academic, others are personal.
      </p>
      <div className="flex justify-center md:justify-end pb-8 border-b border-border">
        <div className="bg-card w-80 mt-8 flex items-center gap-3 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent">
          <CiSearch size={20} />
          <input
            type="search"
            placeholder="Search projects..."
            className="text-small text-foreground w-full focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {/* Projects List */}
      {isLoading ? (
        <div className="h-100 flex items-center justify-center">
          <p className="px-4 py-8 text-secondary-foreground">
            Loading projects...
          </p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="h-100 flex items-center justify-center">
          <p className="px-4 py-8 text-secondary-foreground">
            No projects found.
          </p>
        </div>
      ) : (
        filteredProjects.map((project: Project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.id}
            className="group flex items-center gap-4 justify-between p-6 md:px-6 px-0 border-b border-border"
          >
            <div className="flex flex-col gap-1  max-w-200">
              <h5 className="text-md md:text-2xl text-foreground font-medium group-hover:text-accent transition-colors">
                {project.title}
              </h5>
              <p className="text-xsmall md:text-small text-secondary-foreground line-clamp-3">
                {project.description}
              </p>
            </div>
            <div className="flex flex-col items-end text-xsmall gap-2 text-accent font-semibold">
              <p className="uppercase">{project.role}</p>
              <p>{formatDateInProjects(project.startDate, project.endDate)}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
