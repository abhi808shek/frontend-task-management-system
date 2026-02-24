import type { User, PageMeta, Page } from "../types";
import {
  DashboardIcon,
  ProjectsIcon,
  TasksIcon,
  UsersIcon,
} from "../../../assets/icons/Icons";


export const BRAND_PRIMARY = "#7AAACE";


export const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: DashboardIcon, badge: undefined },
  { id: "projects",  label: "Projects",  icon: ProjectsIcon,  badge: 4         },
  { id: "tasks",     label: "Tasks",     icon: TasksIcon,     badge: 12        },
  { id: "users",     label: "Users",     icon: UsersIcon,     badge: undefined },
] as const;


export const CURRENT_USER: User = {
  name:  "Alice Johnson",
  role:  "Product Manager",
  email: "alice@company.com",
};


export const PAGE_META: Record<Page, PageMeta> = {
  dashboard: {
    title:    "Dashboard",
    subtitle: "Welcome back, Alice! Here's what's happening.",
    color:    "from-orange-500 to-amber-500",
    emoji:    "📊",
    btn:    "",
  },
  projects: {
    title:    "Projects",
    subtitle: "Manage and track all your active projects.",
    color:    "from-blue-500 to-cyan-500",
    emoji:    "📁",
    btn:    "New Project",
  },
  tasks: {
    title:    "Tasks",
    subtitle: "Your kanban board — stay on top of everything.",
    color:    "from-violet-500 to-purple-500",
    emoji:    "✅",
    btn:    "New Task",
  },
  users: {
    title:    "Users",
    subtitle: "Manage team members and their permissions.",
    color:    "from-emerald-500 to-teal-500",
    emoji:    "👥",
    btn:    "New User",
  },
};


export type ProfileMenuItem = {
  icon: string;   // key into Icon map
  label: string;
  sub: string;
};

export const PROFILE_MENU_ITEMS: ProfileMenuItem[] = [
  { icon: "Profile",  label: "View Profile",   sub: "Account details"        },
  { icon: "Settings", label: "Settings",       sub: "Preferences & security" },
  { icon: "Bell",     label: "Notifications",  sub: "Manage alerts"          },
  { icon: "Help",     label: "Help & Support", sub: "Docs and FAQs"          },
];
