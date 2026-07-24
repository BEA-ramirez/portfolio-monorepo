import ProjectCard from "@/components/project-card";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

export default function Home() {
  return (
    <div className="font-mono flex flex-col flex-1 bg-[#0a0a0a] ">
      <header className="text-small h-18 border-b border-white flex items-center justify-center gap-30 sticky top-0 z-100 bg-[#0a0a0a]">
        <h1>BEA.ramirez-dev</h1>
        <div className="flex items-center justify-center gap-12 ">
          <a href="#home">~/home</a>
          <a href="#projects">~/projects</a>
          <a href="#contact">~/contact</a>
          <a href="#blog">~/blog</a>
          <a href="#about">~/about</a>
        </div>
      </header>
      {/* Home */}
      <section id="home" className="p-30">
        <div className="text-sm mb-5 flex gap-4 items-center border border-white w-fit p-1 px-3 rounded-3xl">
          <div className="rounded-full bg-violet-600 w-2 h-2" />
          <p className="uppercase">available</p>
          <p>-</p>
          <p>for work</p>
        </div>

        <h2 className="mb-2 text-6xl font-bold">$ hi, I&apos;m</h2>
        <div className="mb-5 flex items-center gap-2">
          <h2 className="text-6xl font-bold">BEA Ramirez</h2>
          <div className="w-5 h-13 bg-white" />
        </div>

        <p className="mb-6 text-small">
          Full-Stack Developer | CS Fresh Graduate | Visayas State University
        </p>

        <p className="mb-8 w-140 text-small">
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
            <button className="px-3 py-2 text-sm flex items-center gap-3 bg-violet-500 rounded-lg">
              <p>→</p>
              <p>get in touch</p>
            </button>
            <button className="px-3 py-2 text-sm flex items-center gap-3 border border-white rounded-lg">
              <p>$</p>
              <p>ls projects/</p>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/BEA-ramirez"
              className="px-2 py-2 border border-white rounded-lg"
            >
              <FaGithub size={18} />
            </a>
            <a
              href="linkedin.com/in/bea-erin-angel-ramirez/"
              className="px-2 py-2 border border-white rounded-lg"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="mailto:beaerinangelramirez@gmail.com"
              className="px-2 py-2 border border-white rounded-lg"
            >
              <CiMail size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="p-30">
        <div className="flex items-start justify-between">
          <h6 className="uppercase text-small">
            <span>02</span> Featured Work
          </h6>
          <div className="flex flex-col items-end text-small">
            <p>~/projects/featured</p>
            <p>3 of 12 visible</p>
          </div>
        </div>
        <h2 className="mb-6 text-h1 -mt-4 border-b border-white pb-6">
          Selected projects
        </h2>
        <div className="mb-4 flex items-center justify-between pb-10 border-b border-dashed border-white">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3 text-small">
            <p>$ ls -al /projects</p>
            <p>{"// list all projects"}</p>
          </div>
          <button className="px-3 py-2 border border-white rounded-md flex items-center gap-3 text-body">
            <p>$</p>
            <p>view all</p>
          </button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="p-30">
        <div className="flex items-start justify-between">
          <h6 className="uppercase text-small">
            <span>03</span> Get in Touch
          </h6>
          <div className="flex flex-col items-end text-small">
            <p>~/contact</p>
            <p>{"replies in < 24"}</p>
          </div>
        </div>
        <h2 className="mb-6 text-h1 -mt-4 border-b border-white pb-6">
          Let&apos;s build something.
        </h2>
        <div className="flex justify-between gap-12">
          <div className="flex-1">
            <div className="border-b border-dashed pb-3  ">
              <a
                href="mailto:beaerinangelramirez@gmail.com"
                className="text-h3 tracking-wider"
              >
                beaerinangelramirez@gmail.com →
              </a>
            </div>
            <div className="mt-8 mb-12 flex flex-col gap-1">
              <p className="text-sm mb-1">
                <span className="text-white/50">location</span> Philippines,
                Ormoc City
              </p>
              <p className="text-sm">
                <span className="text-white/50">status</span> CS fresh grad
              </p>
              <p className="text-sm">
                <span className="text-white/50">stack</span> TS / React /
                Postgres
              </p>
              <p className="text-sm">
                <span className="text-white/50">github</span> @BEA-ramirez
              </p>
              <p className="text-sm">
                <span className="text-white/50">linkedin</span>{" "}
                in/bea-erin-angel-ramirez/
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-small">prefer a call?</p>
              <button className="flex items-center gap-4 border border-white rounded-md px-4 py-2 w-fit text-small">
                <p>$</p>
                <p>schedule a 30-min call</p>
              </button>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4 border border-white bg-[#111] rounded-xl p-5">
            <div className="flex flex-col gap-1">
              <label className="uppercase text-sm">
                name <span className="text-violet-600">*</span>
              </label>
              <input type="text" className="border px-4 py-3 rounded-md" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="uppercase text-sm">
                email <span className="text-violet-600">*</span>
              </label>
              <input type="email" className="border px-4 py-3 rounded-md" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="uppercase text-sm">
                message <span className="text-violet-600">*</span>
              </label>
              <textarea
                name="message"
                rows={3}
                placeholder="Type your message here..."
                className="border px-4 py-3 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <p className="text-small">protected • rate limited</p>
              <button className="px-3 py-2 flex items-center gap-3 bg-violet-500 rounded-md text-body">
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
