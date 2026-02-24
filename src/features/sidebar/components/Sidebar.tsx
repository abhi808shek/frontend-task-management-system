import NavItem from "./NavItem";
import UserProfile from "./UserProfile";
import { NAV_ITEMS } from "../constant";
import type { SidebarProps } from "../types";
import { ChevronLeftIcon, CloseIcon } from "../../../assets/icons/Icons";
import { useNavigate } from "react-router";

export default function Sidebar({
  activePage,
  onNavigate,
  collapsed,
  onToggleCollapse,
  onClose,
  isMobile,
}: SidebarProps) {
const navigate = useNavigate()
  const handleNav = (id: string) => {
    console.log("Navigating to:", id);
    console.log("Navigating activePage:", activePage);
    onNavigate(id as typeof activePage);
    navigate(`/${id}`)
    if (isMobile) onClose();
  };

  return (
    <aside
      className={`flex flex-col h-full bg-white border-r border-slate-200 select-none transition-all duration-300 ease-in-out
        ${collapsed ? "w-[68px]" : "w-60"}`}
    >
      <div className={`flex items-center h-16 border-b border-slate-100 shrink-0 ${collapsed ? "justify-center" : "px-5 gap-3"}`}>

        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-black text-sm shadow-md shadow-orange-200/60 shrink-0">
          ✦
        </div>

        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-slate-900 tracking-tight leading-none">FlowSpace</p>
            <p className="text-[10px] text-slate-400 font-medium mt-0.5">Workspace</p>
          </div>
        )}

        {!isMobile && !collapsed && (
          <button
            onClick={onToggleCollapse}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
            title="Collapse sidebar"
          >
            <ChevronLeftIcon />
          </button>
        )}

        {isMobile && !collapsed && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors"
            title="Close sidebar"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      {!isMobile && collapsed && (
        <button
          onClick={onToggleCollapse}
          className="mx-auto mt-3 w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-700 flex items-center justify-center transition-colors"
          title="Expand sidebar"
        >
          <span className="rotate-180"><ChevronLeftIcon /></span>
        </button>
      )}

      {!collapsed && (
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-5 pt-5 pb-1.5">
          Menu
        </p>
      )}

      <nav className={`flex-1 overflow-y-auto py-2 space-y-0.5 ${collapsed ? "px-2" : "px-3"}`}>
        {NAV_ITEMS.map(item => (
          <NavItem
            key={item.id}
            item={{ ...item, icon: <item.icon /> }}
            active={activePage === item.id}
            collapsed={collapsed}
            onClick={() => handleNav(item.id)}
          />
        ))}
      </nav>

      <UserProfile collapsed={collapsed} />
    </aside>
  );
}
