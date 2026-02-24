import type {
  TaskStatus,
  KanbanStatus,
  Priority,
  TaskType,
  StatusConfig,
  PriorityConfig,
  TypeConfig,
  TaskFormData,
  SubTaskFormData,
  Task,
} from "../types";
import { uid } from "../utils";

export const TASK_STATUSES: TaskStatus[] = [
  "To Do",
  "In Progress",
  "In Review",
  "Done",
  "Blocked",
];

export const KANBAN_COLS: KanbanStatus[] = ["To Do", "In Progress", "Done"];

export const PRIORITIES: Priority[] = ["Low", "Medium", "High", "Critical"];

export const TASK_TYPES: TaskType[] = [
  "Feature",
  "Bug",
  "Improvement",
  "Research",
  "Documentation",
];

export const PROJECTS: string[] = [
  "Website Redesign",
  "Mobile App Launch",
  "Data Migration",
  "Marketing Campaign Q2",
];

export const MEMBERS: string[] = [
  "Alice Johnson",
  "Bob Martinez",
  "Carol White",
  "David Kim",
  "Emma Davis",
  "Frank Lee",
  "Grace Park",
  "Henry Brown",
];


export const STATUS_CFG: Record<TaskStatus, StatusConfig> = {
  "To Do": {
    bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-200",
    dot: "bg-slate-400", colBg: "bg-slate-50", colBorder: "border-slate-200",
    header: "bg-slate-100/80", headerText: "text-slate-700", icon: "○",
  },
  "In Progress": {
    bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200",
    dot: "bg-blue-500", colBg: "bg-blue-50/50", colBorder: "border-blue-100",
    header: "bg-blue-500", headerText: "text-white", icon: "◐",
  },
  "In Review": {
    bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200",
    dot: "bg-violet-500", colBg: "bg-slate-50", colBorder: "border-slate-200",
    header: "bg-slate-100/80", headerText: "text-slate-700", icon: "◑",
  },
  "Done": {
    bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200",
    dot: "bg-emerald-500", colBg: "bg-emerald-50/40", colBorder: "border-emerald-100",
    header: "bg-emerald-500", headerText: "text-white", icon: "●",
  },
  "Blocked": {
    bg: "bg-red-50", text: "text-red-600", border: "border-red-200",
    dot: "bg-red-500", colBg: "bg-slate-50", colBorder: "border-slate-200",
    header: "bg-slate-100/80", headerText: "text-slate-700", icon: "⊘",
  },
};

export const PRIORITY_CFG: Record<Priority, PriorityConfig> = {
  Low:      { bg: "bg-slate-100", text: "text-slate-500",  border: "border-slate-200",  dot: "bg-slate-400",  bar: "bg-slate-300"  },
  Medium:   { bg: "bg-sky-50",    text: "text-sky-700",    border: "border-sky-200",    dot: "bg-sky-500",    bar: "bg-sky-400"    },
  High:     { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", dot: "bg-orange-500", bar: "bg-orange-400" },
  Critical: { bg: "bg-red-50",    text: "text-red-700",    border: "border-red-200",    dot: "bg-red-500",    bar: "bg-red-500"    },
};

export const TYPE_CFG: Record<TaskType, TypeConfig> = {
  Feature:       { icon: "✨", color: "text-violet-600 bg-violet-50 border-violet-200" },
  Bug:           { icon: "🐛", color: "text-red-600 bg-red-50 border-red-200"          },
  Improvement:   { icon: "⚡", color: "text-amber-600 bg-amber-50 border-amber-200"    },
  Research:      { icon: "🔬", color: "text-blue-600 bg-blue-50 border-blue-200"       },
  Documentation: { icon: "📄", color: "text-slate-600 bg-slate-100 border-slate-200"  },
};


export const EMPTY_TASK_FORM: TaskFormData = {
  title:       "",
  description: "",
  project:     "",
  assignedTo:  "",
  status:      "To Do",
  priority:    "Medium",
  startDate:   "",
  dueDate:     "",
  type:        "Feature",
  reporter:    "",
  comments:    [],
};

export const EMPTY_SUBTASK_FORM: SubTaskFormData = {
  title:       "",
  description: "",
  assignedTo:  "",
  status:      "To Do",
  priority:    "Medium",
  dueDate:     "",
};


export const SEED_TASKS: Task[] = [
  {
    id: uid(),
    title: "Design new homepage layout",
    description: "Create wireframes and mockups for the new homepage with modern aesthetics and improved UX.",
    project: "Website Redesign",
    assignedTo: "Carol White",
    status: "To Do",
    priority: "High",
    startDate: "2025-02-01",
    dueDate: "2025-02-28",
    type: "Feature",
    reporter: "Alice Johnson",
    comments: [{ id: uid(), author: "Alice Johnson", text: "Please follow the new brand guidelines doc.", date: "2025-02-01" }],
    subTasks: [
      { id: uid(), title: "Create low-fi wireframes",       description: "Start with sketches", assignedTo: "Carol White", status: "Done",  priority: "Medium", dueDate: "2025-02-08" },
      { id: uid(), title: "Build high-fi mockups in Figma", description: "",                   assignedTo: "Carol White", status: "To Do", priority: "High",   dueDate: "2025-02-20" },
    ],
    createdAt: "2025-01-28",
  },
  {
    id: uid(),
    title: "Fix auth token expiry bug",
    description: "Users are getting 401 errors intermittently on the login endpoint after 30 minutes.",
    project: "Mobile App Launch",
    assignedTo: "Bob Martinez",
    status: "In Progress",
    priority: "Critical",
    startDate: "2025-01-28",
    dueDate: "2025-02-05",
    type: "Bug",
    reporter: "Emma Davis",
    comments: [{ id: uid(), author: "Bob Martinez", text: "Found the root cause — refresh token logic is broken.", date: "2025-01-30" }],
    subTasks: [
      { id: uid(), title: "Reproduce & document bug",      description: "", assignedTo: "Bob Martinez", status: "Done",        priority: "High",     dueDate: "2025-01-29" },
      { id: uid(), title: "Implement fix & write tests",   description: "", assignedTo: "Bob Martinez", status: "In Progress", priority: "Critical", dueDate: "2025-02-03" },
    ],
    createdAt: "2025-01-28",
  },
  {
    id: uid(),
    title: "Write REST API documentation",
    description: "Document all public endpoints for the mobile app including auth, users, and data routes.",
    project: "Mobile App Launch",
    assignedTo: "David Kim",
    status: "In Progress",
    priority: "Medium",
    startDate: "2025-01-20",
    dueDate: "2025-02-20",
    type: "Documentation",
    reporter: "Alice Johnson",
    comments: [],
    subTasks: [],
    createdAt: "2025-01-20",
  },
  {
    id: uid(),
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing, linting, and deployment to staging and production.",
    project: "Data Migration",
    assignedTo: "Frank Lee",
    status: "Done",
    priority: "High",
    startDate: "2024-12-01",
    dueDate: "2024-12-20",
    type: "Improvement",
    reporter: "Henry Brown",
    comments: [{ id: uid(), author: "Frank Lee", text: "Pipeline is live. All checks passing.", date: "2024-12-18" }],
    subTasks: [
      { id: uid(), title: "Configure GitHub Actions",  description: "", assignedTo: "Frank Lee", status: "Done", priority: "High",   dueDate: "2024-12-10" },
      { id: uid(), title: "Set up staging environment",description: "", assignedTo: "Frank Lee", status: "Done", priority: "Medium", dueDate: "2024-12-15" },
    ],
    createdAt: "2024-12-01",
  },
  {
    id: uid(),
    title: "Q2 competitor market research",
    description: "Analyze top 5 competitor marketing campaigns and identify key messaging differentiators.",
    project: "Marketing Campaign Q2",
    assignedTo: "Emma Davis",
    status: "To Do",
    priority: "Medium",
    startDate: "2025-03-01",
    dueDate: "2025-03-15",
    type: "Research",
    reporter: "Grace Park",
    comments: [],
    subTasks: [],
    createdAt: "2025-02-20",
  },
  {
    id: uid(),
    title: "Migrate user records to PostgreSQL",
    description: "Move all 2M+ user records from legacy MySQL to AWS RDS PostgreSQL with zero downtime.",
    project: "Data Migration",
    assignedTo: "Henry Brown",
    status: "Done",
    priority: "Critical",
    startDate: "2024-11-15",
    dueDate: "2025-01-15",
    type: "Improvement",
    reporter: "Alice Johnson",
    comments: [{ id: uid(), author: "Henry Brown", text: "Migration complete. Zero data loss confirmed.", date: "2025-01-14" }],
    subTasks: [],
    createdAt: "2024-11-15",
  },
];
