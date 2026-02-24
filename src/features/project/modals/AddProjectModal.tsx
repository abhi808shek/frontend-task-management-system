import { useState } from "react";
import type { AddProjectModalProps, FormData, FormErrors, Project } from "../types";
import { EMPTY_FORM } from "../constant";
import { validateProjectForm } from "../schema";
import Modal from "../../../components/ui/Modal";
import ProjectForm from "../components/ProjectForm";


export default function AddProjectModal({ open, onClose, onAdd }: AddProjectModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  
  // NEW: Add loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    if (isSubmitting) return; // Prevent closing while saving
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  const handleSubmit = async () => {
    const errs = validateProjectForm(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      setIsSubmitting(true);
      // Wait for the parent to finish the API create call
      await onAdd(form);
      handleClose(); // Close and reset form on success
    } catch (error) {
      console.error("Failed to create project:", error);
      // Optionally set an error state here to show a message in the modal
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title="Create New Project">
      <ProjectForm form={form} setForm={setForm} errors={errors} />
      <div className="px-6 pb-5 flex justify-end gap-3 border-t border-slate-100 pt-4">
        <button
          onClick={handleClose}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-md shadow-indigo-200 transition active:scale-95 disabled:opacity-70 flex items-center gap-2"
        >
          {isSubmitting ? "Creating..." : "Create Project"}
        </button>
      </div>
    </Modal>
  );
}