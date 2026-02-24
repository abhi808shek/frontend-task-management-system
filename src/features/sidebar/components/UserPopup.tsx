import { useRef, useEffect } from "react";
import type { UserPopupProps } from "../types";
import Avatar from "../../../components/ui/Avatar";
import { CURRENT_USER, PROFILE_MENU_ITEMS } from "../constant";
import { IconMap, LogoutIcon } from "../../../assets/icons/Icons";

export default function UserPopup({ onClose, collapsed }: UserPopupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={`absolute bottom-full mb-2 z-50 bg-white rounded-2xl border border-slate-200 overflow-hidden
        ${collapsed ? "left-full ml-2 w-64" : "left-2 right-2"}`}
      style={{ boxShadow: "0 8px 40px -4px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.04)" }}
    >
      <div className="px-4 py-4 bg-slate-50 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <Avatar name={CURRENT_USER.name} size="md" />
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800 truncate">{CURRENT_USER.name}</p>
            <p className="text-xs text-slate-500 truncate">{CURRENT_USER.email}</p>
          </div>
        </div>
        <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs text-emerald-700 font-semibold">{CURRENT_USER.role}</span>
        </div>
      </div>

      <div className="py-1.5">
        {PROFILE_MENU_ITEMS.map(item => {
          const ItemIcon = IconMap[item.icon];
          return (
            <button
              key={item.label}
              onClick={onClose}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 transition-colors group text-left"
            >
              <span className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors shrink-0">
                {ItemIcon && <ItemIcon />}
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-700">{item.label}</p>
                <p className="text-xs text-slate-400">{item.sub}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="border-t border-slate-100 py-1.5">
        <button
          onClick={onClose}
          className="w-full flex items-center gap-3 px-3 py-2 hover:bg-red-50 transition-colors group text-left"
        >
          <span className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-red-100 flex items-center justify-center text-slate-500 group-hover:text-red-500 transition-colors shrink-0">
            <LogoutIcon />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-700 group-hover:text-red-600">Sign Out</p>
            <p className="text-xs text-slate-400">See you next time</p>
          </div>
        </button>
      </div>
    </div>
  );
}
