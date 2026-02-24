import { TrashIcon } from "../../../assets/icons/Icons";
import Modal from "../../../components/ui/Modal";
import type { DeleteProjectModalProps } from "../../project/types";

export default function DeleteProjectModal({
  project,
  onClose,
  onConfirm,
}: DeleteProjectModalProps) {
  return (
    <Modal
      open={!!project}
      onClose={onClose}
      title="Delete Project"
      width="max-w-md"
    >
      <div className="px-6 py-6 text-center">
        <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrashIcon />
        </div>

        <h3 className="text-base font-semibold text-slate-900 mb-2">
          Delete "{project?.name}"?
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          This action cannot be undone. The project and all associated data will
          be permanently removed.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl shadow-md shadow-red-200 transition active:scale-95"
          >
            Delete Project
          </button>
        </div>
      </div>
    </Modal>
  );
}
