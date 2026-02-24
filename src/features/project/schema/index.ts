import type { FormData, FormErrors } from "../types";
export function validateProjectForm(form: FormData): FormErrors {
  const errors: FormErrors = {};

  if (!form.name.trim()) errors.name = "Project name is required";
  if (!form.description.trim()) errors.description = "Description is required";
  if (!form.startDate) errors.startDate = "Start date is required";
  if (!form.dueDate) errors.dueDate = "Due date is required";
  if (form.startDate && form.dueDate && form.dueDate < form.startDate)
    errors.dueDate = "Due date must be after start date";
  if (!form.owner) errors.owner = "Owner is required";
  if (form.teamMembers.length === 0)
    errors.teamMembers = "Select at least one team member";

  return errors;
}
