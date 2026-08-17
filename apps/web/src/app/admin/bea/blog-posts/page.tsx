"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import DeleteModal from "@/components/delete-modal";
import { api } from "@/lib/api";

interface BlogPost {
  id: string;
  title: string;
  isPublished: boolean;
  createdAt: string;
}

export default function AdminBlogPosts() {
  const router = useRouter();

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [blogPostToDelete, setBlogPostToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get(`/api/blog`);
        console.log("Data from API:", response.data);
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (blogId: string) => {
    setShowDeleteModal(true);
    setBlogPostToDelete(blogId);
  };

  const confirmDelete = async () => {
    if (!blogPostToDelete) return;
    setIsDeleting(true);
    try {
      await api.patch(`/api/blog/${blogPostToDelete}/del`);
      setBlogs((prev) => prev.filter((b) => b.id !== blogPostToDelete));
    } catch (error) {
      console.error("Error deleting blog post:", error);
    } finally {
      setTimeout(() => {
        setIsDeleting(false);
        setBlogPostToDelete(null);
        setShowDeleteModal(false);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between border-b pb-6">
        <h3 className="text-h1 font-semibold">ls -al ~/blog posts</h3>
      </div>

      {/* Table */}
      <div className="flex justify-end w-200">
        <button
          onClick={() => router.push("/admin/bea/blog-posts/new")}
          className="flex items-center gap-2 px-3 py-2 bg-violet-500 hover:bg-violet-400 transition-colors rounded-md cursor-pointer"
        >
          <FaPlus size={12} />
          <p className="text-xsmall">New Blog Post</p>
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
                  Loading blog posts...
                </td>
              </tr>
            ) : blogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  No blog posts found. Click &quot;New Blog Post&quot; to create
                  one!
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="transition-colors hover:bg-gray50 text-xsmall"
                >
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {blog.title}
                  </td>
                  <td className="px-4 py-2">
                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-1 font-medium ${
                        blog.isPublished === true
                          ? "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                          : "bg-yellow-50 text-yellow-800 ring=1 ring-yellow-600/2０"
                      }`}
                    >
                      {blog.isPublished === true ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-500">{blog.createdAt}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center justify-end gap-3">
                      {/* Edit Button */}
                      <Link
                        href={`/admin/bea/blog-posts/${blog.id}`}
                        className="text-gray-400 transition hover:text-gray-900"
                        title="Edit"
                      >
                        <MdEdit size={18} />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(blog.id)}
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
          "Are you sure you want to permanently delete this blog post? This action cannot be undone."
        }
      />
    </div>
  );
}
