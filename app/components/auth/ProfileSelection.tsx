"use client"

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChild } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/app/lib/supabase/client";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

type Profile = {
  id: string;
  name: string;
  is_kids_profile: boolean;
};

const avatarColors = [
  "from-red-500 to-red-700",
  "from-green-500 to-green-700",
  "from-blue-500 to-blue-700",
  "from-yellow-500 to-yellow-700",
  "from-purple-500 to-purple-700",
  "from-pink-500 to-pink-700",
  "from-teal-500 to-teal-700",
  "from-orange-500 to-orange-700",
];

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function getAvatarColor(index: number) {
  return avatarColors[index % avatarColors.length];
}

export default function ProfileSelection() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfiles() {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data: userProfile } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (!userProfile) {
        router.push("/auth/onboarding");
        return;
      }

      const { data: allProfiles } = await supabase
        .from("profiles")
        .select("id, name, is_kids_profile")
        .eq("user_profile_id", userProfile.id);

      setProfiles(allProfiles ?? []);
      setLoading(false);
    }
    fetchProfiles();
  }, [router]);

  const handleSelect = (id: string) => {
    router.push("/homepage");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }} />
      </div>
    );
  }

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

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 gap-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Who&apos;s watching?
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {profiles.map((profile, index) => (
            <button
              key={profile.id}
              onClick={() => handleSelect(profile.id)}
              className="flex flex-col items-center gap-3 group transition-transform duration-200 hover:scale-105"
            >
              <div className="relative">
                <div
                  className={`w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-b ${getAvatarColor(index)} flex items-center justify-center shadow-lg transition-shadow duration-200 group-hover:shadow-xl group-hover:shadow-white/10`}
                >
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {getInitials(profile.name)}
                  </span>
                </div>
                {profile.is_kids_profile && (
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-md">
                    <FontAwesomeIcon icon={faChild} className="text-xs text-[#0B0B0F]" />
                  </div>
                )}
              </div>
              <span className="text-sm md:text-base text-white/60 group-hover:text-white transition-colors">
                {profile.name}
              </span>
            </button>
          ))}

          <Link
            href="/auth/onboarding"
            className="flex flex-col items-center gap-3 group transition-transform duration-200 hover:scale-105"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center border-2 border-dashed border-white/20 group-hover:border-white/50 transition-colors bg-white/5">
              <FontAwesomeIcon icon={faPlus} className="text-2xl md:text-3xl text-white/40 group-hover:text-white/70 transition-colors" />
            </div>
            <span className="text-sm md:text-base text-white/40 group-hover:text-white/60 transition-colors">
              Add Profile
            </span>
          </Link>
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
