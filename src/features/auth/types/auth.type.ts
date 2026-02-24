import type { Control } from "react-hook-form";
import type { LoginSchema, SignupSchema } from "../schema/auth.schema";

// ── Enums ──────────────────────────────────────────────────────────
export const ROLES = ["user", "manager", "admin"] as const;
export const DEPARTMENTS = ["IT","Finance","HR","Operations",] as const;
export type Role = (typeof ROLES)[number];
export type Department = (typeof DEPARTMENTS)[number];

// ── Signup ─────────────────────────────────────────────────────────
export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: Role;
  department: Department;
  experience_years: number;
  location: string;
}


// ── Login ──────────────────────────────────────────────────────────
export interface LoginFormValues {
  email: string;
  password: string;
}

export type LoginFormProps = {
  onSuccess?: (data: LoginSchema) => void;
  onSignupClick?: () => void;
}

export type SignupPayload = Omit<SignupFormValues, "confirmPassword">;
export interface FormSelectProps {
  name: keyof SignupSchema;
  control: Control<SignupSchema>;
  label: string;
  options: readonly string[];
}