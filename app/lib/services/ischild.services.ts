import { createClient } from "../supabase/client";

function getActiveProfileId(): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(?:^|;\s*)selected_profile_id=([^;]*)/);
    return match ? match[1] : null;
}

export async function isKidsProfile(): Promise<boolean> {
    const profileId = getActiveProfileId();
    if (!profileId) return false;

    const supabase = await createClient();
    const { data } = await supabase
        .from("profiles")
        .select("is_kids_profile")
        .eq("id", profileId)
        .single();

    const result = data?.is_kids_profile ?? false;
    return result;
}

export const KIDS_CERTIFICATION = "certification_country=US&certification.lte=PG";

export async function getCertSuffix(): Promise<string> {
    const kids = await isKidsProfile();
    return kids ? `&${KIDS_CERTIFICATION}` : "";
}
