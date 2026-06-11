"use client"

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import Icon from "../../public/eclipse.svg";
import { useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`${poppins.className} relative flex items-center px-4 md:px-10 py-4 md:py-6 m-2 md:m-4`}>

      {/* Left */}
      <div className="flex-1 flex items-center gap-2">
        <Image src={Icon} alt="Logo" width={36} height={36} />
        <Link href="/" className="font-semibold text-lg md:text-2xl">Eclipse</Link>
      </div>

      {/* Center — desktop only */}
      <div className="hidden md:flex flex-1 items-center justify-center gap-6">
        <Link href="/" className="text-foreground/70 hover:text-foreground transition">Home</Link>
        <Link href="/genre" className="text-foreground/70 hover:text-foreground transition">Movies</Link>
        <Link href="/genre" className="text-foreground/70 hover:text-foreground transition">TV Shows</Link>
      </div>

      <div className="flex-1 hidden md:block" />

      {/* Hamburger button — mobile only */}
      <button
        className="md:hidden flex flex-col justify-center gap-1.5 p-2"
        onClick={() => setOpen(!open)}
      >
        <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${open ? "opacity-0" : ""}`} />
        <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu dropdown */}
      {open && (
        <div className="absolute top-full left-0 right-0 z-50 bg-background border-t border-foreground/10 flex flex-col px-6 py-4 gap-4 md:hidden">
          <Link href="/" onClick={() => setOpen(false)} className="text-foreground/70 hover:text-foreground transition text-sm">Home</Link>
          <Link href="/genre" onClick={() => setOpen(false)} className="text-foreground/70 hover:text-foreground transition text-sm">Movies</Link>
          <Link href="/genre" onClick={() => setOpen(false)} className="text-foreground/70 hover:text-foreground transition text-sm">TV Shows</Link>
        </div>
      )}

    </nav>
  );
}