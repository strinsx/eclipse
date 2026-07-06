

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const API_KEY = process.env.TMDB_KEY;

const certParam = "&certification_country=US&certification.lte=PG";

async function kidSuffix(): Promise<string> {
    try {
        const cookieStore = await cookies();
        const profileId = cookieStore.get("selected_profile_id")?.value;
        if (!profileId) return "";

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_PUBLISHABLE_KEY!,
            { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
        );

        const { data } = await supabase
            .from("profiles")
            .select("is_kids_profile")
            .eq("id", profileId)
            .single();

        const isKids = data?.is_kids_profile ?? false;
        console.log("isKidsProfile:", isKids, "| profileId:", profileId, "| data:", data);
        return isKids ? certParam : "";
    } catch {
        return "";
    }
}

export async function getPopularTV() {
    const suffix = await kidSuffix();
    const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1${suffix}`)
    const data = await response.json();
    return (data);
}

export async function getTrendingTV() {
    const suffix = await kidSuffix();
    const url = suffix
        ? `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US${suffix}`
        : `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=en-US&page=1`;
    const response = await fetch(url);
    const data = await response.json();
    return (data);
}

export async function onAirTV() {
    const suffix = await kidSuffix();
    const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1${suffix}`)
    const data = await response.json();
    return (data);
}

export async function getDetails(id: number) {
    const suffix = await kidSuffix();
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US&page=1${suffix}`)
    const data = await response.json();
    return (data);
}

export async function getSeries(title: string) {
    const suffix = await kidSuffix();
    const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${title}&api_key=${API_KEY}&include_adult=false&language=en-US&page=1${suffix}`)
    const data = await response.json()
    return (data)
}

export async function getSimilar(id: number) {
    const suffix = await kidSuffix();
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1${suffix}`)
    const data = await response.json();
    return (data.results);
}

export async function getSeasonDetail(tvId: number, seasonNumber: number) {
    const suffix = await kidSuffix();
    const response = await fetch(`https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}${suffix}`)
    return await response.json()
}