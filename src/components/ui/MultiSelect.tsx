import Avatar from "./Avatar";

interface MultiSelectProps {
  label: string;
  id: string;
  options: string[];
  value: string[];
  onChange: (selected: string[]) => void;
  error?: string;
}

export default function MultiSelect({
  label,
  options,
  value,
  onChange,
  error,
}: MultiSelectProps) {
  const toggle = (opt: string) => {
    onChange(
      value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt]
    );
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">{label}</label>

      {/* Scrollable checkbox list */}
      <div
        className={`rounded-lg border p-2 max-h-40 overflow-y-auto ${
          error ? "border-red-400" : "border-slate-200"
        }`}
      >
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-slate-50 text-sm"
          >
            <input
              type="checkbox"
              checked={value.includes(opt)}
              onChange={() => toggle(opt)}
              className="accent-indigo-600"
            />
            <Avatar name={opt} />
            <span className="text-slate-700">{opt}</span>
          </label>
        ))}
      </div>

      {/* Selected chips */}
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {value.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full border border-indigo-200"
            >
              {v}
              <button
                onClick={() => toggle(v)}
                className="hover:text-indigo-900 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
