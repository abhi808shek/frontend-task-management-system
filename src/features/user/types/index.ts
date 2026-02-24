export type Role = "Admin" | "Manager" | "Member" | "Viewer";

export type UserStatus = "Active" | "Inactive" | "Pending" | "Suspended";

export type Department =
  | "Engineering"
  | "Marketing"
  | "HR"
  | "Design"
  | "Finance"
  | "Operations"
  | "Sales"
  | "Product";

export type ExperienceLevel =
  | "0–1 years"
  | "1–3 years"
  | "3–5 years"
  | "5–8 years"
  | "8–12 years"
  | "12+ years";


export type User = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: Role;
  status: UserStatus;
  jobTitle: string;
  department: Department;
  location: string;
  experience: ExperienceLevel;
  createdAt: string;
};


export type UserFormData = {
  fullName: string;
  email: string;
  password: string;
  role: Role | "";
  status: UserStatus;
  jobTitle: string;
  department: Department | "";
  location: string;
  experience: ExperienceLevel | "";
};

export type UserFormErrors = Partial<Record<keyof UserFormData, string>>;


export type ModalBaseProps = {
  onClose: () => void;
};

export type UserActionHandlers = {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export type UserFiltersProps = {
  search: string;
  filterRole: string;
  filterStatus: string;
  filterDept: string;
  resultCount: number;
  onSearch: (v: string) => void;
  onRole: (v: string) => void;
  onStatus: (v: string) => void;
  onDept: (v: string) => void;
  onClear: () => void;
};

export type UserFormProps = {
  form: UserFormData;
  setForm: (form: UserFormData) => void;
  errors: UserFormErrors;
  isEdit?: boolean;
};

export type EditUserModalProps = {
  user: User | null;
  onClose: () => void;
  onSave: (updated: User) => void;
};

export type UserDetailModalProps = UserActionHandlers & {
  user: User | null;
  onClose: () => void;
};

export type DetailTileProps = {
  label: string;
  value: string;
};
export type HeaderProps = {
  onAddUser: () => void;
};