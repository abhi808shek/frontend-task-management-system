import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  error?: string;
}

export default function TextArea({ label, id, error, ...props }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <textarea
        id={id}
        rows={3}
        {...props}
        className={`w-full px-3 py-2 rounded-lg border text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none
          ${error ? "border-red-400" : "border-slate-200"}
        `}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
