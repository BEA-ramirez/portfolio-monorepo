"use client";
import { Project } from "@/app/(public)/projects/page";
import { formatDateInProjects } from "@/utils/format-date";
import { useRouter } from "next/navigation";

export default function ProjectCard({
  project,
  order,
}: {
  project: Project;
  order: number;
}) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`projects/${project.slug}`)}
      className="shrink-0 group text-left w-83 md:w-90 h-80 hover:border-accent cursor-pointer border border-border rounded-xl p-5 bg-card text-foreground"
    >
      <div className="flex flex-col gap-4 md:border-b border-dashed h-full group-hover:border-accent">
        <p className="text-xsmall group-hover:text-accent text-card-foreground">
          [{order}]
        </p>
        <h5 className="text-2xl ">{project.title}</h5>
        <p className="text-xsmall group-hover:text-accent text-card-foreground">
          {formatDateInProjects(project.startDate, project.endDate)} •{" "}
          {project.company}
        </p>
        <p className="text-small font-medium text-secondary-foreground">
          {project.description}
        </p>
      </div>
    </button>
  );
}
