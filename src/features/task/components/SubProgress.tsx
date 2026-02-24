import { getSubTaskProgress } from "../utils";
import type { SubProgressProps } from "../types";
import { memo } from "react";


const SubProgress = memo(({ subTasks }: SubProgressProps) => {
  if (!subTasks?.length) return null;

  const { done, total, pct } = getSubTaskProgress(subTasks);

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
        {done}/{total}
      </span>
    </div>
  );
});

export default SubProgress;