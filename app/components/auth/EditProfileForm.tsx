"use client"

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function EditProfileForm({
  currentName,
  onSave,
  onCancel,
}: {
  currentName: string;
  onSave: (name: string) => Promise<void>;
  onCancel: () => void;
}) {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setError("");
    try {
      await onSave(name.trim());
    } catch {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
              <FontAwesomeIcon icon={faPenToSquare} className="text-lg text-[#D4AF37]" />
            </div>
            <h2 className="text-lg font-semibold text-white">Edit Profile</h2>
          </div>
          <button
            onClick={onCancel}
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} className="text-sm text-white/60" />
          </button>
        </div>

        {error && (
          <div
            className="text-sm px-4 py-3 rounded-lg"
            style={{
              background: "rgba(220,38,38,0.15)",
              border: "1px solid rgba(220,38,38,0.35)",
              color: "#fca5a5",
            }}
          >
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="edit-name"
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "rgba(212,175,55,0.7)" }}
          >
            Profile Name
          </label>
          <input
            id="edit-name"
            type="text"
            required
            maxLength={20}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); if (e.key === "Escape") onCancel(); }}
            placeholder="Profile name"
            autoFocus
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-white/25"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(212,175,55,0.2)",
              color: "var(--foreground)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1px solid rgba(212,175,55,0.7)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.08)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = "1px solid rgba(212,175,55,0.2)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        <div className="flex gap-3 mt-1">
          <button
            onClick={onCancel}
            disabled={loading}
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
            onClick={handleSubmit}
            disabled={loading || !name.trim()}
            className="flex-1 rounded-xl py-2.5 text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(135deg, #D4AF37 0%, #b8962e 100%)",
              color: "#0B0B0F",
              boxShadow: "0 4px 16px rgba(212,175,55,0.25)",
            }}
            onMouseEnter={(e) => {
              if (!loading && name.trim()) e.currentTarget.style.boxShadow = "0 4px 24px rgba(212,175,55,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(212,175,55,0.25)";
            }}
          >
            {loading ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
