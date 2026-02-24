import { useState, useEffect } from "react";
import Modal from "./Modal";
import { validateTaskForm } from "../utils";
import type { Task, TaskFormData, TaskFormErrors, SubTask, EditTaskModalProps } from "../types";
import TaskForm from "./TaskForm";

const taskToForm = (t: Task): TaskFormData => ({
  title: t.title ?? "",
  description: t.description ?? "",
  project: t.project ?? "",
  assignedTo: t.assignedTo ?? "",
  status: t.status ?? "todo",
  priority: t.priority ?? "medium",
  startDate: t.startDate ?? "",
  dueDate: t.dueDate ?? "",
  type: t.type ?? "task",
  reporter: t.reporter ?? "",
  comments: t.comments ?? [],
});

const EditTaskModal = ({ task, onClose, onSave }: EditTaskModalProps) => {
  const [form, setForm] = useState<TaskFormData>(task ? taskToForm(task) : ({} as TaskFormData));
  const [subTasks, setSubTasks] = useState<SubTask[]>(task?.subTasks || []);
  const [errors, setErrors] = useState<TaskFormErrors>({});
  
  // NEW: Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setForm(taskToForm(task));
      setSubTasks(task.subTasks || []);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [task]);

  const handleSubmit = async () => {
    const errs = validateTaskForm(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    if (!task) return;

    try {
      setIsSubmitting(true);
      await onSave({ ...task, ...form, subTasks });
      onClose();
    } catch (error) {
       console.error("Update failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={!!task}
      onClose={isSubmitting ? () => {} : onClose}
      title="Edit Task"
      subtitle={task ? `Editing: ${task.title}` : ""}
    >
      {task && (
        <>
          <TaskForm
            form={form}
            setForm={setForm}
            errors={errors}
            subTasks={subTasks}
            setSubTasks={setSubTasks}
          />

          <div className="px-7 pb-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-black rounded-xl shadow-md shadow-orange-200 transition active:scale-95 disabled:opacity-70 flex gap-2 items-center"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default EditTaskModal;