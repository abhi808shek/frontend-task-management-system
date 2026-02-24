import { getAvatarBg, getInitials } from "../../utility";

interface AvatarProps {
  name: string;
  size?: "sm" | "md";
}

export default function Avatar({ name, size = "sm" }: AvatarProps) {
  const sizeClass = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";

  return (
    <div
      className={`${sizeClass} ${getAvatarBg(name)} rounded-full flex items-center justify-center text-white font-semibold ring-2 ring-white`}
    >
      {getInitials(name)}
    </div>
  );
}
