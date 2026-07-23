import { createClient } from "../supabase/client";
import { WatchLaterItem } from "@/app/types/movie";

function getActiveProfileId(): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(?:^|;\s*)selected_profile_id=([^;]*)/);
    return match ? match[1] : null;
}

export async function getWatchlist(): Promise<(WatchLaterItem & { media_type: string })[]> {
    const supabase = await createClient();
    const profileId = getActiveProfileId();
    if (!profileId) return [];

    const { data } = await supabase
        .from("watchlists")
        .select("tmdb_id, media_type, title, overview, poster_path, release_date")
        .eq("profile_id", profileId)
        .order("created_at", { ascending: false });

    return (data ?? []).map((item) => ({
        id: item.tmdb_id,
        title: item.title,
        overview: item.overview ?? "",
        poster_path: item.poster_path ?? "",
        release_date: item.release_date ?? "",
        media_type: item.media_type,
    }));
}

export async function addToWatchlist(item: WatchLaterItem, mediaType: string = "movie") {
    const supabase = await createClient();
    const profileId = getActiveProfileId();
    if (!profileId) throw new Error("No active profile");

    const { error } = await supabase
        .from("watchlists")
        .insert({
            profile_id: profileId,
            tmdb_id: item.id,
            media_type: mediaType,
            title: item.title,
            overview: item.overview,
            poster_path: item.poster_path,
            release_date: item.release_date || null,
        });

    if (error && error.code !== "23505") throw error;
}

export async function removeFromWatchlist(tmdbId: number, mediaType: string = "movie") {
    const supabase = await createClient();
    const profileId = getActiveProfileId();
    if (!profileId) throw new Error("No active profile");

    const { error } = await supabase
        .from("watchlists")
        .delete()
        .eq("profile_id", profileId)
        .eq("tmdb_id", tmdbId)
        .eq("media_type", mediaType);

    if (error) throw error;
}

export async function isWatchlisted(tmdbId: number, mediaType: string = "movie"): Promise<boolean> {
    const supabase = await createClient();
    const profileId = getActiveProfileId();
    if (!profileId) return false;

    const { data } = await supabase
        .from("watchlists")
        .select("id")
        .eq("profile_id", profileId)
        .eq("tmdb_id", tmdbId)
        .eq("media_type", mediaType)
        .maybeSingle();

    return !!data;
}
