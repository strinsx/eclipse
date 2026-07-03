"use client"

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { ErrorCard } from "@/app/components/ui/ErrorCard";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function SignupPage() {
  const [form, setForm] = useState({ email: "", password: "", confirm: "", displayName: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const inputStyle = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(212,175,55,0.2)",
    color: "var(--foreground)",
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.border = "1px solid rgba(212,175,55,0.7)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(212,175,55,0.08)";
  };

  const blurStyle = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.border = "1px solid rgba(212,175,55,0.2)";
    e.currentTarget.style.boxShadow = "none";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
        displayName: form.displayName,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      setLoading(false);
      return;
    }

    window.location.href = "/auth/onboarding";
  };

  const labelClass = "text-xs font-semibold uppercase tracking-widest";
  const labelStyle = { color: "rgba(212,175,55,0.7)" };

  return (
    <div
      className={`${poppins.className} relative min-h-screen flex flex-col`}
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      {/* Background */}
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

      {/* Navbar */}
      <nav className="relative z-10 flex items-center px-6 md:px-12 py-5">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/eclipse.svg" alt="Eclipse Logo" width={36} height={36} />
          <span className="font-semibold text-xl md:text-2xl text-white">Eclipse</span>
        </Link>
      </nav>

      {/* Main */}
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
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Create account
            </h1>
            <p className="text-sm" style={{ color: "rgba(212,175,55,0.6)" }}>
              Start watching in seconds
            </p>
          </div>

          <ErrorCard message={error} />

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Name */}
            

            {/* Display Name */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="displayName" className={labelClass} style={labelStyle}>
                Display Name
              </label>
              <input
                id="displayName"
                type="text"
                autoComplete="nickname"
                required
                value={form.displayName}
                onChange={update("displayName")}
                placeholder="Your display name"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-white/25"
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className={labelClass} style={labelStyle}>
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-white/25"
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className={labelClass} style={labelStyle}>
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={form.password}
                onChange={update("password")}
                placeholder="Min. 8 characters"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-white/25"
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="confirm" className={labelClass} style={labelStyle}>
                Confirm Password
              </label>
              <input
                id="confirm"
                type="password"
                autoComplete="new-password"
                required
                value={form.confirm}
                onChange={update("confirm")}
                placeholder="••••••••"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder:text-white/25"
                style={inputStyle}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl py-3 text-sm font-semibold tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #b8962e 100%)",
                color: "#0B0B0F",
                boxShadow: "0 4px 20px rgba(212,175,55,0.25)",
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.boxShadow = "0 4px 28px rgba(212,175,55,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,175,55,0.25)";
              }}
            >
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.1)" }} />
            <span className="text-xs" style={{ color: "rgba(212,175,55,0.35)" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.1)" }} />
          </div>

          {/* Login link */}
          <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-semibold transition-colors"
              style={{ color: "var(--foreground)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 text-center py-6 text-xs"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        © {new Date().getFullYear()} Eclipse. All rights reserved.
      </footer>
    </div>
  );
}
