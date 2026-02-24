import {  MenuIcon } from "../../assets/icons/Icons";
import {  PAGE_META } from "../../features/sidebar/constant";
import type { TopBarProps } from "../../types";


const TopBar = ({ activePage, onMenuClick }: TopBarProps) => {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 shrink-0">
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl hover:bg-[#EBF4F6] text-slate-500 transition"
        >
          <MenuIcon />
        </button>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white text-lg">
              {/* ◈ */}
              {PAGE_META[activePage].emoji}
            </span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-none">{PAGE_META[activePage].title}</h1>
            <p className="text-xs text-slate-400">  {PAGE_META[activePage].subtitle}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
       {PAGE_META[activePage].btn && <button
          // onClick={onNewProject}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg transition-all active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        {PAGE_META[activePage].btn}
        </button>}

        {/* Avatar — mobile only
        <div className="md:hidden ml-1 w-8 h-8 rounded-xl bg-gradient-to-br from-[#9CD5FF] to-[#7AAACE] flex items-center justify-center text-white font-black text-xs shadow-sm cursor-pointer">
          {getInitials(CURRENT_USER.name)}
        </div> */}
      </div>
    </header>
  );
};

export default TopBar;