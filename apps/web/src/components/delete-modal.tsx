import { IoMdClose } from "react-icons/io";
import { MdOutlineDataSaverOff } from "react-icons/md";

interface DeleteModalProps {
  message?: string;
  isDeleting: boolean;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}
export default function DeleteModal({
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  isDeleting,
  isOpen,
  onClose,
  onDelete,
}: DeleteModalProps) {
  if (!isOpen) return null; // early return, if its not open, dont render anything

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 transition-colors hover:text-gray-900 cursor-pointer"
        >
          <IoMdClose size={20} />
        </button>
        {/* Content */}
        <h3 className="text-body font-semibold text-gray-900 mb-2">
          Confirm Deletion
        </h3>
        <p className="text-small text-gray-500 mb-6">{message}</p>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-md px-4 py-2 text-small font-medium text-gray-700 transition-colors hover:bg-gray-100 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="rounded-md px-4 py-2 text-small font-medium text-white transition-colors bg-red-400 hover:bg-red-700 cursor-pointer"
          >
            {isDeleting ? (
              <div className="flex items-center justify-center gap-2">
                <MdOutlineDataSaverOff className="animate-spin" />
                <span className="ml-2">Deleting...</span>
              </div>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
