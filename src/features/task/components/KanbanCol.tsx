import { STATUS_CFG } from "../constant";
import type { KanbanColProps } from "../types";
import TaskCard from "./TaskCard";

function EmptyColumn({ onAdd }: { onAdd: () => void }) {
  return (
    <div
      onClick={onAdd}
      className="flex flex-col items-center justify-center py-14 text-slate-300 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-orange-300 hover:text-orange-300 transition-all group"
    >
      <svg
        className="w-10 h-10 mb-2 group-hover:scale-110 transition-transform"
        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
      <p className="text-xs font-semibold">Click to add a task</p>
    </div>
  );
}

export default function KanbanCol({
  status, tasks, onView, onEdit, onDelete, onAddTask,
}: KanbanColProps) {
  const cfg       = STATUS_CFG[status];
  const isColored = status === "In Progress" || status === "Done";

  return (
    <div
      className={`flex flex-col rounded-2xl border ${cfg.colBorder} ${cfg.colBg} min-h-[500px] max-h-[calc(100vh-300px)]`}
    >
      {/* Column Header */}
      <div className={`${cfg.header} rounded-t-2xl px-4 py-3.5 flex items-center justify-between shrink-0`}>
        <div className="flex items-center gap-2.5">
          <span className={`text-sm ${isColored ? "text-white/80" : "text-slate-500"}`}>
            {cfg.icon}
          </span>
          <span className={`text-sm font-black tracking-tight ${isColored ? "text-white" : "text-slate-700"}`}>
            {status}
          </span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isColored ? "bg-white/20 text-white" : "bg-white text-slate-600 shadow-sm"}`}>
            {tasks.length}
          </span>
        </div>
        <button
          onClick={() => onAddTask(status)}
          className={`w-7 h-7 flex items-center justify-center rounded-xl transition font-bold text-lg leading-none ${
            isColored
              ? "hover:bg-white/20 text-white/80 hover:text-white"
              : "hover:bg-white text-slate-400 hover:text-orange-500"
          }`}
          title={`Add task to ${status}`}
        >
          +
        </button>
      </div>

      {/* Card list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {tasks.map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && <EmptyColumn onAdd={() => onAddTask(status)} />}
      </div>
    </div>
  );
}
