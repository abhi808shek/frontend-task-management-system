import { useMemo } from "react";
import type { StatCardProps, StatsBarProps } from "../types";


function StatCard({ label, value, gradient, icon }: StatCardProps) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-4 text-white shadow-lg`}>
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-3xl font-black">{value}</div>
      <div className="text-xs text-white/80 mt-0.5 font-medium">{label}</div>
    </div>
  );
}


export default function StatsBar({ tasks }: StatsBarProps) {
  const stats = useMemo(
    () => ({
      total:      tasks.length,
      inProgress: tasks.filter((t) => t.status === "In Progress").length,
      done:       tasks.filter((t) => t.status === "Done").length,
      critical:   tasks.filter((t) => t.priority === "Critical").length,
    }),
    [tasks]
  );

  const cards: StatCardProps[] = [
    { label: "Total Tasks",  value: stats.total,      gradient: "from-orange-500 to-amber-500",  icon: "📋" },
    { label: "In Progress",  value: stats.inProgress, gradient: "from-blue-500 to-blue-600",     icon: "⚡" },
    { label: "Completed",    value: stats.done,       gradient: "from-emerald-500 to-teal-600",  icon: "✅" },
    { label: "Critical",     value: stats.critical,   gradient: "from-red-500 to-rose-600",      icon: "🔥" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {cards.map((c) => (
        <StatCard key={c.label} {...c} />
      ))}
    </div>
  );
}
