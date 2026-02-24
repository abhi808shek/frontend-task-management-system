import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
  error?: string;
}

export default function Input({ label, id, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition
          ${error ? "border-red-400" : "border-slate-200"}
          ${props.disabled ? "bg-slate-50 cursor-not-allowed" : ""}
        `}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
