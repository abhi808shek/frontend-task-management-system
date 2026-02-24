import { useState } from "react";
import { validateProjectForm } from "../schema";
import Modal from "../../../components/ui/Modal";
import type { FormData, Project } from "../../project/types";
import { EMPTY_FORM } from "../../project/constant";
import type { FormErrors } from "../../../types";
import { uid } from "../../project/utils";
import ProjectForm from "../../project/components/ProjectForm";

interface AddProjectModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (project: Project) => void;
}

export default function AddProjectModal({ open, onClose, onAdd }: AddProjectModalProps) {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  const handleSubmit = () => {
    const errs = validateProjectForm(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onAdd({
      ...form,
      id: uid(),
      createdAt: new Date().toISOString().slice(0, 10),
    });
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Create New Project">
      <ProjectForm form={form} setForm={setForm} errors={errors} />
      <div className="px-6 pb-5 flex justify-end gap-3 border-t border-slate-100 pt-4">
        <button
          onClick={handleClose}
          className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-md shadow-indigo-200 transition active:scale-95"
        >
          Create Project
        </button>
      </div>
    </Modal>
  );
}
