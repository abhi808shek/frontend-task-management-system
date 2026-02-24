import { ROLES,STATUSES ,DEPARTMENTS} from "../constant";
import type { UserFiltersProps } from "../types";

export default function UserFilters({
  search, filterRole, filterStatus, filterDept,
  resultCount,
  onSearch, onRole, onStatus, onDept, onClear,
}: UserFiltersProps) {
  const hasFilters = !!(search || filterRole || filterStatus || filterDept);

  const dropdowns = [
    { value: filterRole,   onChange: onRole,   options: ROLES,       placeholder: "All Roles" },
    { value: filterStatus, onChange: onStatus, options: STATUSES,    placeholder: "All Statuses" },
    { value: filterDept,   onChange: onDept,   options: DEPARTMENTS, placeholder: "All Departments" },
  ];

  return (
    <div className="mb-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by name, email, job title..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Dropdowns */}
        {dropdowns.map(({ value, onChange, options, placeholder }) => (
          <select
            key={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm text-slate-700"
          >
            <option value="">{placeholder}</option>
            {options.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        ))}
      </div>

      {/* Result info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {resultCount} user{resultCount !== 1 ? "s" : ""}{" "}
          {hasFilters ? "found" : "total"}
        </p>
        {hasFilters && (
          <button
            onClick={onClear}
            className="text-xs text-teal-600 hover:text-teal-800 font-semibold"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
