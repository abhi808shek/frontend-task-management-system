import { DeleteIcon, EditIcon } from "../../../assets/icons/Icons";
import Avatar from "../../../components/ui/Avatar";
import Badge from "../../../components/ui/Badge";
import { PRIORITY_DOT, PRIORITY_STYLES, STATUS_STYLES } from "../constant";
import type { ProjectCardProps } from "../types";
import { formatDate } from "../utils";


const ProjectCard = ({ project, onEdit, onDelete }: ProjectCardProps) => {
  const daysLeft = Math.ceil(
    (new Date(project.dueDate).getTime() - Date.now()) / 86400000
  );
  const isOverdue = daysLeft < 0 && project.status !== "Completed";

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-slate-900 text-base leading-snug group-hover:text-indigo-700 transition-colors">
            {project.name}
          </h3>
          <div className="flex gap-1.5 shrink-0">
            <button
              onClick={onEdit}
              className="p-1.5 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition"
              title="Edit"
            >
              <EditIcon />
            </button>
            <button
              onClick={onDelete}
              className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition"
              title="Delete"
            >
              <DeleteIcon />
            </button>
          </div>
        </div>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Badges */}
      <div className="px-5 pb-4 flex flex-wrap gap-2">
        <Badge label={project.status} style={STATUS_STYLES[project.status]} />
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${PRIORITY_STYLES[project.priority]}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[project.priority]}`} />
          {project.priority}
        </span>
        {isOverdue && (
          <Badge label="Overdue" style="bg-red-50 text-red-600 border-red-200" />
        )}
      </div>

      {/* Dates */}
      <div className="px-5 pb-4 grid grid-cols-2 gap-3">
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Start</p>
          <p className="text-xs font-semibold text-slate-700">{formatDate(project.startDate)}</p>
        </div>
        <div className={`rounded-xl p-3 ${isOverdue ? "bg-red-50" : "bg-slate-50"}`}>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Due</p>
          <p className={`text-xs font-semibold ${isOverdue ? "text-red-600" : "text-slate-700"}`}>
            {formatDate(project.dueDate)}
          </p>
        </div>
      </div>

      {/* Footer: Owner + Team */}
      <div className="border-t border-slate-50 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar name={project.owner} />
          <div>
            <p className="text-[10px] text-slate-400">Owner</p>
            <p className="text-xs font-medium text-slate-700">
              {project.owner.split(" ")[0]}
            </p>
          </div>
        </div>
        <div className="flex -space-x-1.5">
          {project.teamMembers.slice(0, 4).map((m) => (
            <Avatar key={m} name={m} />
          ))}
          {project.teamMembers.length > 4 && (
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-600 text-xs flex items-center justify-center ring-2 ring-white font-semibold">
              +{project.teamMembers.length - 4}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard 