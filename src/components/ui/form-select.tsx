import { Controller } from "react-hook-form";
import { cn } from "../../lib/utils";
import type { FormSelectProps } from "../../features/auth/types/auth.type";



const FormSelect = ({ name, control, label, options }:  FormSelectProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <div className="flex flex-col gap-1.5">
        <label className="text-xs sm:text-sm font-medium text-stone-400 ml-1">{label}</label>

        <select
          {...field}
          className={cn(
            "w-full rounded-xl border border-stone-800 py-3 sm:py-3.5 px-4 text-sm sm:xs text-gray-600 transition-all",
            "focus:border-[var(--brand-primary)]/60 focus:ring-4 focus:ring-[var(--brand-primary)]/20 outline-none hover:border-stone-700",
            error && "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10"
          )}
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        {error && <span className="text-[11px] sm:text-xs text-red-400 ml-1">{error.message}</span>}
      </div>
    )}
  />
);

export default FormSelect;