import { FaArrowLeftLong } from "react-icons/fa6";
import { TbArrowAutofitLeftFilled } from "react-icons/tb";
import { IoIosSave } from "react-icons/io";
import { HiMiniCog8Tooth } from "react-icons/hi2";
import CustomEditor from "@/components/custom-editor";

function ProjectEditor() {
  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <button>
          <FaArrowLeftLong size={20} />
        </button>
        <h6 className="text-small">Draft: Untitled</h6>
        <div className="flex items-center gap-3">
          <button>
            <IoIosSave size={20} />
          </button>
          <button>
            <HiMiniCog8Tooth size={20} />
          </button>
          <button>
            <TbArrowAutofitLeftFilled size={20} />
          </button>
        </div>
      </div>
      <CustomEditor />
    </div>
  );
}

export default ProjectEditor;
