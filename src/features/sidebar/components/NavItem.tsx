import { BRAND_PRIMARY } from "../constant";
import type { NavItemProps } from "../types";


export default function NavItem({ item, active, collapsed, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center rounded-xl transition-all duration-150 group relative
        ${collapsed ? "justify-center py-2.5 px-0" : "gap-3 px-3 py-2.5"}
        ${active
          ? "text-white"
          : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
        }`}
      style={active ? { backgroundColor: BRAND_PRIMARY } : {}}
    >
      <span className={`shrink-0 ${active ? "text-white" : "text-slate-400 group-hover:text-slate-700"}`}>
        {item.icon}
      </span>

      {!collapsed && (
        <span className="text-sm font-semibold flex-1 text-left truncate">
          {item.label}
        </span>
      )}

      {!collapsed && item.badge && (
        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full shrink-0 tabular-nums
          ${active ? "bg-white/25 text-white" : "bg-slate-100 text-slate-500"}`}>
          {item.badge}
        </span>
      )}

      {collapsed && item.badge && (
        <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${active ? "bg-white" : "bg-slate-400"}`} />
      )}

      {collapsed && (
        <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl z-50">
          {item.label}
          {item.badge && (
            <span className="ml-1.5 text-slate-400 font-normal">{item.badge}</span>
          )}
        </span>
      )}
    </button>
  );
}
