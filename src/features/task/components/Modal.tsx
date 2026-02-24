import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  width?: string;
  children: React.ReactNode;
};

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  width = "max-w-3xl",
  children,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className={`relative w-full ${width} bg-white rounded-3xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden`}
      >
        <div
          className="px-7 py-5 border-b border-slate-100 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg,#fff7ed,#ffffff)" }}
        >
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-100 text-slate-400 hover:text-orange-600 transition text-xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
