import type { SectionLabelProps } from "../types";

export const SectionLabel =({ icon, text, count }: SectionLabelProps) =>{
  return (
    <div className="flex items-center gap-2">
      <span className="w-6 h-6 rounded-lg bg-orange-100 flex items-center justify-center text-sm">
        {icon}
      </span>
      <span className="text-sm font-black text-slate-700">{text}</span>
      {count !== undefined && count > 0 && (
        <span className="text-xs font-bold bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full">
          {count}
        </span>
      )}
    </div>
  );
}
export default SectionLabel