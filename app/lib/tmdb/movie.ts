

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const API_KEY = process.env.TMDB_KEY;

const certParam = "&certification_country=US&certification.lte=PG";

export async function isKidsProfile(): Promise<boolean> {
    try {
        const cookieStore = await cookies();
        const profileId = cookieStore.get("selected_profile_id")?.value;
        if (!profileId) return false;

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
        return isKids;
    } catch {
        return false;
    }
}

async function kidSuffix(): Promise<string> {
    const kids = await isKidsProfile();
    return kids ? certParam : "";
}

export async function getFamilyMovies() {
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${randomPage}&certification_country=US&certification.lte=PG`);
    return res.json();
}


const randomPage = Math.floor(Math.random() * 10 + 1);


export async function getPopularMovies() {
    const suffix = await kidSuffix();
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc${suffix}`);
    return res.json();
}

export async function getGenres() {
    const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`);
    return res.json();
}

export async function getSimilar(movieId: number) {
    const suffix = await kidSuffix();
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1${suffix}`);
    const data = await res.json();
    return data.results;
}

export async function getDetails(movieId: number) {
    const suffix = await kidSuffix();
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US${suffix}`);
    return res.json();
}

export async function getCredits(movieId: number) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`);
    const data = await res.json();
    return data.cast;
}

export async function getMovie(title: string) {
    const suffix = await kidSuffix();
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${API_KEY}&include_adult=false&language=en-US&page=${randomPage}${suffix}`);
    return res.json();
}

export async function nowPlaying() {
    const suffix = await kidSuffix();
    const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1${suffix}`);
    return res.json();
}

export async function Trending() {
    const suffix = await kidSuffix();
    const url = suffix
        ? `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US${suffix}`
        : `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(url);
    return res.json();
}

export async function getTopRated() {
    const suffix = await kidSuffix();
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&page=1${suffix}`);
    return res.json();
}