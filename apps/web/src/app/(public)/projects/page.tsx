"use client";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";
import { formatDateInProjects } from "@/utils/format-date";
import { api } from "@/lib/api";

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
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/projects/live");
        console.log("Data from API:", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="font-mono flex flex-col flex-1 p-30">
      <h6 className="text-xsmall text-accent mb-4">~ / projects / 9 entries</h6>

      <h2 className="text-6xl text-foreground font-semibold mb-4">
        $ ls -al <span className="text-accent">~/projects</span>
      </h2>
      <p className="text-small text-foreground">
        All things I&apos;ve worked on. Some are academic, others are personal.
      </p>
      <div className="flex justify-end pb-8 border-b border-border">
        <div className="bg-card w-80 mt-8 flex items-center gap-3 border border-border rounded-md px-3 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent">
          <CiSearch size={20} />
          <input
            type="text"
            placeholder="Search projects..."
            className="text-small text-foreground w-full focus:outline-none"
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
      ) : projects.length === 0 ? (
        <div className="h-100 flex items-center justify-center">
          <p className="px-4 py-8 text-secondary-foreground">
            No projects found.
          </p>
        </div>
      ) : (
        projects.map((project) => (
          <Link
            href={`/projects/${project.slug}`}
            key={project.id}
            className="group flex items-center gap-4 justify-between p-6 border-b border-border"
          >
            <div className="flex flex-col gap-1  max-w-200">
              <h5 className="text-2xl text-foreground font-medium group-hover:text-accent transition-colors">
                {project.title}
              </h5>
              <p className="text-small text-secondary-foreground">
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
