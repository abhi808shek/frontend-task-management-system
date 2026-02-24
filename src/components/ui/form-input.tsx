import { Controller } from "react-hook-form";
import { cn } from "../../lib/utils";
import type { FormInputProps } from "../../types/formInput.type";

export function FormInput<TFieldValues extends Record<string, any>>(
  props: FormInputProps<TFieldValues>
) {
  const {
    name,
    control,
    label,
    type = "text",
    placeholder,
    autoComplete,
    leftIcon,
    rightElement,
  } = props;

  return (
    <Controller
      name={name as any}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs sm:text-sm font-medium text-stone-400 ml-1">
            {label}
          </label>

          <div className="relative group">
            {leftIcon && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500">
                {leftIcon}
              </div>
            )}

            <input
              {...field}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              onChange={(e) => {
                const value =
                  type === "number" ? Number(e.target.value) : e.target.value;
                field.onChange(value);
              }}
              className={cn(
                "w-full rounded-xl text-gray-600 border border-stone-800 py-3 sm:py-3.5 px-11 text-sm sm:xs  transition-all",
                "focus:border-orange-500/60 focus:ring-4 focus:ring-orange-500/20 outline-none hover:border-stone-700",
                error &&
                  "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/10"
              )}
            />

            {rightElement && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {rightElement}
              </div>
            )}
          </div>

          {error && (
            <span className="text-[11px] sm:text-xs text-red-400 ml-1">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
}

export default FormInput;