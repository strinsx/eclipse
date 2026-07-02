"use client"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Delete",
  isLoading = false,
}: {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  isLoading?: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.6)" }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl px-6 py-8 flex flex-col gap-5"
        style={{
          background: "rgba(11, 11, 15, 0.92)",
          border: "1px solid rgba(212, 175, 55, 0.12)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.6)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <FontAwesomeIcon icon={faTriangleExclamation} className="text-lg text-red-400" />
            </div>
            <h2 className="text-lg font-semibold text-white">{title}</h2>
          </div>
          <button
            onClick={onCancel}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="text-sm text-white/60" />
          </button>
        </div>

        <p className="text-sm text-white/60 leading-relaxed">{message}</p>

        <div className="flex gap-3 mt-1">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 rounded-xl py-2.5 text-sm font-medium transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "var(--foreground)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
              color: "white",
              boxShadow: "0 4px 16px rgba(220,38,38,0.3)",
            }}
            onMouseEnter={(e) => {
              if (!isLoading) e.currentTarget.style.boxShadow = "0 4px 24px rgba(220,38,38,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(220,38,38,0.3)";
            }}
          >
            {isLoading ? "Deleting…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
