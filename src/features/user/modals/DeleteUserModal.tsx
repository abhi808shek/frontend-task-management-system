import { TrashIcon } from "../../../assets/icons/Icons";
import Avatar from "../../../components/ui/Avatar";
import Modal from "../../../components/ui/Modal";
import type { User } from "../types";

type DeleteUserModalProps = {
  user: User | null;
  onClose: () => void;
  onConfirm: () => void;
};


export default function DeleteUserModal({ user, onClose, onConfirm }: DeleteUserModalProps) {
  return (
    <Modal open={!!user} onClose={onClose} title="Delete User" width="max-w-md">
      <div className="px-7 py-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrashIcon />
        </div>

        {/* User identity */}
        {user && (
          <div className="flex items-center justify-center gap-3 mb-4">
            <Avatar name={user.fullName} size="sm" />
            <p className="font-bold text-slate-800">{user.fullName}</p>
          </div>
        )}

        <p className="text-sm text-slate-500 mb-6 leading-relaxed max-w-xs mx-auto">
          This will permanently remove the user account and all associated data.
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl shadow-md shadow-red-200 transition active:scale-95"
          >
            Delete User
          </button>
        </div>
      </div>
    </Modal>
  );
}
