"use client"

import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChild, faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/app/lib/supabase/client";
import AddProfileForm from "./AddProfileForm";
import ConfirmDialog from "./ConfirmDialog";
import EditProfileForm from "./EditProfileForm";
import { selectProfile } from "@/app/actions";

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
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [deletingProfile, setDeletingProfile] = useState<Profile | null>(null);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [actionProfileId, setActionProfileId] = useState<string | null>(null);
  const actionProfileIdRef = useRef<string | null>(null);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleActionIcons = (profileId: string) => {
    const next = actionProfileIdRef.current === profileId ? null : profileId;
    actionProfileIdRef.current = next;
    setActionProfileId(next);
  };

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

  useEffect(() => {
    fetchProfiles();
  }, [router]);

  const handleSelect = async (id: string) => {
    await selectProfile(id);
  };

  const handleDelete = (profile: Profile, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeletingProfile(profile);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProfile) return;
    const supabase = await createClient();
    await supabase.from("profiles").delete().eq("id", deletingProfile.id);
    setDeletingProfile(null);
    fetchProfiles();
  };

  const handleStartEdit = (profile: Profile, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingProfile(profile);
  };

  const handleSaveEdit = async (name: string) => {
    if (!editingProfile) return;
    const supabase = await createClient();
    await supabase.from("profiles").update({ name }).eq("id", editingProfile.id);
    setEditingProfile(null);
    fetchProfiles();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
        <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#D4AF37", borderTopColor: "transparent" }} />
      </div>
    );
  }

  if (showCreateForm) {
    return <AddProfileForm onSuccess={() => { setShowCreateForm(false); fetchProfiles(); }} />;
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

      <main
        onClick={() => {
          if (actionProfileIdRef.current) {
            actionProfileIdRef.current = null;
            setActionProfileId(null);
          }
        }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-12 gap-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
          Who&apos;s watching?
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
          {profiles.map((profile, index) => (
            <div
              key={profile.id}
              onClick={(e) => {
                if (actionProfileIdRef.current) {
                  e.stopPropagation();
                  toggleActionIcons(profile.id);
                  return;
                }
                handleSelect(profile.id);
              }}
              onTouchStart={() => {
                pressTimer.current = setTimeout(() => {
                  toggleActionIcons(profile.id);
                }, 500);
              }}
              onTouchEnd={() => {
                if (pressTimer.current) {
                  clearTimeout(pressTimer.current);
                  pressTimer.current = null;
                }
              }}
              onTouchMove={() => {
                if (pressTimer.current) {
                  clearTimeout(pressTimer.current);
                  pressTimer.current = null;
                }
              }}
              className="flex flex-col items-center gap-3 group transition-transform duration-200 hover:scale-105 cursor-pointer"
            >
              <div className="relative">
                <div
                  className={`w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-b ${getAvatarColor(index)} flex items-center justify-center shadow-lg transition-shadow duration-200 group-hover:shadow-xl group-hover:shadow-white/10`}
                >
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {getInitials(profile.name)}
                  </span>
                </div>

                <div className={`absolute -top-1 right-0 flex gap-10 transition-opacity ${
                  actionProfileId === profile.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}>
                  <button
                    onClick={(e) => handleStartEdit(profile, e)}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center backdrop-blur-sm transition-colors"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} className="text-xs text-white" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(profile, e)}
                    onTouchStart={(e) => e.stopPropagation()}
                    onTouchEnd={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-red-500/60 flex items-center justify-center backdrop-blur-sm transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} className="text-xs text-white" />
                  </button>
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
            </div>
          ))}

          <button
            onClick={() => setShowCreateForm(true)}
            className="flex flex-col items-center gap-3 group transition-transform duration-200 hover:scale-105"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center border-2 border-dashed border-white/20 group-hover:border-white/50 transition-colors bg-white/5">
              <FontAwesomeIcon icon={faPlus} className="text-2xl md:text-3xl text-white/40 group-hover:text-white/70 transition-colors" />
            </div>
            <span className="text-sm md:text-base text-white/40 group-hover:text-white/60 transition-colors">
              Add Profile
            </span>
          </button>
        </div>
      </main>

      <footer
        className="relative z-10 text-center py-6 text-xs"
        style={{ color: "rgba(255,255,255,0.2)" }}
      >
        &copy; {new Date().getFullYear()} Eclipse. All rights reserved.
      </footer>
      {deletingProfile && (
        <ConfirmDialog
          title="Delete Profile"
          message={`Are you sure you want to delete "${deletingProfile.name}"? This action cannot be undone.`}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeletingProfile(null)}
        />
      )}

      {editingProfile && (
        <EditProfileForm
          currentName={editingProfile.name}
          onSave={handleSaveEdit}
          onCancel={() => setEditingProfile(null)}
        />
      )}
    </div>
  );
}
