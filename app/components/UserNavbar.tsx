"use client"

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import Icon from "../../public/eclipse.svg";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHouse, faUser, faRightFromBracket, faList, faCircleUser } from "@fortawesome/free-solid-svg-icons";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export function UserNavbar({ displayName }: { displayName: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    redirect('/auth/login')
  };

  const menuItems = (
    <>
      <Link href="/watchlists" className="flex items-center gap-2 px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-white/5 transition">
        <FontAwesomeIcon icon={faList} className="text-xs" />
        Watchlists
      </Link>
      <Link href="/profiles" className="flex items-center gap-2 px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-white/5 transition">
        <FontAwesomeIcon icon={faCircleUser} className="text-xs" />
        Profiles
      </Link>
      <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-foreground/70 hover:text-foreground hover:bg-white/5 transition w-full text-left">
        <FontAwesomeIcon icon={faRightFromBracket} className="text-xs" />
        Logout
      </button>
    </>
  );

  return (
    <nav className={`${poppins.className} relative z-50 flex items-center px-4 md:px-10 py-4 md:py-6 m-2 md:m-4`}>

      {/* Left */}
      <div className="flex-1 flex items-center gap-2">
        <Image src={Icon} alt="Logo" width={36} height={36} />
        <Link href="/" className="font-semibold text-lg md:text-2xl text-white">Eclipse</Link>
      </div>

      {/* Center — desktop only */}
      <div className="hidden md:flex flex-1 items-center justify-center gap-6">

      </div>

      {/* Right — desktop */}
      <div className="flex-1 hidden md:flex items-center justify-end gap-4">
        <Link href="/" className="text-foreground/70 hover:text-foreground transition flex items-center gap-1.5">
          <FontAwesomeIcon icon={faHouse} className="text-sm" />
          Home
        </Link>
        <Link href="/homepage/search" className="text-foreground/70 flex items-center gap-2 flex-row-reverse hover:text-foreground transition"> Search
          <FontAwesomeIcon icon={faMagnifyingGlass} className="text-lg" />
        </Link>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
            className="flex items-center gap-1.5 text-sm text-foreground/70 hover:text-foreground transition"
          >
            <FontAwesomeIcon icon={faUser} className="text-xs" />
            {displayName}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-foreground/10 bg-background py-2 shadow-xl backdrop-blur-xl">
              {menuItems}
            </div>
          )}
        </div>
      </div>

      {/* Hamburger button — mobile only */}
      <button
        className="md:hidden flex flex-col justify-center gap-1.5 p-2"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`block h-0.5 w-6 bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile menu dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 z-50 bg-background border-t border-foreground/10 flex flex-col px-6 py-4 gap-4 md:hidden">
          <Link href="/" onClick={() => setMobileOpen(false)} className="text-foreground/70 hover:text-foreground transition text-sm flex items-center gap-1.5">
            <FontAwesomeIcon icon={faHouse} className="text-xs" />
            Home
          </Link>
          <Link href="/homepage/search" onClick={() => setMobileOpen(false)} className="text-foreground/70 hover:text-foreground transition text-sm">Search</Link>
          <div className="flex flex-col gap-2 text-foreground/70 text-sm">
            <span className="flex items-center gap-1.5 text-foreground">
              <FontAwesomeIcon icon={faUser} className="text-xs" />
              {displayName}
            </span>
            <div className="flex flex-col ml-1 border-l border-foreground/10 pl-3">
              <Link href="/watchlists" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1.5 hover:text-foreground transition">
                <FontAwesomeIcon icon={faList} className="text-xs" />
                Watchlists
              </Link>
              <Link href="/profiles" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-1.5 hover:text-foreground transition">
                <FontAwesomeIcon icon={faCircleUser} className="text-xs" />
                Profiles
              </Link>
              <button onClick={() => { setMobileOpen(false); handleLogout(); }} className="flex items-center gap-2 py-1.5 hover:text-foreground transition text-left">
                <FontAwesomeIcon icon={faRightFromBracket} className="text-xs" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
}
