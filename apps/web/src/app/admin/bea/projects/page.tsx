"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdEdit, MdDelete } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";

const mockProjects = [
  {
    id: 1,
    title: "Car Rental Fleet System",
    status: "Live",
    date: "Oct 12, 2025",
  },
  {
    id: 2,
    title: "Pixel Art Generator",
    status: "Draft",
    date: "Oct 05, 2025",
  },
  { id: 3, title: "E-Commerce Backend", status: "Live", date: "Sep 28, 2025" },
];

export default function AdminProjects() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b pb-6">
        <h3 className="text-h1 font-semibold">ls -al ~/projects</h3>
      </div>

      {/* Table */}
      <div className="flex justify-end w-200">
        <button
          onClick={() => router.push("/admin/bea/projects/editor")}
          className="flex items-center gap-2 px-3 py-2 bg-violet-500 hover:bg-violet-400 transition-colors rounded-md cursor-pointer"
        >
          <FaPlus size={12} />
          <p className="text-xsmall">New Project</p>
        </button>
      </div>
      <div className="w-200 rounded-lg border border-gray-300 shadow-sm ">
        <table className="w-full text-left text-sm text-gray-600 border-none">
          <thead className="border border-b border-gray-200  text-gray-900 border-none">
            <tr className="text-small">
              <th className="px-4 py-2 font-semibold">title</th>
              <th className="px-4 py-2 font-semibold">status</th>
              <th className="px-4 py-2 font-semibold">date</th>
              <th className="px-4 py-2 font-semibold text-right">actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {mockProjects.map((project) => (
              <tr
                key={project.id}
                className="transition-colors hover:bg-gray50 text-xsmall"
              >
                <td className="px-4 py-2 font-medium text-gray-900">
                  {project.title}
                </td>
                <td className="px-4 py-2">
                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 font-medium ${
                      project.status === "Live"
                        ? "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                        : "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20"
                    }`}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-500">{project.date}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-end gap-3 ">
                    {/* View Live Link */}
                    <Link
                      href="#"
                      className="text-gray-400 transition hover:text-blue-600"
                      title="View Live"
                    >
                      <FiExternalLink size={18} />
                    </Link>

                    {/* Edit Button */}
                    <Link
                      href={`/admin/projects/${project.id}`}
                      className="text-gray-400 transition hover:text-gray-900"
                      title="Edit"
                    >
                      <MdEdit size={18} />
                    </Link>

                    {/* Delete Button */}
                    <button
                      className="text-gray-400 transition hover:text-red-600"
                      title="Delete"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
