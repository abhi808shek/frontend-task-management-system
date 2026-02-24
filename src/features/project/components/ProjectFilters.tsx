import { PRIORITIES, STATUSES } from "../constant";

interface ProjectFiltersProps {
  search: string;
  filterStatus: string;
  filterPriority: string;
  resultCount: number;
  onSearchChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onPriorityChange: (v: string) => void;
  onClear: () => void;
}

export default function ProjectFilters({
  search,
  filterStatus,
  filterPriority,
  resultCount,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onClear,
}: ProjectFiltersProps) {
  const hasFilters = !!(search || filterStatus || filterPriority);

  return (
    <div className="mb-6">
      {/* Controls row */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search projects, owners..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Status filter */}
        <select
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-700"
        >
          <option value="">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Priority filter */}
        <select
          value={filterPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-700"
        >
          <option value="">All Priorities</option>
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Results info row */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          {resultCount} project{resultCount !== 1 ? "s" : ""}{" "}
          {hasFilters ? "found" : "total"}
        </p>
        {hasFilters && (
          <button
            onClick={onClear}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
