"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function selectProfile(profileId: string) {
  const cookieStore = await cookies();
  cookieStore.set("selected_profile_id", profileId, {
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });
  redirect("/homepage");
}
