import type { ReactNode } from "react";

export type Page = "dashboard" | "projects" | "tasks" | "users";

export type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
};

export type User = {
  name: string;
  role: string;
  email: string;
};


export type PageMeta = {
  title: string;
  subtitle: string;
  color: string;
  emoji: string;
  btn?: string;
};


export type SidebarProps = {
  activePage: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onClose: () => void;
  isMobile: boolean;
};

export type UserPopupProps = {
  onClose: () => void;
  collapsed: boolean;
};

export type SidebarPageProps = {
  children: ReactNode;
}

export type UserProfileProps = {
  collapsed: boolean;
};

export type NavItemProps = {
  item: NavItem;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
};