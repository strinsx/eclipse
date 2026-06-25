import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export type AuthCookie = {
  name: string;
  value: string;
  options: Record<string, unknown>;
};

export const createClient = async () => {
  const cookieStore = await cookies();
  const pendingCookies: AuthCookie[] = [];
  let pendingHeaders: Record<string, string> = {};

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet, headers) => {
          pendingCookies.splice(0, pendingCookies.length, ...cookiesToSet);
          pendingHeaders = headers;
        },
      },
    }
  );

  const applyCookies = (response: NextResponse) => {
    for (const { name, value, options } of pendingCookies) {
      response.cookies.set(name, value, options);
    }
    for (const [key, value] of Object.entries(pendingHeaders)) {
      response.headers.set(key, value);
    }
  };

  return { supabase, applyCookies };
};
