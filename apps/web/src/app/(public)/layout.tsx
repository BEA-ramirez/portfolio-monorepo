import InteractiveDotGrid from "@/components/interactive-dot-grid";
import ThemeToggle from "@/components/theme-toggle";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <InteractiveDotGrid>
      <header className="sticky text-small text-foreground h-18 border-b border-border flex items-center justify-center gap-30 top-0 z-200 bg-background/50 backdrop-blur-md">
        <Link href="/" className="text-accent font-bold cursor-pointer">
          BEA.ramirez-dev
        </Link>
        <div className="flex items-center justify-center gap-12 ">
          <Link href="/#home" className="hover:text-accent cursor-pointer">
            ~/home
          </Link>
          <Link href="/#projects" className="hover:text-accent cursor-pointer">
            ~/projects
          </Link>
          <Link href="/#contact" className="hover:text-accent cursor-pointer">
            ~/contact
          </Link>
          <Link href="/#blog" className="hover:text-accent cursor-pointer">
            ~/blog
          </Link>
          <Link href="/#pixel-art" className="hover:text-accent cursor-pointer">
            ~/pixel-art
          </Link>
        </div>
        <ThemeToggle />
      </header>
      <main>{children}</main>
      {/* Footer */}
      <footer className="mt-20 border-t border-border mx-30 mb-20 pt-6 flex items-center justify-between text-xsmall text-accent">
        <h5>© 2026 BEA-ramirez. All rights reserved.</h5>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/BEA-ramirez"
            className="group px-2 py-2 border border-border rounded-lg bg-background hover:border-accent"
          >
            <FaGithub
              size={18}
              className="text-card group-hover:text-accent "
            />
          </a>
          <a
            href="https://www.linkedin.com/in/bea-erin-angel-ramirez/"
            className="group px-2 py-2 border border-border rounded-lg bg-background hover:border-accent"
          >
            <FaLinkedinIn
              size={18}
              className="text-card group-hover:text-accent"
            />
          </a>
          <a
            href="mailto:beaerinangelramirez@gmail.com"
            className="group px-2 py-2 border border-border rounded-lg bg-background hover:border-accent"
          >
            <IoIosMail
              size={18}
              className="text-card group-hover:text-accent"
            />
          </a>
        </div>
      </footer>
    </InteractiveDotGrid>
  );
}
