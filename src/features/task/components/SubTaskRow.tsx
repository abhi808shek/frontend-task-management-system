import { formatDate } from "../utils";
import type { SubTask } from "../types";
import Avatar from "../../../components/ui/Avatar";
import { PriorityBadge } from "./Badges";

type SubTaskRowProps = {
  sub: SubTask;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
};

function CheckIcon() {
  return (
    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
    </svg>
  );
}

export default function SubTaskRow({ sub, onToggle, onDelete }: SubTaskRowProps) {
  const isDone = sub.status === "Done";

  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-all group border border-transparent hover:border-slate-200">
      {/* Toggle circle */}
      <button
        onClick={() => onToggle(sub.id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
          isDone
            ? "bg-emerald-500 border-emerald-500"
            : "border-slate-300 hover:border-orange-400"
        }`}
      >
        {isDone && <CheckIcon />}
      </button>

      {/* Title + description */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-medium leading-tight truncate ${isDone ? "line-through text-slate-400" : "text-slate-700"}`}>
          {sub.title}
        </p>
        {sub.description && (
          <p className="text-xs text-slate-400 truncate mt-0.5">{sub.description}</p>
        )}
      </div>

      {/* Meta */}
      <div className="flex items-center gap-2 shrink-0">
        <Avatar name={sub.assignedTo} />
        <PriorityBadge priority={sub.priority} />
        <span className="text-[10px] text-slate-400 font-medium">{formatDate(sub.dueDate)}</span>
        <button
          onClick={() => onDelete(sub.id)}
          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}
