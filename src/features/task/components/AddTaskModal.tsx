import { useState } from "react";
import type { AddTaskModalProps, SubTask, TaskFormData, TaskFormErrors } from "../types";
import { EMPTY_TASK_FORM } from "../constant";
import { validateTaskForm } from "../utils";
import Modal from "./Modal";
import TaskForm from "./TaskForm";

const AddTaskModal = ({ open, onClose, defaultStatus, onAdd }: Omit<AddTaskModalProps, 'onAdd'> & { onAdd: (task: TaskFormData & { subTasks: SubTask[] }) => Promise<void> }) => {
  const [form, setForm]         = useState<TaskFormData>({ ...EMPTY_TASK_FORM, status: defaultStatus, comments: [] });
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  const [errors, setErrors]     = useState<TaskFormErrors>({});
  
  // NEW: Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    if (isSubmitting) return; // Prevent close during API call
    setForm({ ...EMPTY_TASK_FORM, comments: [] });
    setSubTasks([]);
    setErrors({});
    onClose();
  };

  const handleSubmit = async () => {
    const errs = validateTaskForm(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    
    try {
      setIsSubmitting(true);
      // Wait for the TaskPage to complete the API call
      await onAdd({
        ...form,
        subTasks,
      });
      handleClose();
    } catch (error) {
      console.error("Task creation failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Create New Task"
      subtitle="Fill in task details, add sub-tasks, and comments"
    >
      <TaskForm
        form={form}
        setForm={setForm}
        errors={errors}
        subTasks={subTasks}
        setSubTasks={setSubTasks}
      />
      <div className="px-7 pb-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="px-5 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100 rounded-xl transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-black rounded-xl shadow-md shadow-orange-200 transition active:scale-95 disabled:opacity-70 flex items-center gap-2"
        >
          {isSubmitting ? "Creating..." : "Create Task"}
        </button>
      </div>
    </Modal>
  );
}

export default AddTaskModal;