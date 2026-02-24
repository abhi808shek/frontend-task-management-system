interface BadgeProps {
  label: string;
  style: string;
}

export default function Badge({ label, style }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style}`}
    >
      {label}
    </span>
  );
}
