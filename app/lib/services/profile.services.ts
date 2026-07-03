import { createClient } from "../supabase/client";

export async function hasProfiles() {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return false;

    const { data } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

    if (!data) return false;

    const { count } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("user_profile_id", data.id);

    return (count ?? 0) > 0;
}

export async function getUserProfileId() {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) return null;

    const { data } = await supabase
        .from("user_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single();

    return data?.id ?? null;
}

export async function getProfileCount() {
    const supabase = await createClient();

    const userProfileId = await getUserProfileId();
    if (!userProfileId) return 0;

    const { count } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("user_profile_id", userProfileId);

    return count ?? 0;
}

const MAX_PROFILES = 4;

export async function createProfile(name: string, is_kids_profile: boolean) {
    const supabase = await createClient();

    const userProfileId = await getUserProfileId();
    if (!userProfileId) throw new Error("User profile not found");

    const currentCount = await getProfileCount();
    if (currentCount >= MAX_PROFILES) {
        throw new Error(`You can only have up to ${MAX_PROFILES} profiles.`);
    }

    const { data, error } = await supabase
        .from("profiles")
        .insert({
            user_profile_id: userProfileId,
            name,
            is_kids_profile,
            created_at: new Date().toISOString(),
        })
        .select("id")
        .single();

    if (error) throw error;
    return data;
}