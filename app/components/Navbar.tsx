import { createClient } from "@/app/lib/supabase/server";

import { GuestNavbar } from "./GuestNavbar";
import { UserNavbar } from "./UserNavbar";

export default async function Navbar() {
  const { supabase } = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("USER:", user); // Is user null?


  if (!user) {
    return <GuestNavbar />;
  }

const { data: profile, error } = await supabase
  .from("user_profiles")
  .select("display_name")
  .eq("user_id", user.id)
  .single();

if (error || !profile) {
  return <GuestNavbar />;
}

return <UserNavbar displayName={profile.display_name} />;
}