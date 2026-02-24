import type { FieldProps, FIProps, FSProps, FTProps } from "../types";


export const FL = ({ label, error, children }: FieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export const FI = ({ label, error, ...props }: FIProps) => {
  return (
    <FL label={label} error={error}>
      <input
        {...props}
        className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition placeholder:text-slate-300
          ${error ? "border-red-300" : "border-slate-200"}
        `}
      />
    </FL>
  );
};
export const FT = ({ label, error, ...props }: FTProps) => {
  return (
    <FL label={label} error={error}>
      <textarea
        rows={3}
        {...props}
        className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition resize-none placeholder:text-slate-300
          ${error ? "border-red-300" : "border-slate-200"}
        `}
      />
    </FL>
  );
};

export const FS = ({ label, options, error, ...props }: FSProps) => {
  return (
    <FL label={label} error={error}>
      <select
        {...props}
        className={`w-full px-3 py-2.5 rounded-xl border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition
          ${error ? "border-red-300" : "border-slate-200"}
          ${!props.value ? "text-slate-400" : "text-slate-800"}
        `}
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-slate-800">
            {o}
          </option>
        ))}
      </select>
    </FL>
  );
};