import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-zinc-50 font-sans dark:bg-black">
      <header className="h-20 border-b border-white flex items-center justify-center gap-20 sticky top-0 z-100">
        <h1>BEA.ramirez-dev</h1>
        <div className="flex items-center justify-center gap-8 ">
          <a href="#home">~/home</a>
          <a href="#projects">~/projects</a>
          <a href="#contact">~/contact</a>
          <a href="#blog">~/blog</a>
          <a href="#about">~/about</a>
        </div>
      </header>
      {/* Home */}
      <section id="home" className="p-30">
        <div className="mb-5 flex gap-4 items-center border border-white w-fit p-1 px-3 rounded-3xl">
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

        <p className="mb-6">
          Full-Stack Developer | CS Fresh Graduate | Visayas State University
        </p>

        <p className="w-140 ">
          I build full-stack web applications end-to-end: real-time management
          systems, robust backends, and the clean interfaces beneath them.
          Throughout my CS degree, I&apos;ve focused on shipping modern projects
          using Next.js, Tailwind, and Supabase. Lately, I&apos;ve been obsessed
          with integrating AI into real product surfaces to see what it can do.
          I&apos;m a fresh grad, a continuous learner, and a pixel artist in
          training. This portfolio is my latest deployment.
        </p>
      </section>
    </div>
  );
}
