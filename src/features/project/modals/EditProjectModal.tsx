import { useState, useEffect } from "react";
import type { EditProjectModalProps, FormData, FormErrors, Project } from "../types";
import { validateProjectForm } from "../schema";
import Modal from "../../../components/ui/Modal";
import ProjectForm from "../components/ProjectForm";

const projectToForm = (p: Project): FormData => {
  return {
    name: p.name,
    description: p.description,
    startDate: p.startDate,
    dueDate: p.dueDate,
    status: p.status,
    priority: p.priority,
    owner: p.owner,
    teamMembers: p.teamMembers,
  };
}

const EditProjectModal = ({ project, onClose, onSave }: EditProjectModalProps) => {
  const [form, setForm] = useState<FormData>(project ? projectToForm(project) : {} as FormData);
  const [errors, setErrors] = useState<FormErrors>({});
  
  // NEW: Add loading state
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setForm(projectToForm(project));
      setErrors({});
      setIsSubmitting(false); // Reset on open
    }
  }, [project]);

  // NEW: Make handleSubmit async
  const handleSubmit = async () => {
    const errs = validateProjectForm(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      setIsSubmitting(true);
      // Wait for the parent to finish the API call
      await onSave({ ...project!, ...form });
      onClose(); // Close only on success
    } catch (error) {
      console.error("Failed to update project:", error);
      // Optionally handle modal-specific error display here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={!!project} onClose={onClose} title="Edit Project">
      {project && (
        <>
          <ProjectForm form={form} setForm={setForm} errors={errors} />
          <div className="px-6 pb-5 flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              onClick={onClose}
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
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}

export default EditProjectModal;