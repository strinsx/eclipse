import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const { supabase, applyCookies } = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      {
        user: data.user,
        session: data.session,
      },
      { status: 200 }
    );
    applyCookies(response);
    return response;

  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "An error occurred during login.";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}