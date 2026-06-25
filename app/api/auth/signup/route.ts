import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, password, displayName } = await request.json();

    const { supabase, applyCookies } = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    if (error) {
      console.error(error);
      return Response.json({ error: error.message }, { status: 400 });
    }

    if (data.user) {
      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert({
          user_id: data.user.id,
          email: data.user.email,
          display_name: displayName,
        });

      if (profileError) {
        console.error(profileError);
      }
    }

    const response = NextResponse.json({ user: data.user }, { status: 201 });
    applyCookies(response);
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : "An error occurred during signup.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
} 