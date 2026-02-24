import { useMemo } from "react";
import type { Project } from "../types";

interface StatCardProps {
  label: string;
  value: number;
  color: string;
  icon: string;
}
interface StatsBarProps {
  projects: Project[];
}

function StatCard({ label, value, color, icon }: StatCardProps) {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-white shadow-lg`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-xs text-white/80 mt-0.5">{label}</div>
    </div>
  );
}


export default function StatsBar({ projects }: StatsBarProps) {
  const stats = useMemo(
    () => ({
      total: projects.length,
      inProgress: projects.filter((p) => p.status === "In Progress").length,
      completed: projects.filter((p) => p.status === "Completed").length,
      critical: projects.filter((p) => p.priority === "Critical").length,
    }),
    [projects]
  );

  const cards: StatCardProps[] = [
    { label: "Total Projects",   value: stats.total,      color: "from-indigo-500 to-indigo-600", icon: "📁" },
    { label: "In Progress",      value: stats.inProgress, color: "from-blue-500 to-blue-600",     icon: "⚡" },
    { label: "Completed",        value: stats.completed,  color: "from-emerald-500 to-emerald-600", icon: "✅" },
    { label: "Critical Priority",value: stats.critical,   color: "from-red-500 to-red-600",       icon: "🔥" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {cards.map((c) => (
        <StatCard key={c.label} {...c} />
      ))}
    </div>
  );
}
