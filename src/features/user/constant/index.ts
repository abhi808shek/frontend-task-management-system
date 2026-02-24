import type { Role, UserStatus, Department, ExperienceLevel, UserFormData, User } from "../types";

export const ROLES: Role[] = ["Admin", "Manager", "Member", "Viewer"];

export const STATUSES: UserStatus[] = ["Active", "Inactive", "Pending", "Suspended"];

export const DEPARTMENTS: Department[] = [
  "Engineering", "Marketing", "HR", "Design",
  "Finance", "Operations", "Sales", "Product",
];

export const JOB_TITLES: string[] = [
  "Frontend Developer", "Backend Developer", "Full Stack Developer",
  "UI/UX Designer", "QA Engineer", "DevOps Engineer",
  "Product Manager", "Scrum Master", "Data Analyst",
  "Marketing Specialist", "HR Manager", "Sales Executive",
];

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  "0–1 years", "1–3 years", "3–5 years",
  "5–8 years", "8–12 years", "12+ years",
];

export const LOCATIONS: string[] = [
  "New York, USA", "San Francisco, USA", "London, UK",
  "Berlin, Germany", "Toronto, Canada", "Sydney, Australia",
  "Dubai, UAE", "Singapore", "Mumbai, India",
  "Tokyo, Japan", "Paris, France", "Amsterdam, Netherlands",
];

export const ROLE_STYLES: Record<Role, string> = {
  Admin:   "bg-violet-50 text-violet-700 border-violet-200",
  Manager: "bg-blue-50 text-blue-700 border-blue-200",
  Member:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  Viewer:  "bg-slate-100 text-slate-600 border-slate-200",
};

export const STATUS_STYLES: Record<UserStatus, string> = {
  Active:    "bg-emerald-50 text-emerald-700 border-emerald-200",
  Inactive:  "bg-slate-100 text-slate-500 border-slate-200",
  Pending:   "bg-amber-50 text-amber-700 border-amber-200",
  Suspended: "bg-red-50 text-red-600 border-red-200",
};

export const STATUS_DOT: Record<UserStatus, string> = {
  Active:    "bg-emerald-500",
  Inactive:  "bg-slate-400",
  Pending:   "bg-amber-400",
  Suspended: "bg-red-500",
};

export const DEPT_GRADIENTS: string[] = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-rose-500 to-pink-600",
  "from-indigo-500 to-blue-600",
  "from-cyan-500 to-sky-600",
  "from-fuchsia-500 to-violet-600",
];

export const EMPTY_USER_FORM: UserFormData = {
  fullName:   "",
  email:      "",
  password:   "",
  role:       "",
  status:     "Active",
  jobTitle:   "",
  department: "",
  location:   "",
  experience: "",
};


const uid = () => Math.random().toString(36).slice(2, 10);

export const SEED_USERS: User[] = [
  {
    id: uid(), fullName: "Alice Johnson", email: "alice@company.com",
    password: "SecurePass1", role: "Admin", status: "Active",
    jobTitle: "Product Manager", department: "Product",
    location: "San Francisco, USA", experience: "5–8 years", createdAt: "2024-10-01",
  },
  {
    id: uid(), fullName: "Bob Martinez", email: "bob@company.com",
    password: "BobPass123", role: "Manager", status: "Active",
    jobTitle: "Frontend Developer", department: "Engineering",
    location: "New York, USA", experience: "3–5 years", createdAt: "2024-10-15",
  },
  {
    id: uid(), fullName: "Carol White", email: "carol@company.com",
    password: "Carol@2024", role: "Member", status: "Pending",
    jobTitle: "UI/UX Designer", department: "Design",
    location: "London, UK", experience: "1–3 years", createdAt: "2024-11-01",
  },
  {
    id: uid(), fullName: "David Kim", email: "david@company.com",
    password: "DavidK!23", role: "Member", status: "Active",
    jobTitle: "Backend Developer", department: "Engineering",
    location: "Berlin, Germany", experience: "3–5 years", createdAt: "2024-11-20",
  },
  {
    id: uid(), fullName: "Emma Davis", email: "emma@company.com",
    password: "EmmaD@321", role: "Viewer", status: "Inactive",
    jobTitle: "Marketing Specialist", department: "Marketing",
    location: "Toronto, Canada", experience: "1–3 years", createdAt: "2024-12-01",
  },
  {
    id: uid(), fullName: "Frank Lee", email: "frank@company.com",
    password: "FrankL#99", role: "Manager", status: "Suspended",
    jobTitle: "DevOps Engineer", department: "Engineering",
    location: "Singapore", experience: "8–12 years", createdAt: "2025-01-05",
  },
];
