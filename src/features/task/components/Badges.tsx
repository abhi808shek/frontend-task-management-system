import { PRIORITY_CFG, STATUS_CFG, TYPE_CFG } from "../constant";
import type {  TypeBadgeProps, PriorityBadgeProps, StatusBadgeProps } from "../types";

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const c = STATUS_CFG[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border ${c.bg} ${c.text} ${c.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {status}
    </span>
  );
};

export const PriorityBadge = ({ priority }: PriorityBadgeProps) => {
  const c = PRIORITY_CFG[priority];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border ${c.bg} ${c.text} ${c.border}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {priority}
    </span>
  );
};

export const TypeBadge = ({ type }: TypeBadgeProps) => {
  const c = TYPE_CFG[type];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${c.color}`}
    >
      {c.icon} {type}
    </span>
  );
};