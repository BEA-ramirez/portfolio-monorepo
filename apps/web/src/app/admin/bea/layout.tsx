"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuHouse, LuFolderOpen } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";
import ThemeToggle from "@/components/theme-toggle";

const menuItems = [
  { name: "Overview", href: "/admin/bea/home", icon: LuHouse },
  { name: "Projects", href: "/admin/bea/projects", icon: LuFolderOpen },
  { name: "Blog Posts", href: "/admin/bea/blog-posts", icon: CgWebsite },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <div className="flex h-screen w-full text-foreground font-mono">
      <aside className="flex w-16 flex-col bg-card px-3 py-6">
        <div className="mb-8 px-3">
          <h2 className="text-lg uppercase font-semibold">⌘</h2>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathName === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-small font-medium transition-colors ${
                  isActive
                    ? "bg-black text-white" // Active state
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900" // Inactive state
                }`}
              >
                <Icon size={18} />
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section (Logout) */}
        <div className="flex flex-col gap-3">
          <ThemeToggle />
          <div className="border-t border-gray-200 pt-4">
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-small font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <TbLogout size={18} />
            </Link>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-background text-foreground p-8">
        {children}
      </main>
    </div>
  );
}
