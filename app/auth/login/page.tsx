"use client"

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { useState } from "react";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Invalid email or password.");
            } else {
                window.location.href = "/homepage";
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`${poppins.className} relative min-h-screen flex flex-col`}
            style={{ background: "var(--background)", color: "var(--foreground)" }}
        >
            {/* Background SVG */}
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

            {/* Main content */}
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
                            Welcome back
                        </h1>
                        <div className="flex gap-1">
                            <p className="text-sm" style={{ color: "rgba(212,175,55,0.6)" }}>
                                Sign in to continue watching or
                            </p>
                            <Link href={'/homepage'}><p className="text-sm text-foreground">watch for free</p></Link>
                        </div>
                    </div>

                    {/* Error */}
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

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label
                                htmlFor="email"
                                className="text-xs font-semibold uppercase tracking-widest"
                                style={{ color: "rgba(212,175,55,0.7)" }}
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
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

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="text-xs font-semibold uppercase tracking-widest"
                                    style={{ color: "rgba(212,175,55,0.7)" }}
                                >
                                    Password
                                </label>
                                <Link
                                    href="/auth/forgot-password"
                                    className="text-xs transition-colors"
                                    style={{ color: "rgba(212,175,55,0.5)" }}
                                    onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(212,175,55,1)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(212,175,55,0.5)")}
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
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
                            {loading ? "Signing in…" : "Sign In"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.1)" }} />
                        <span className="text-xs" style={{ color: "rgba(212,175,55,0.35)" }}>or</span>
                        <div className="flex-1 h-px" style={{ background: "rgba(212,175,55,0.1)" }} />
                    </div>

                    {/* Sign up link */}
                    <p className="text-center text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                        New to Eclipse?{" "}
                        <Link
                            href="/auth/signup"
                            className="font-semibold transition-colors"
                            style={{ color: "var(--foreground)" }}
                            onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--foreground)")}
                        >
                            Create an account
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
