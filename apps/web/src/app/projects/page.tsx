import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";

export default function ProjectsPage() {
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
    </div>
  );
}
