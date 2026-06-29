import { cookies } from "next/headers";
import { createClient } from "@/app/lib/supabase/server";

import { GuestNavbar } from "./GuestNavbar";
import { UserNavbar } from "./UserNavbar";

export default async function Navbar() {
  const { supabase } = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <GuestNavbar />;
  }

  const { data: userProfile } = await supabase
    .from("user_profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (!userProfile) {
    return <GuestNavbar />;
  }

  const cookieStore = await cookies();
  const selectedProfileId = cookieStore.get("selected_profile_id")?.value;

  if (selectedProfileId) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", selectedProfileId)
      .eq("user_profile_id", userProfile.id)
      .single();

    if (profile) {
      return <UserNavbar displayName={profile.name} />;
    }
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("name")
    .eq("user_profile_id", userProfile.id)
    .limit(1)
    .single();

  if (!profile) {
    return <GuestNavbar />;
  }

  return <UserNavbar displayName={profile.name} />;
}