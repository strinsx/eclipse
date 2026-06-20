import {NextResponse} from "next/server";
import { createClient } from "@/app/lib/supabase/client";


export async function POST(request: Request) {
try {

  const { email, password, displayName } = await request.json();
  const supabase = await createClient();
  const user = await supabase.auth.signUp({
    email,
    password,
    displayName,
  });

    
} catch (error) {

    return NextResponse.json({ error: "An error occurred during signup." }, { status: 500 });
  }
    
}