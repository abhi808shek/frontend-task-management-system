import { PriorityBadge, TypeBadge } from "./Badges";
import SubProgress from "./SubProgress";
import { formatDate, isOverdue } from "../utils";
import { PRIORITY_CFG } from "../constant";
import { CommentIcon, EditIcon, MonitorIcon, TrashIcon } from "../../../assets/icons/Icons";
import Avatar from "../../../components/ui/Avatar";
import type { TaskCardProps } from "../types";


const TaskCard = ({ task, onView, onEdit, onDelete }: TaskCardProps) => {
  const overdue  = isOverdue(task.dueDate, task.status);
  const subTotal = task.subTasks?.length || 0;
  const pcfg     = PRIORITY_CFG[task.priority] || PRIORITY_CFG.Medium;

  return (
    <div
      onClick={() => onView(task)}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer group overflow-hidden"
    >
      <div className={`h-1 w-full ${pcfg.bar}`} />

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2.5">
          <TypeBadge type={task.type} />
          <div
            className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 rounded-lg hover:bg-orange-50 text-slate-300 hover:text-orange-500 transition"
              title="Edit"
            >
              <EditIcon />
            </button>
            <button
              onClick={() => onDelete(task)}
              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition"
              title="Delete"
            >
              <TrashIcon />
            </button>
          </div>
        </div>

        <h4 className="font-bold text-slate-800 text-sm leading-snug mb-1.5 group-hover:text-orange-700 transition-colors line-clamp-2">
          {task.title}
        </h4>

        {task.description && (
          <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
            {task.description}
          </p>
        )}

        <div className="flex items-center gap-1.5 mb-3">
          <MonitorIcon />
          <span className="text-[10px] font-semibold text-slate-400 truncate">
            {task.project}
          </span>
        </div>

        <div className="mb-3">
          <PriorityBadge priority={task.priority} />
        </div>

        {subTotal > 0 && (
          <div className="mb-3">
            <SubProgress subTasks={task.subTasks} />
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div className="flex items-center gap-1.5">
            <Avatar name={task.assignedTo} />
            <span className="text-xs text-slate-500 font-medium truncate max-w-[70px]">
              {task.assignedTo?.split(" ")[0]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {(task.comments?.length || 0) > 0 && (
              <span className="flex items-center gap-0.5 text-[10px] text-slate-400 font-medium">
                <CommentIcon />
                {task.comments.length}
              </span>
            )}
            <span
              className={`text-[10px] font-bold ${
                overdue ? "text-red-500" : "text-slate-400"
              }`}
            >
              {overdue && "⚠ "}
              {formatDate(task.dueDate)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
