import { useState } from "react";
import { TrashIcon } from "../../../assets/icons/Icons";
import type { DeleteTaskModalProps } from "../types";
import { TypeBadge } from "./Badges";
import Modal from "./Modal";

const DeleteTaskModal = ({ task, onClose, onConfirm }: DeleteTaskModalProps) => {
  // NEW: Loading State
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsDeleting(true);
      // Wait for TaskPage to finish the DELETE API call
      await onConfirm();
    } finally {
      setIsDeleting(false);
      // Modal closes naturally via the parent state
    }
  };

  return (
    <Modal open={!!task} onClose={isDeleting ? () => {} : onClose} title="Delete Task" width="max-w-sm">
      <div className="px-7 py-8 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
          <TrashIcon />
        </div>

        {task && (
          <>
            <div className="flex justify-center mb-2">
              <TypeBadge type={task.type} />
            </div>

            <p className="font-bold text-slate-800 mb-1 text-base">
              "{task.title}"
            </p>

            {(task.subTasks?.length || 0) > 0 && (
              <p className="text-xs text-orange-600 font-semibold mb-2">
                ⚠ Also deletes {task.subTasks.length} sub-task(s)
              </p>
            )}
          </>
        )}

        <p className="text-sm text-slate-500 mb-7 leading-relaxed">
          This action is permanent and cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition border border-slate-200 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-black rounded-xl shadow-md shadow-red-200 transition active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTaskModal;