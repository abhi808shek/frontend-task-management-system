import { DeleteIcon, EditIcon } from "../../../assets/icons/Icons";
import Avatar from "../../../components/ui/Avatar";
import Badge from "../../../components/ui/Badge";
import { ROLE_STYLES, STATUS_DOT, STATUS_STYLES } from "../constant";
import type { User, UserActionHandlers } from "../types";
import { getDeptGradient } from "../utility";

type UserCardProps = UserActionHandlers & {
  user: User;
  onView: (user: User) => void;
};

type InfoTileProps = { label: string; value: string };

function InfoTile({ label, value }: InfoTileProps) {
  return (
    <div className="bg-slate-50 rounded-xl px-3 py-2">
      <p className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-xs font-semibold text-slate-700 truncate mt-0.5">{value}</p>
    </div>
  );
}

export default function UserCard({ user, onEdit, onDelete, onView }: UserCardProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden group cursor-pointer"
      onClick={() => onView(user)}
    >
      <div className={`h-1.5 w-full bg-gradient-to-r ${getDeptGradient(user.department)}`} />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar name={user.fullName} />
            <div className="min-w-0">
              <p className="font-bold text-slate-900 text-sm truncate group-hover:text-teal-700 transition-colors">
                {user.fullName}
              </p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>

          <div
            className="flex gap-1 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onEdit(user)}
              className="p-1.5 rounded-lg hover:bg-teal-50 text-slate-400 hover:text-teal-600 transition"
              title="Edit"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => onDelete(user)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition"
              title="Delete"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <InfoTile label="Title"      value={user.jobTitle} />
          <InfoTile label="Dept"       value={user.department} />
          <InfoTile label="Location"   value={user.location.split(",")[0]} />
          <InfoTile label="Experience" value={user.experience} />
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[user.status]}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[user.status]}`} />
            {user.status}
          </span>
          <Badge
            label={user.role}
            style={ROLE_STYLES[user.role]}
          />
        </div>
      </div>
    </div>
  );
}
