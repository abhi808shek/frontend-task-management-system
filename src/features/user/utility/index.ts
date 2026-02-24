import { DEPT_GRADIENTS } from "../constant";
import type { UserFormData, UserFormErrors } from "../types";

export function maskPassword(password: string): string {
  return password ? "•".repeat(Math.min(password.length, 10)) : "—";
}

export function getDeptGradient(dept: string): string {
  return DEPT_GRADIENTS[(dept?.charCodeAt(0) ?? 0) % DEPT_GRADIENTS.length];
}


export function validateUserForm(
  form: UserFormData,
  isEdit: boolean = false
): UserFormErrors {
  const errors: UserFormErrors = {};

  if (!form.fullName.trim()) errors.fullName = "Full name is required";

  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!isEdit) {
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 8)
      errors.password = "Password must be at least 8 characters";
  }

  if (!form.role)       errors.role       = "Role is required";
  if (!form.status)     errors.status     = "Status is required";
  if (!form.jobTitle)   errors.jobTitle   = "Job title is required";
  if (!form.department) errors.department = "Department is required";
  if (!form.location)   errors.location   = "Location is required";
  if (!form.experience) errors.experience = "Experience level is required";

  return errors;
}
