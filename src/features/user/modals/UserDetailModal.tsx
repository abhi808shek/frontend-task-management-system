import { ROLE_STYLES, STATUS_STYLES, STATUS_DOT } from "../constant";
import {  maskPassword } from "../utility";
import type { DetailTileProps, UserDetailModalProps } from "../types";
import { getAvatarBg, getInitials } from "../../../utility";
import Badge from "../../../components/ui/Badge";
import Modal from "../../../components/ui/Modal";



function DetailTile({ label, value }: DetailTileProps) {
  return (
    <div className="bg-slate-50 rounded-xl p-3">
      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

export default function UserDetailModal({
  user, onClose, onEdit, onDelete,
}: UserDetailModalProps) {
  if (!user) return null;

  return (
    <Modal
      open={!!user}
      onClose={onClose}
      title="User Profile"
      subtitle={`Member since ${user.createdAt}`}
      width="max-w-lg"
    >
      <div className="px-7 py-6">
        {/* Avatar + name block */}
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
          <div
            className={`w-16 h-16 ${getAvatarBg(user.fullName)} rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg shrink-0`}
          >
            {getInitials(user.fullName)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{user.fullName}</h3>
            <p className="text-sm text-slate-500">
              {user.jobTitle} · {user.department}
            </p>
            <div className="flex gap-2 mt-2">
              <span
                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[user.status]}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[user.status]}`} />
                {user.status}
              </span>
              <Badge label={user.role} style={ROLE_STYLES[user.role]} />
            </div>
          </div>
        </div>

        {/* Detail tiles */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <DetailTile label="Email"      value={user.email} />
          <DetailTile label="Password"   value={maskPassword(user.password)} />
          <DetailTile label="Location"   value={user.location} />
          <DetailTile label="Experience" value={user.experience} />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => { onClose(); onEdit(user); }}
            className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold rounded-xl transition shadow-md shadow-teal-200 active:scale-95"
          >
            Edit User
          </button>
          <button
            onClick={() => { onClose(); onDelete(user); }}
            className="px-4 py-2.5 border border-red-200 text-red-500 hover:bg-red-50 text-sm font-semibold rounded-xl transition"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}
