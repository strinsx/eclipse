import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function POST() {
  try {
    const { supabase, applyCookies } = await createClient();
    await supabase.auth.signOut();
    const response = NextResponse.json({ success: true });
    applyCookies(response);
    return response;
  } catch {
    return NextResponse.json({ error: "Failed to sign out." }, { status: 500 });
  }
}
