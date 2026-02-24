import type { Status, Priority, FormData, Project } from "../types";

// ─── Option Lists ─────────────────────────────────────────────────────────────

export const STATUSES: Status[] = ["Not Started", "In Progress", "Completed", "On Hold"];
export const PRIORITIES: Priority[] = ["Low", "Medium", "High", "Critical"];

export const TEAM_POOL: string[] = [
  "Alice Johnson", "Bob Martinez", "Carol White", "David Kim",
  "Emma Davis", "Frank Lee", "Grace Park", "Henry Brown",
  "Ivy Chen", "James Wilson", "Karen Taylor", "Leo Nguyen",
];

export const OWNERS: string[] = TEAM_POOL.slice(0, 6);

// ─── Style Maps ───────────────────────────────────────────────────────────────

export const STATUS_STYLES: Record<Status, string> = {
  "Not Started": "bg-slate-100 text-slate-700 border-slate-200",
  "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
  "Completed":   "bg-emerald-50 text-emerald-700 border-emerald-200",
  "On Hold":     "bg-amber-50 text-amber-700 border-amber-200",
};

export const PRIORITY_STYLES: Record<Priority, string> = {
  Low:      "bg-slate-100 text-slate-600 border-slate-200",
  Medium:   "bg-sky-50 text-sky-700 border-sky-200",
  High:     "bg-orange-50 text-orange-700 border-orange-200",
  Critical: "bg-red-50 text-red-700 border-red-200",
};

export const PRIORITY_DOT: Record<Priority, string> = {
  Low:      "bg-slate-400",
  Medium:   "bg-sky-500",
  High:     "bg-orange-500",
  Critical: "bg-red-500",
};

// ─── Default Form State ───────────────────────────────────────────────────────

export const EMPTY_FORM: FormData = {
  name: "",
  description: "",
  startDate: "",
  dueDate: "",
  status: "Not Started",
  priority: "Medium",
  owner: "",
  teamMembers: [],
};

// ─── Seed Data ────────────────────────────────────────────────────────────────

const uid = () => Math.random().toString(36).slice(2, 10);

export const SEED_PROJECTS: Project[] = [
  {
    id: uid(),
    name: "Website Redesign",
    description: "Full redesign of the corporate website with modern UX",
    startDate: "2025-01-15",
    dueDate: "2025-04-30",
    status: "In Progress",
    priority: "High",
    owner: "Alice Johnson",
    teamMembers: ["Bob Martinez", "Carol White", "David Kim"],
    createdAt: "2025-01-10",
  },
  {
    id: uid(),
    name: "Mobile App Launch",
    description: "Launch iOS and Android apps for the new product line",
    startDate: "2025-02-01",
    dueDate: "2025-06-15",
    status: "Not Started",
    priority: "Critical",
    owner: "Emma Davis",
    teamMembers: ["Frank Lee", "Grace Park"],
    createdAt: "2025-01-20",
  },
  {
    id: uid(),
    name: "Data Migration",
    description: "Migrate legacy database to cloud infrastructure",
    startDate: "2024-11-01",
    dueDate: "2025-01-31",
    status: "Completed",
    priority: "High",
    owner: "Henry Brown",
    teamMembers: ["Ivy Chen", "James Wilson", "Karen Taylor"],
    createdAt: "2024-10-28",
  },
  {
    id: uid(),
    name: "Marketing Campaign Q2",
    description: "Q2 digital marketing campaigns across all channels",
    startDate: "2025-03-01",
    dueDate: "2025-05-31",
    status: "On Hold",
    priority: "Medium",
    owner: "Leo Nguyen",
    teamMembers: ["Alice Johnson", "Bob Martinez"],
    createdAt: "2025-02-15",
  },
];
