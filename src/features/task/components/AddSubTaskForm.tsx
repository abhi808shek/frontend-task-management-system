import { useState } from "react";
import type { SubTask, SubTaskFormData, SubTaskFormErrors, Priority, AddSubTaskFormProps } from "../types";
import { FI, FS, FT } from "./FormFields";
import { uid, validateSubTaskForm } from "../utils";
import { EMPTY_SUBTASK_FORM, MEMBERS, PRIORITIES } from "../constant";


const AddSubTaskForm = ({ onAdd, onCancel }: AddSubTaskFormProps) => {
  const [form, setForm] = useState<SubTaskFormData>({ ...EMPTY_SUBTASK_FORM });
  const [errors, setErrors] = useState<SubTaskFormErrors>({});

  const set = <K extends keyof SubTaskFormData>(
    key: K,
    val: SubTaskFormData[K]
  ) =>
    setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = () => {
    const errs = validateSubTaskForm(form);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    onAdd({ ...form, id: uid() } as SubTask);
    onCancel();
  };

  return (
    <div className="border border-orange-200 bg-orange-50/40 rounded-2xl p-4 mt-2 space-y-3">
      <p className="text-xs font-black text-orange-600 uppercase tracking-widest">
        + New Sub-task
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="sm:col-span-2">
          <FI
            label="Title *"
            value={form.title}
            placeholder="e.g. Write unit tests"
            onChange={(e) => set("title", e.target.value)}
            error={errors.title}
          />
        </div>

        <FT
          label="Description"
          value={form.description}
          placeholder="Details about this sub-task..."
          onChange={(e) => set("description", e.target.value)}
        />

        <div className="space-y-3">
          <FS
            label="Assigned To *"
            value={form.assignedTo}
            options={MEMBERS}
            onChange={(e) => set("assignedTo", e.target.value)}
            error={errors.assignedTo}
          />

          <FS
            label="Priority"
            value={form.priority}
            options={PRIORITIES}
            onChange={(e) => set("priority", e.target.value as Priority)}
            error={errors.priority}
          />

          <FI
            label="Due Date *"
            type="date"
            value={form.dueDate}
            onChange={(e) => set("dueDate", e.target.value)}
            error={errors.dueDate}
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-1">
        <button
          onClick={onCancel}
          className="px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-slate-200 rounded-lg transition"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="px-4 py-1.5 text-xs font-black bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition shadow-sm"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddSubTaskForm;