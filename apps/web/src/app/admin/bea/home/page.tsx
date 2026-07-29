import { FaFolder, FaPencilAlt, FaPlus } from "react-icons/fa";
import { FaBolt } from "react-icons/fa6";

export default function AdminHome() {
  return (
    <div className="font-mono flex flex-col flex-1 h-screen">
      <h1 className="mb-5 uppercase text-h3 font-semibold">Dashboard</h1>
      <h2 className="mb-10 text-body">Welcome back!</h2>
      <div className="mb-6 flex items-start px-5 gap-5">
        <div className="w-60 h-40 p-4 border border-black rounded-lg ">
          <div className="mb-4 flex items-center justify-start gap-2 ">
            <FaFolder />
            <h3 className="text-body uppercase font-bold">Projects</h3>
          </div>
          <p className="text-small">• Total: 12 projects</p>
          <p className="text-small">• Published: 10 projects</p>
          <p className="text-small">• Drafts: 2 projects</p>
        </div>
        <div className="w-60 h-40 p-4 border border-black rounded-lg ">
          <div className="mb-4 flex items-center justify-start gap-2 ">
            <FaPencilAlt />
            <h3 className="text-body uppercase font-bold">Blog Posts</h3>
          </div>
          <p className="text-small">• Total: 8 projects</p>
          <p className="text-small">• Published: 5 projects</p>
          <p className="text-small">• Drafts: 3 projects</p>
        </div>
        <div className="mb-4 ml-4 flex-1 border-b border-dotted h-full ">
          <div className="mb-4 flex items-center justify-start gap-2 border-b">
            <FaBolt />
            <h3 className="text-body uppercase font-bold">Quick Actions</h3>
          </div>
          <div className="flex items-center justify-around">
            <button className="mb-3 flex items-center gap-2 px-3 py-2 bg-violet-500 rounded-lg ">
              <FaPlus size={12} />
              <p className="text-small">New Project</p>
            </button>
            <button className="flex items-center gap-2 px-3 py-2 bg-violet-500 rounded-lg ">
              <FaPlus size={12} />
              <p className="text-small">New Blog Post</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
