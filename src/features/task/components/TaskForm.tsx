import { useCallback, useState } from "react";
import SubTaskRow from "./SubTaskRow";
import SubProgress from "./SubProgress";
import AddSubTaskForm from "./AddSubTaskForm";
import SectionLabel from "./SectionLabel";
import { PROJECTS, TASK_TYPES, MEMBERS, TASK_STATUSES, PRIORITIES } from "../constant";
import { uid } from "../utils";
import type {
  TaskFormData, 
  TaskStatus, Priority, TaskType,
  TaskFormProps,
} from "../types";
import { FI, FS, FT } from "./FormFields";
import Avatar from "../../../components/ui/Avatar";



const TaskForm = ({
  form,
  setForm,
  errors,
  subTasks,
  setSubTasks,
}: TaskFormProps) => {
  const [showSubForm, setShowSubForm] = useState(false);
  const [comment, setComment] = useState("");

  const set = <K extends keyof TaskFormData>(key: K, val: TaskFormData[K]) =>
    setForm({ ...form, [key]: val });

  const addComment = () => {
    if (!comment.trim()) return;

    set("comments", [
      ...(form.comments || []),
      {
        id: uid(),
        author: form.reporter || "Team",
        text: comment,
        date: new Date().toISOString().slice(0, 10),
      },
    ]);

    setComment("");
  };

  const toggleSub = useCallback((id: string) => {
  setSubTasks((s) =>
    s.map((t) =>
      t.id === id
        ? { ...t, status: t.status === "Done" ? "To Do" : "Done" }
        : t
    )
  );
}, [setSubTasks]);
  const deleteSub = (id: string) => {
    setSubTasks((s) => s.filter((t) => t.id !== id));
  };

  return (
    <div className="px-7 py-6 space-y-7">
      <section>
        <SectionLabel icon="📝" text="Task Details" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <div className="sm:col-span-2">
            <FI
              label="Task Title *"
              value={form.title}
              placeholder="e.g. Build authentication flow"
              onChange={(e) => set("title", e.target.value)}
              error={errors.title}
            />
          </div>

          <div className="sm:col-span-2">
            <FT
              label="Description"
              value={form.description}
              placeholder="Detailed explanation of what needs to be done..."
              onChange={(e) => set("description", e.target.value)}
            />
          </div>

          <FS
            label="Project *"
            value={form.project}
            options={PROJECTS}
            onChange={(e) => set("project", e.target.value)}
            error={errors.project}
          />

          <FS
            label="Task Type"
            value={form.type}
            options={TASK_TYPES}
            onChange={(e) => set("type", e.target.value as TaskType)}
          />

          <FS
            label="Assigned To *"
            value={form.assignedTo}
            options={MEMBERS}
            onChange={(e) => set("assignedTo", e.target.value)}
            error={errors.assignedTo}
          />

          <FS
            label="Reporter / Created By *"
            value={form.reporter}
            options={MEMBERS}
            onChange={(e) => set("reporter", e.target.value)}
            error={errors.reporter}
          />

          <FS
            label="Status"
            value={form.status}
            options={TASK_STATUSES}
            onChange={(e) => set("status", e.target.value as TaskStatus)}
          />

          <FS
            label="Priority"
            value={form.priority}
            options={PRIORITIES}
            onChange={(e) => set("priority", e.target.value as Priority)}
          />

          <FI
            label="Start Date"
            type="date"
            value={form.startDate}
            onChange={(e) => set("startDate", e.target.value)}
          />

          <FI
            label="Due Date *"
            type="date"
            value={form.dueDate}
            onChange={(e) => set("dueDate", e.target.value)}
            error={errors.dueDate}
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <SectionLabel icon="⊞" text="Sub-tasks" count={subTasks.length} />

          <button
            onClick={() => setShowSubForm(true)}
            className="flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-700 transition"
          >
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Sub-task
          </button>
        </div>

        {subTasks.length > 0 && (
          <div className="mt-2 mb-2">
            <SubProgress subTasks={subTasks} />
          </div>
        )}

        <div className="space-y-2 mt-2">
          {subTasks.map((s) => (
            <SubTaskRow
              key={s.id}
              sub={s}
              onToggle={toggleSub}
              onDelete={deleteSub}
            />
          ))}
        </div>

        {showSubForm && (
          <AddSubTaskForm
            onAdd={(s) => {
              setSubTasks((p) => [...p, s]);
              setShowSubForm(false);
            }}
            onCancel={() => setShowSubForm(false)}
          />
        )}

        {subTasks.length === 0 && !showSubForm && (
          <div className="border-2 border-dashed border-slate-200 rounded-xl py-6 text-center mt-2">
            <p className="text-xs text-slate-300 font-medium">
              No sub-tasks yet — click "Add Sub-task" to create one
            </p>
          </div>
        )}
      </section>

      {/* Comments */}
      <section>
        <SectionLabel
          icon="💬"
          text="Comments"
          count={form.comments?.length || 0}
        />

        <div className="mt-3 space-y-3 max-h-52 overflow-y-auto pr-1">
          {(form.comments || []).map((c) => (
            <div key={c.id} className="flex gap-3">
              <Avatar name={c.author} />
              <div className="flex-1 bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-700">
                    {c.author}
                  </span>
                  <span className="text-[10px] text-slate-400">{c.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {c.text}
                </p>
              </div>
            </div>
          ))}

          {(!form.comments || form.comments.length === 0) && (
            <p className="text-xs text-slate-300 text-center py-3">
              No comments yet
            </p>
          )}
        </div>

        <div className="flex gap-2 mt-3">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && addComment()
            }
            placeholder="Add a comment… (Enter to send)"
            className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition placeholder:text-slate-300"
          />

          <button
            onClick={addComment}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition"
          >
            Send
          </button>
        </div>
      </section>
    </div>
  );
};

export default TaskForm;