

export interface Movie {
    id: number,
    title: string,
    overview: string,
    popularity: number,
    vote_average: number,
    media_type: string,
    poster_path: string,
    release_date: string,
}

export interface Carousel {

    id: number,
    title: string,
    original_language: string,
    overview: string,
    popularity: number,
    backdrop_path: string,
    media_type: string,

}

export interface MovieDetails {
    id: number,
    title: string,
    overview: string,
    tagline: string,
    popularity: number,
    vote_average: number,
    vote_count: number,
    runtime: number,
    status: string,
    media_type: string,
    poster_path: string,
    backdrop_path: string,
    release_date: string,
    revenue: number,
    budget: number,
    original_language: string,
    genres: { id: number, name: string }[],
    production_companies: { id: number, name: string, logo_path: string, origin_country: string }[],
    production_countries: { iso_3166_1: string, name: string }[],
    belongs_to_collection: { id: number, name: string, poster_path: string, backdrop_path: string } | null,
}

export interface WatchLaterItem {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
}

export interface ContinueWatching {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    season_number: number;
    episode_number: number;
    updated_at: string;
}

