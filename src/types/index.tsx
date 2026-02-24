import type { Control, FieldValues, Path } from "react-hook-form";
import type { Page } from "../features/sidebar/types";

export type FormInputProps<TFieldValues extends FieldValues = FieldValues> = {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
};
export type HeaderProps = {
  onNewProject: () => void;
}
export type UserRole = "user" | "manager" | "admin";
export type Department =
  | "Engineering"
  | "Finance"
  | "HR"
  | "Operations"
  | "Marketing"
  | "Sales"
  | "Legal"
  | "Design";

export type SignupFormData = {
  name: string;
  email: string;
  password: string;
  role: UserRole | "";
  department: Department | "";
  experience_years: string;
  location: string;
}

export type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  department?: string;
  experience_years?: string;
  location?: string;
}

export type DropdownOption = {
  value: string;
  label: string;
}

export interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  description?: string;
}

export type TopBarProps = {
  activePage: Page;
  onMenuClick: () => void;
};