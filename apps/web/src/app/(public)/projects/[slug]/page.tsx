"use client";
import { useState, useEffect, use } from "react";
import axios from "axios";

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
  content: string;
}

export default function ProjectDetailsPage({ params }: ProjectDetailsParams) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:4000/api/projects/${slug}/details`,
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

  return <div></div>;
}
