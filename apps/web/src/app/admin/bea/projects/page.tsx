"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { MdEdit, MdDelete } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import DeleteModal from "@/components/delete-modal";

interface Project {
  id: string;
  title: string;
  isPublished: boolean;
  createdAt: string;
  liveUrl: string | null;
}

export default function AdminProjects() {
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "https://bea-ramirez-portfolio-api.vercel.app/api/projects",
        );
        console.log("Data from API:", response.data);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleDelete = async (projectId: string) => {
    setShowDeleteModal(true);
    setProjectToDelete(projectId);
  };

  const confirmDelete = async () => {
    if (!projectToDelete) return;
    setIsDeleting(true);
    try {
      await axios.patch(
        `https://bea-ramirez-portfolio-api.vercel.app/api/projects/${projectToDelete}/del`,
      );
      setProjects((prev) => prev.filter((p) => p.id !== projectToDelete));
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setTimeout(() => {
        setIsDeleting(false);
        setProjectToDelete(null);
        setShowDeleteModal(false);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b pb-6">
        <h3 className="text-h1 font-semibold">ls -al ~/projects</h3>
      </div>

      {/* Table */}
      <div className="flex justify-end w-200">
        <button
          onClick={() => router.push("/admin/bea/projects/new")}
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
            {isLoading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  Loading projects...
                </td>
              </tr>
            ) : projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No projects found. Click &quot;New Project&quot; to create
                  one!
                </td>
              </tr>
            ) : (
              projects.map((project) => (
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
                        project.isPublished === true
                          ? "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                          : "bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20"
                      }`}
                    >
                      {project.isPublished === true ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-500">
                    {project.createdAt}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-end gap-3 ">
                      {/* View Live Link */}
                      <a
                        href={project.liveUrl || "#"}
                        target={project.liveUrl ? "_blank" : "_self"}
                        rel="noreferrer"
                        className={`transition ${
                          project.liveUrl
                            ? "text-gray-400 hover:text-blue-600 cursor-pointer"
                            : "text-gray-200 cursor-not-allowed"
                        }`}
                        title="View Live"
                      >
                        <FiExternalLink size={18} />
                      </a>

                      {/* Edit Button */}
                      <Link
                        href={`/admin/bea/projects/${project.id}`}
                        className="text-gray-400 transition hover:text-gray-900"
                        title="Edit"
                      >
                        <MdEdit size={18} />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-gray-400 transition hover:text-red-600 cursor-pointer"
                        title="Delete"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        isDeleting={isDeleting}
        onClose={() => setShowDeleteModal(false)}
        onDelete={confirmDelete}
        message={
          "Are you sure you want to permanently delete this project? This action cannot be undone."
        }
      />
    </div>
  );
}
