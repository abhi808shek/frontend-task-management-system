export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarBg(name: string): string {
  const colors = [
    "bg-violet-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-cyan-500",
    "bg-pink-500",
    "bg-indigo-500",
  ];
  return colors[name.charCodeAt(0) % colors.length];
}
export const tokenService = {
  getAccess() {
    return localStorage.getItem("access_token");
  },

  getRefresh() {
    return localStorage.getItem("refresh_token");
  },

  setTokens(access: string, refresh: string) {
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
  },

  clear() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};