import type { FormData, Priority, ProjectFormProps, Status } from "../types";
import { OWNERS, PRIORITIES, STATUSES, TEAM_POOL } from "../constant";
import Input from "../../../components/ui/Input";
import TextArea from "../../../components/ui/TextArea";
import Select from "../../../components/ui/Select";
import MultiSelect from "../../../components/ui/MultiSelect";



 const ProjectForm = ({ form, setForm, errors }: ProjectFormProps) => {
  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm({ ...form, [key]: value });

  return (
    <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
      {/* Project Name */}
      <div className="sm:col-span-2">
        <Input
          label="Project Name *"
          id="name"
          value={form.name}
          placeholder="e.g. Website Redesign"
          onChange={(e) => set("name", e.target.value)}
          error={errors.name}
        />
      </div>

      {/* Description */}
      <div className="sm:col-span-2">
        <TextArea
          label="Description *"
          id="description"
          value={form.description}
          placeholder="Brief overview of the project's purpose..."
          onChange={(e) => set("description", e.target.value)}
          error={errors.description}
        />
      </div>

      {/* Start Date */}
      <Input
        label="Start Date *"
        id="startDate"
        type="date"
        value={form.startDate}
        onChange={(e) => set("startDate", e.target.value)}
        error={errors.startDate}
      />

      {/* Due Date */}
      <Input
        label="Due / End Date *"
        id="dueDate"
        type="date"
        value={form.dueDate}
        onChange={(e) => set("dueDate", e.target.value)}
        error={errors.dueDate}
      />

      {/* Status */}
      <Select
        label="Status *"
        id="status"
        value={form.status}
        options={STATUSES}
        onChange={(e) => set("status", e.target.value as Status)}
        error={errors.status}
      />

      {/* Priority */}
      <Select
        label="Priority *"
        id="priority"
        value={form.priority}
        options={PRIORITIES}
        onChange={(e) => set("priority", e.target.value as Priority)}
        error={errors.priority}
      />

      {/* Owner */}
      <div className="sm:col-span-2">
        <Select
          label="Project Owner / Manager *"
          id="owner"
          value={form.owner}
          options={OWNERS}
          onChange={(e) => set("owner", e.target.value)}
          error={errors.owner}
        />
      </div>

      {/* Team Members */}
      <div className="sm:col-span-2">
        <MultiSelect
          label="Team Members *"
          id="teamMembers"
          options={TEAM_POOL}
          value={form.teamMembers}
          onChange={(v) => set("teamMembers", v)}
          error={errors.teamMembers}
        />
      </div>
    </div>
  );
}
export default ProjectForm