"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuHouse, LuFolderOpen } from "react-icons/lu";
import { CgWebsite } from "react-icons/cg";
import { TbLogout } from "react-icons/tb";

const menuItems = [
  { name: "Overview", href: "/admin/home", icon: LuHouse },
  { name: "Projects", href: "/admin/projects", icon: LuFolderOpen },
  { name: "Blog Posts", href: "/admin/blog-posts", icon: CgWebsite },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <div className="flex h-screen w-full bg-white text-gray-900 font-mono">
      <aside className="flex w-55 flex-col border-r border-gray-200 bg-gray-50/50 px-4 py-6">
        <div className="mb-8 px-2">
          <h2 className="text-body uppercase font-semibold ">⌘ Admin Panel</h2>
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
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section (Logout) */}
        <div className="border-t border-gray-200 pt-4">
          <Link
            href="/login"
            className="flex items-center gap-3 rounded-md px-3 py-2 text-small font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <TbLogout size={18} />
            Logout
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-white p-8">{children}</main>
    </div>
  );
}
