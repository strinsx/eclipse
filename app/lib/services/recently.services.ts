import { createClient } from "../supabase/client";
import { ContinueWatching } from "@/app/types/movie";

const MAX_RECENTLY_WATCHED = 15;
const UPDATE_THRESHOLD_MS = 32 * 60 * 1000;

export interface RecentlyInput {
  tmdb_id: number;
  media_type: "movie" | "tv";
  title: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  season_number?: number | null;
  episode_number?: number | null;
}

function getActiveProfileId(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)selected_profile_id=([^;]*)/);
  return match ? match[1] : null;
}

export function hasActiveProfile(): boolean {
  return getActiveProfileId() !== null;
}

async function insertRecentlyWatched(item: RecentlyInput): Promise<void> {
  const supabase = await createClient();
  const profileId = getActiveProfileId();
  if (!profileId) throw new Error("No active profile");

  const { error } = await supabase.from("recently_watched").insert({
    profile_id: profileId,
    tmdb_id: item.tmdb_id,
    media_type: item.media_type,
    title: item.title,
    overview: item.overview,
    backdrop_path: item.backdrop_path,
    release_date: item.release_date,
    season_number: item.season_number,
    episode_number: item.episode_number,
    updated_at: new Date().toISOString(),
  });

  if (error) throw error;
}

async function enforceRateLimit(): Promise<void> {
  const supabase = await createClient();
  const profileId = getActiveProfileId();
  if (!profileId) return;

  const { count } = await supabase
    .from("recently_watched")
    .select("*", { count: "exact", head: true })
    .eq("profile_id", profileId);

  if (count && count > MAX_RECENTLY_WATCHED) {
    const { data: oldest } = await supabase
      .from("recently_watched")
      .select("id")
      .eq("profile_id", profileId)
      .order("updated_at", { ascending: true })
      .limit(count - MAX_RECENTLY_WATCHED);

    if (oldest && oldest.length > 0) {
      await supabase
        .from("recently_watched")
        .delete()
        .in(
          "id",
          oldest.map((o) => o.id)
        );
    }
  }
}

export async function addToRecentlyWatched(item: RecentlyInput): Promise<void> {
  const supabase = await createClient();
  const profileId = getActiveProfileId();
  if (!profileId) return;

  const threshold = new Date(Date.now() - UPDATE_THRESHOLD_MS).toISOString();

  const { data: existing } = await supabase
    .from("recently_watched")
    .select("id, updated_at")
    .eq("profile_id", profileId)
    .eq("tmdb_id", item.tmdb_id)
    .eq("media_type", item.media_type)
    .maybeSingle();

  if (existing) {
    if (existing.updated_at >= threshold) {
      await supabase
        .from("recently_watched")
        .update({ updated_at: new Date().toISOString() })
        .eq("id", existing.id);
      return;
    }
    await supabase
      .from("recently_watched")
      .update({
        title: item.title,
        overview: item.overview,
        backdrop_path: item.backdrop_path,
        release_date: item.release_date,
        season_number: item.season_number,
        episode_number: item.episode_number,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);
    return;
  }

  await insertRecentlyWatched(item);
  await enforceRateLimit();
}

export async function getSeriesProgress(
  tmdbId: number
): Promise<{ season: number; episode: number } | null> {
  const supabase = await createClient();
  const profileId = getActiveProfileId();
  if (!profileId) return null;

  const { data } = await supabase
    .from("recently_watched")
    .select("season_number, episode_number")
    .eq("profile_id", profileId)
    .eq("tmdb_id", tmdbId)
    .eq("media_type", "tv")
    .maybeSingle();

  if (!data || !data.season_number) return null;

  return {
    season: data.season_number,
    episode: data.episode_number ?? 1,
  };
}

export async function getRecentlyWatched(): Promise<ContinueWatching[]> {
  const supabase = await createClient();
  const profileId = getActiveProfileId();
  if (!profileId) return [];

  const { data } = await supabase
    .from("recently_watched")
    .select("*")
    .eq("profile_id", profileId)
    .order("updated_at", { ascending: false });

  return (data ?? []).map((item) => ({
    id: item.tmdb_id,
    title: item.title,
    overview: item.overview ?? "",
    poster_path: item.backdrop_path ?? "",
    backdrop_path: item.backdrop_path ?? "",
    release_date: item.release_date ?? "",
    season_number: item.season_number ?? 0,
    episode_number: item.episode_number ?? 0,
    updated_at: item.updated_at,
  }));
}

export async function removeFromRecentlyWatched(
  tmdbId: number,
  mediaType: string
): Promise<void> {
  const supabase = await createClient();
  const profileId = getActiveProfileId();
  if (!profileId) throw new Error("No active profile");

  const { error } = await supabase
    .from("recently_watched")
    .delete()
    .eq("profile_id", profileId)
    .eq("tmdb_id", tmdbId)
    .eq("media_type", mediaType);

  if (error) throw error;
}