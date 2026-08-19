"use client";
import { useState, useEffect } from "react";
import ProjectCard from "@/components/project-card";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Project } from "./projects/page";

export default function Home() {
  const router = useRouter();
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await api.get("/api/projects/live");
        console.log("Data from API:", response.data);
        const projects = response.data;
        const fProjects = projects.filter(
          (proj: Project) => proj.isFeatured === true,
        );
        setFeaturedProjects(fProjects);
        setTotalProjects(projects.length);
      } catch (error) {
        console.error("Error fetching projects", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="font-mono flex flex-col flex-1  ">
      {/* Home */}
      <section id="home" className="p-30">
        <div className="bg-card text-sm text-muted-foreground mb-5 flex gap-4 items-center border border-border w-fit p-1 px-3 rounded-3xl">
          <div className="rounded-full bg-accent w-2 h-2" />
          <p className="uppercase">available</p>
          <p>-</p>
          <p>for work</p>
        </div>

        <h2 className="mb-2 text-6xl font-bold text-foreground">
          $ hi, I&apos;m
        </h2>
        <div className="mb-5 flex items-center gap-2 ">
          <h2 className="text-6xl font-bold text-foreground">BEA Ramirez</h2>
          <div className="w-5 h-13 bg-foreground" />
        </div>

        <p className="mb-6 text-small text-accent font-semibold">
          Full-Stack Developer | CS Fresh Graduate | Visayas State University
        </p>

        <p className="mb-8 w-140 text-small text-foreground">
          I build full-stack web applications end-to-end: real-time management
          systems, robust backends, and the clean interfaces beneath them.
          Throughout my CS degree, I&apos;ve focused on shipping modern projects
          using Next.js, Tailwind, and Supabase. Lately, I&apos;ve been obsessed
          with integrating AI into real product surfaces to see what it can do.
          I&apos;m a fresh grad, a continuous learner, and a pixel artist in
          training. This portfolio is my latest deployment.
        </p>
        <div className="flex items-center justify-between w-130">
          <div className="flex items-center gap-3">
            <button className="px-3 py-2 text-sm flex items-center gap-3 bg-accent hover:bg-secondary-accent text-foreground rounded-lg cursor-pointer">
              <p>→</p>
              <p>get in touch</p>
            </button>
            <button
              onClick={() => router.push("/projects")}
              className="px-3 py-2 text-sm text-foreground bg-card hover:text-accent hover:border-accent flex items-center gap-3 border border-border rounded-lg cursor-pointer"
            >
              <p>$</p>
              <p>ls projects/</p>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/BEA-ramirez"
              className="group hover:border-accent px-2 py-2 border border-border rounded-lg bg-background"
            >
              <FaGithub
                size={18}
                className="text-foreground group-hover:text-accent"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/bea-erin-angel-ramirez/"
              className="group hover:border-accent px-2 py-2 border border-border rounded-lg bg-background"
            >
              <FaLinkedinIn
                size={18}
                className="text-foreground group-hover:text-accent"
              />
            </a>
            <a
              href="mailto:beaerinangelramirez@gmail.com"
              className="group hover:border-accent px-2 py-2 border border-border rounded-lg bg-background"
            >
              <IoIosMail
                size={18}
                className="text-foreground group-hover:text-accent"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="p-30 text-foreground">
        <div className="flex items-start justify-between">
          <h6 className="uppercase text-small text-accent font-bold">
            <span>02</span> Featured Work
          </h6>
          <div className="flex flex-col items-end text-small text-accent font-semibold">
            <p>~/projects/featured</p>
            <p>
              {featuredProjects.length} of {totalProjects} visible
            </p>
          </div>
        </div>
        <h2 className="mb-6 text-h1 -mt-4 border-b border-border pb-6">
          Selected projects
        </h2>
        <div className="w-full mb-4 flex items-center gap-3 pb-10 border-b border-dashed border-border overflow-x-auto scrollbar-thin scrollbar-thumb-accent">
          {isLoading ? (
            <div>
              <p className="px-4 py-8 text-center text-gray-500">
                Loading projects...
              </p>
            </div>
          ) : featuredProjects.length === 0 ? (
            <div>
              <p>No featured projects found.</p>
            </div>
          ) : (
            featuredProjects.map((project, ind) => (
              <ProjectCard project={project} order={ind + 1} key={project.id} />
            ))
          )}
        </div>
        <div className="flex items-start justify-between ">
          <div className="flex items-center gap-3 text-small text-accent font-semibold">
            <p>$ ls -al /projects</p>
            <p>{"// list all projects"}</p>
          </div>
          <button
            onClick={() => router.push("/projects")}
            className="px-3 py-2 bg-background hover:text-accent hover:border-accent cursor-pointer border border-border rounded-md flex items-center gap-3 text-body"
          >
            <p>$</p>
            <p>view all</p>
          </button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="p-30 pb-10 text-foreground ">
        <div className="flex items-start justify-between">
          <h6 className="uppercase text-small text-accent font-bold">
            <span>03</span> Get in Touch
          </h6>
          <div className="flex flex-col items-end text-small text-accent font-semibold">
            <p>~/contact</p>
            <p>{"replies in < 24"}</p>
          </div>
        </div>
        <h2 className="mb-6 text-h1 -mt-4 border-b border-border pb-6">
          Let&apos;s build something.
        </h2>
        <div className="flex justify-between gap-12">
          <div className="flex-1">
            <div className="border-b border-dashed pb-3  ">
              <a
                href="mailto:beaerinangelramirez@gmail.com"
                className="text-h3 tracking-wider hover:font-semibold hover:text-accent transition-all duration-300"
              >
                beaerinangelramirez@gmail.com →
              </a>
            </div>
            <div className="mt-8 mb-12 flex flex-col gap-1">
              <p className="text-sm mb-1">
                <span className="text-accent font-medium">location</span>{" "}
                Philippines, Ormoc City
              </p>
              <p className="text-sm">
                <span className="text-accent font-medium">status</span> CS fresh
                grad
              </p>
              <p className="text-sm">
                <span className="text-accent font-medium">stack</span> TS /
                React / Postgres
              </p>
              <p className="text-sm">
                <span className="text-accent font-medium">github</span>{" "}
                @BEA-ramirez
              </p>
              <p className="text-sm">
                <span className="text-accent font-medium">linkedin</span>{" "}
                in/bea-erin-angel-ramirez/
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-small">prefer a call?</p>
              <button className="group bg-card hover:font-semibold flex items-center gap-4 border border-border rounded-md px-4 py-2 w-fit text-small cursor-pointer hover:border-accent">
                <p>$</p>
                <p className="group-hover:text-accent">
                  schedule a 30-min call
                </p>
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-6 border border-border bg-card rounded-xl p-5 text-foreground">
            <div className="flex flex-col gap-1">
              <label className="uppercase text-small">
                name <span className="text-accent">*</span>
              </label>
              <input
                type="text"
                className="border px-4 py-3 rounded-md text-small"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="uppercase text-small">
                email <span className="text-accent">*</span>
              </label>
              <input
                type="email"
                className="border px-4 py-3 rounded-md text-small"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="uppercase text-small">
                message <span className="text-accent">*</span>
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder="Type your message here..."
                className="border px-4 py-3 rounded-md text-small"
              />
            </div>
            <div className="flex justify-between">
              <p className="text-small text-accent font-semibold -mt-4">
                protected • rate limited
              </p>
              <button className="px-3 py-2 flex items-center gap-3 bg-accent hover:bg-secondary-accent rounded-md text-small cursor-pointer">
                <p>→</p>
                <p>send message</p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
