import {
  ROLES, STATUSES, JOB_TITLES, DEPARTMENTS, LOCATIONS, EXPERIENCE_LEVELS,
} from "../constant";
import Select from "../../../components/ui/Select";
import type { UserFormData, Role, UserStatus, Department, ExperienceLevel, UserFormProps } from "../types";
import Input from "../../../components/ui/Input";



export default function UserForm({ form, setForm, errors, isEdit = false }: UserFormProps) {
  const set = <K extends keyof UserFormData>(key: K, value: UserFormData[K]) =>
    setForm({ ...form, [key]: value });

  return (
    <div className="px-7 py-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
      {/* Full Name */}
      <div className="sm:col-span-2">
        <Input
          label="Full Name"
          value={form.fullName}
          placeholder="e.g. Alice Johnson"
          onChange={(e) => set("fullName", e.target.value)}
          error={errors.fullName}
        />
      </div>

      {/* Email */}
      <Input
        label="Email Address"
        type="email"
        value={form.email}
        placeholder="alice@company.com"
        onChange={(e) => set("email", e.target.value)}
        error={errors.email}
      />

      {/* Password */}
      <Input
        label={isEdit ? "New Password (leave blank to keep)" : "Password"}
        type="password"
        value={form.password}
        placeholder={isEdit ? "Leave blank to keep current" : "Min. 8 characters"}
        onChange={(e) => set("password", e.target.value)}
        error={errors.password}
      />

      {/* Role */}
      <Select
        label="Role"
        value={form.role}
        options={ROLES}
        onChange={(e) => set("role", e.target.value as Role)}
        error={errors.role}
      />

      {/* Status */}
      <Select
        label="Status"
        value={form.status}
        options={STATUSES}
        onChange={(e) => set("status", e.target.value as UserStatus)}
        error={errors.status}
      />

      {/* Job Title */}
      <Select
        label="Job Title / Position"
        value={form.jobTitle}
        options={JOB_TITLES}
        onChange={(e) => set("jobTitle", e.target.value)}
        error={errors.jobTitle}
      />

      {/* Department */}
      <Select
        label="Department"
        value={form.department}
        options={DEPARTMENTS}
        onChange={(e) => set("department", e.target.value as Department)}
        error={errors.department}
      />

      {/* Location */}
      <Select
        label="Location"
        value={form.location}
        options={LOCATIONS}
        onChange={(e) => set("location", e.target.value)}
        error={errors.location}
      />

      {/* Experience */}
      <Select
        label="Experience Level"
        value={form.experience}
        options={EXPERIENCE_LEVELS}
        onChange={(e) => set("experience", e.target.value as ExperienceLevel)}
        error={errors.experience}
      />
    </div>
  );
}
