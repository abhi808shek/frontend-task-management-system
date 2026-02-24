import { useState } from "react";
import {  ChevronUpIcon } from "../../../assets/icons/Icons";
import UserPopup from "./UserPopup";
import { CURRENT_USER } from "../constant";
import Avatar from "../../../components/ui/Avatar";
import type { UserProfileProps } from "../types";



export default function UserProfile({ collapsed }: UserProfileProps) {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <div className={`border-t border-slate-100 relative ${collapsed ? "p-2" : "p-3"}`}>
      {popupOpen && (
        <UserPopup onClose={() => setPopupOpen(false)} collapsed={collapsed} />
      )}

      <button
        onClick={() => setPopupOpen(p => !p)}
        className={`w-full flex items-center rounded-xl transition-all duration-150 group
          ${collapsed ? "justify-center py-2.5 px-0" : "gap-3 px-3 py-2.5"}
          ${popupOpen ? "bg-slate-100" : "hover:bg-slate-50"}`}
      >
        <div className={`transition-transform group-hover:scale-105 ${collapsed ? "w-9 h-9 text-sm" : ""}`}>
          <Avatar
            name={CURRENT_USER.name}
            size={collapsed ? "sm" : "sm"}
          />
        </div>

        {!collapsed && (
          <div className="flex-1 text-left min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate leading-tight">
              {CURRENT_USER.name}
            </p>
            <p className="text-[10px] text-slate-400 truncate">{CURRENT_USER.role}</p>
          </div>
        )}

        {!collapsed && (
          <span className={`text-slate-400 transition-transform duration-200 ${popupOpen ? "rotate-180" : ""}`}>
            <ChevronUpIcon />
          </span>
        )}

        {collapsed && (
          <span className="absolute left-full ml-3 px-2.5 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl z-50">
            {CURRENT_USER.name}
          </span>
        )}
      </button>
    </div>
  );
}
