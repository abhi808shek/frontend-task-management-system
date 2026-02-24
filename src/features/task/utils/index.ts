import type { TaskFormData, TaskFormErrors, SubTaskFormData, SubTaskFormErrors } from "../types";

// ─── ID Generator ─────────────────────────────────────────────────────────────

export const uid = (): string => Math.random().toString(36).slice(2, 10);

// ─── Date Formatter ───────────────────────────────────────────────────────────

export function formatDate(d: string): string {
  if (!d) return "—";
  return new Date(d + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

// ─── Avatar Helpers ───────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  "bg-violet-500", "bg-blue-500",   "bg-emerald-500", "bg-amber-500",
  "bg-rose-500",   "bg-cyan-500",   "bg-pink-500",    "bg-indigo-500",
  "bg-teal-500",   "bg-orange-500",
];

export function getAvatarBg(name: string): string {
  return AVATAR_COLORS[(name || "").charCodeAt(0) % AVATAR_COLORS.length];
}

export function getInitials(name: string): string {
  return (name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// ─── Overdue Check ────────────────────────────────────────────────────────────

export function isOverdue(dueDate: string, status: string): boolean {
  return !!dueDate && new Date(dueDate) < new Date() && status !== "Done";
}

// ─── Sub-task Progress ────────────────────────────────────────────────────────

export function getSubTaskProgress(subTasks: { status: string }[]): { done: number; total: number; pct: number } {
  const total = subTasks.length;
  const done  = subTasks.filter((s) => s.status === "Done").length;
  const pct   = total > 0 ? Math.round((done / total) * 100) : 0;
  return { done, total, pct };
}

// ─── Form Validation ──────────────────────────────────────────────────────────

export function validateTaskForm(form: TaskFormData): TaskFormErrors {
  const errors: TaskFormErrors = {};

  if (!form.title?.trim())  errors.title      = "Task title is required";
  if (!form.project)        errors.project    = "Project is required";
  if (!form.assignedTo)     errors.assignedTo = "Assignee is required";
  if (!form.reporter)       errors.reporter   = "Reporter is required";
  if (!form.dueDate)        errors.dueDate    = "Due date is required";
  if (form.startDate && form.dueDate && form.dueDate < form.startDate)
    errors.dueDate = "Due date must be after start date";

  return errors;
}

export function validateSubTaskForm(form: SubTaskFormData): SubTaskFormErrors {
  const errors: SubTaskFormErrors = {};

  if (!form.title?.trim()) errors.title      = "Title is required";
  if (!form.assignedTo)    errors.assignedTo = "Assignee is required";
  if (!form.dueDate)       errors.dueDate    = "Due date is required";

  return errors;
}
