import { getMovie } from "@/app/lib/tmdb/movie";
import { getSeries } from "@/app/lib/tmdb/tv";
import { NextRequest } from "next/server";

interface TmdbItem {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    release_date?: string;
    first_air_date?: string;
    overview?: string;
    popularity?: number;
    vote_average?: number;
}

interface TmdbResponse {
    results?: TmdbItem[];
}

interface SearchResult {
    id: number;
    title: string;
    poster_path: string | null;
    media_type: "movie" | "tv";
    release_date?: string;
    first_air_date?: string;
    overview?: string;
    popularity?: number;
    vote_average?: number;
}

export async function GET(request: NextRequest) {
    try {
        const query = request.nextUrl.searchParams.get("query");
        if (!query) {
            return Response.json({ results: [] });
        }

        const [movieData, seriesData] = await Promise.all([
            getMovie(query) as Promise<TmdbResponse>,
            getSeries(query) as Promise<TmdbResponse>,
        ]);

        const movies: SearchResult[] = (movieData.results || []).map((m) => ({
            ...m,
            media_type: "movie" as const,
            title: m.title || "",
        }));

        const series: SearchResult[] = (seriesData.results || []).map((s) => ({
            ...s,
            media_type: "tv" as const,
            title: s.name || "",
        }));

        const combined = [...movies, ...series];

        return Response.json({ results: combined });
    } catch {
        return Response.json({ error: "Search failed" }, { status: 500 });
    }
}
