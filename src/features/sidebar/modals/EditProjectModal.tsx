import { useState, useEffect } from "react";
import { validateProjectForm } from "../schema";
import Modal from "../../../components/ui/Modal";
import type { EditProjectModalProps, FormData, FormErrors, Project } from "../../project/types";
import ProjectForm from "../../project/components/ProjectForm";



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

  useEffect(() => {
    if (project) {
      setForm(projectToForm(project));
      setErrors({});
    }
  }, [project]);

  const handleSubmit = () => {
    const errs = validateProjectForm(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onSave({ ...project!, ...form });
    onClose();
  };

  return (
    <Modal open={!!project} onClose={onClose} title="Edit Project">
      {project && (
        <>
          <ProjectForm form={form} setForm={setForm} errors={errors} />
          <div className="px-6 pb-5 flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-md shadow-indigo-200 transition active:scale-95"
            >
              Save Changes
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
export default  EditProjectModal