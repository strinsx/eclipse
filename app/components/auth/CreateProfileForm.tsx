"use client"

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createProfile, getUserProfileId } from "@/app/lib/services/profile.services";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function CreateProfileForm() {
  const [name, setName] = useState("");
  const [isKidsProfile, setIsKidsProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    setError("");

    try {
      const userProfileId = await getUserProfileId();
      if (!userProfileId) throw new Error("User profile not found");

      await createProfile(name.trim(), isKidsProfile);
      router.push("/auth/onboarding/profile-selection");
    } catch {
      setError("Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const initials = name ? name.slice(0, 2).toUpperCase() : "?";

  return (
    <div
      className={`${poppins.className} relative min-h-screen flex flex-col`}
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/public_backdrop.svg"
          alt="Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background" />
      </div>

      <nav className="relative z-10 flex items-center px-6 md:px-12 py-5">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/eclipse.svg" alt="Eclipse Logo" width={36} height={36} />
          <span className="font-semibold text-xl md:text-2xl text-white">Eclipse</span>
        </Link>
      </nav>

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-12">
        <div
          className="w-full max-w-md rounded-2xl px-8 py-10 md:px-10 md:py-12 flex flex-col gap-6"
          style={{
            background: "rgba(11, 11, 15, 0.82)",
            border: "1px solid rgba(212, 175, 55, 0.12)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.6), 0 1px 0 rgba(212,175,55,0.08) inset",
          }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-gray-500 to-gray-700 flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">{initials}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Create your profile
            </h1>
            <p className="text-sm text-center" style={{ color: "rgba(212,175,55,0.6)" }}>
              Set up a profile to personalise your experience
            </p>
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="name"
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "rgba(212,175,55,0.7)" }}
              >
                Profile Name
              </label>
              <input
                id="name"
                type="text"
                required
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex"
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

            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={isKidsProfile}
                  onChange={(e) => setIsKidsProfile(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border transition-all duration-200 flex items-center justify-center ${
                    isKidsProfile
                      ? "border-[#D4AF37] bg-[#D4AF37]"
                      : "border-white/20 bg-transparent group-hover:border-white/40"
                  }`}
                >
                  {isKidsProfile && (
                    <svg className="w-3 h-3 text-[#0B0B0F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                Child profile
              </span>
            </label>

            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="mt-2 w-full rounded-xl py-3 text-sm font-semibold tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #b8962e 100%)",
                color: "#0B0B0F",
                boxShadow: "0 4px 20px rgba(212,175,55,0.25)",
              }}
              onMouseEnter={(e) => {
                if (!loading && name.trim()) e.currentTarget.style.boxShadow = "0 4px 28px rgba(212,175,55,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,175,55,0.25)";
              }}
            >
              {loading ? "Creating…" : "Create Profile"}
            </button>
          </form>
        </div>
      </main>

      <footer
        className="relative z-10 text-center py-6 text-xs"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        &copy; {new Date().getFullYear()} Eclipse. All rights reserved.
      </footer>
    </div>
  );
}
