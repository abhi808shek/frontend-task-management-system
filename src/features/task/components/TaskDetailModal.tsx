import { formatDate } from "../utils";
import type { MetaTileProps, TaskDetailModalProps } from "../types";
import Modal from "./Modal";
import Avatar from "../../../components/ui/Avatar";
import { PriorityBadge, StatusBadge, TypeBadge } from "./Badges";
import SubProgress from "./SubProgress";


export const MetaTile = ({ label, children }: MetaTileProps) => {
  return (
    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1.5">
        {label}
      </p>
      {children}
    </div>
  );
};


const TaskDetailModal = ({
  task,
  onClose,
  onEdit,
  onDelete,
}: TaskDetailModalProps) => {
  if (!task) return null;

  const subDone = task.subTasks?.filter((s) => s.status === "Done").length || 0;
  const subTotal = task.subTasks?.length || 0;

  return (
    <Modal
      open={!!task}
      onClose={onClose}
      title={task.title}
      subtitle={`${task.project}  ·  Created by ${task.reporter}`}
      width="max-w-2xl"
    >
      <div className="px-7 py-6 space-y-5">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={task.status} />
          <PriorityBadge priority={task.priority} />
          <TypeBadge type={task.type} />
        </div>

        {task.description && (
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
            <p className="text-sm text-slate-600 leading-relaxed">
              {task.description}
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <MetaTile label="Assigned To">
            <div className="flex items-center gap-2">
              <Avatar name={task.assignedTo} />
              <span className="text-sm font-bold text-slate-800">
                {task.assignedTo}
              </span>
            </div>
          </MetaTile>

          <MetaTile label="Reporter">
            <div className="flex items-center gap-2">
              <Avatar name={task.reporter} />
              <span className="text-sm font-bold text-slate-800">
                {task.reporter}
              </span>
            </div>
          </MetaTile>

          <MetaTile label="Start Date">
            <span className="text-sm font-bold text-slate-800">
              {formatDate(task.startDate)}
            </span>
          </MetaTile>

          <MetaTile label="Due Date">
            <span className="text-sm font-bold text-slate-800">
              {formatDate(task.dueDate)}
            </span>
          </MetaTile>
        </div>

        {subTotal > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-black text-slate-700">
                Sub-tasks
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {subDone}/{subTotal} done
              </span>
            </div>

            <SubProgress subTasks={task.subTasks} />

            <div className="mt-3 space-y-2">
              {task.subTasks.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${s.status === "Done"
                        ? "bg-emerald-500 border-emerald-500"
                        : "border-slate-300"
                      }`}
                  >
                    {s.status === "Done" && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>

                  <span
                    className={`text-sm flex-1 font-medium ${s.status === "Done"
                        ? "line-through text-slate-400"
                        : "text-slate-700"
                      }`}
                  >
                    {s.title}
                  </span>

                  <Avatar name={s.assignedTo} />
                  <PriorityBadge priority={s.priority} />
                  <span className="text-xs text-slate-400 font-medium">
                    {formatDate(s.dueDate)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {(task.comments?.length || 0) > 0 && (
          <div>
            <p className="text-sm font-black text-slate-700 mb-3">
              Comments{" "}
              <span className="text-orange-500">
                {task.comments.length}
              </span>
            </p>

            <div className="space-y-3">
              {task.comments.map((c) => (
                <div key={c.id} className="flex gap-3">
                  <Avatar name={c.author} />
                  <div className="flex-1 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-700">
                        {c.author}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {c.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {c.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-3 border-t border-slate-100">
          <button
            onClick={() => {
              onClose();
              onEdit(task);
            }}
            className="flex-1 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-black rounded-xl transition shadow-md shadow-orange-200 active:scale-95"
          >
            Edit Task
          </button>

          <button
            onClick={() => {
              onClose();
              onDelete(task);
            }}
            className="px-5 py-2.5 border-2 border-red-200 text-red-500 hover:bg-red-50 text-sm font-bold rounded-xl transition"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
