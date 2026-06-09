import Image from "next/image";
import { MovieDetails } from "../../../types/movie";

const mockMovie: MovieDetails = {
    id: 11,
    title: "Star Wars",
    overview: "Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire.",
    tagline: "A long time ago in a galaxy far, far away...",
    popularity: 20.6912,
    vote_average: 8.2,
    vote_count: 22061,
    runtime: 121,
    status: "Released",
    media_type: "movie",
    poster_path: "/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg",
    backdrop_path: "/2w4xG178RpB4MDAIfTkqAuSJzec.jpg",
    release_date: "1977-05-25",
    revenue: 775398007,
    budget: 11000000,
    original_language: "en",
    genres: [
        { id: 12, name: "Adventure" },
        { id: 28, name: "Action" },
        { id: 878, name: "Science Fiction" },
    ],
    production_companies: [
        { id: 1, name: "Lucasfilm Ltd.", logo_path: "/tlVSws0RvvtPBwViUyOFAO0vcQS.png", origin_country: "US" },
        { id: 25, name: "20th Century Fox", logo_path: "/qZCc1lty5FzX30aOCVRBLzaVmcp.png", origin_country: "US" },
    ],
    production_countries: [
        { iso_3166_1: "US", name: "United States of America" },
    ],
    belongs_to_collection: {
        id: 10,
        name: "Star Wars Collection",
        poster_path: "/pWVLFh4OuejTpUaDQbB1C4zoS2p.jpg",
        backdrop_path: "/iY2ujEY2m68OTTlPFTiHub9joHS.jpg",
    },
};

export function MovieDetailsInfo() {
    const movie = mockMovie;

    return (
        <div className="flex flex-col gap-6 p-4">

            {/* Genres */}
            <div className="flex flex-col gap-2">
                <h3 className="text-foreground/40 text-xs uppercase tracking-widest">Genres</h3>
                <div className="flex flex-wrap gap-2">
                    {movie.genres.map((g) => (
                        <span
                            key={g.id}
                            className="text-xs px-3 py-1 rounded-full border border-foreground/20 text-foreground/70"
                        >
                            {g.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-foreground/40 text-xs uppercase tracking-widest">Release Date</span>
                    <span className="text-foreground text-sm font-semibold">{movie.release_date}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-foreground/40 text-xs uppercase tracking-widest">Runtime</span>
                    <span className="text-foreground text-sm font-semibold">{movie.runtime} min</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-foreground/40 text-xs uppercase tracking-widest">Vote Average</span>
                    <span className="text-amber-400 text-sm font-semibold">★ {movie.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-foreground/40 text-xs uppercase tracking-widest">Vote Count</span>
                    <span className="text-foreground text-sm font-semibold">{movie.vote_count.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-foreground/40 text-xs uppercase tracking-widest">Popularity</span>
                    <span className="text-foreground text-sm font-semibold">{movie.popularity.toFixed(1)}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-foreground/40 text-xs uppercase tracking-widest">Revenue</span>
                    <span className="text-foreground text-sm font-semibold">${movie.revenue.toLocaleString()}</span>
                </div>
            </div>

            {/* Production Countries */}
            <div className="flex flex-col gap-2">
                <h3 className="text-foreground/40 text-xs uppercase tracking-widest">Production Countries</h3>
                <div className="flex flex-wrap gap-2">
                    {movie.production_countries.map((c) => (
                        <span
                            key={c.iso_3166_1}
                            className="text-xs px-3 py-1 rounded-full border border-foreground/20 text-foreground/70"
                        >
                            {c.name}
                        </span>
                    ))}
                </div>
            </div>

            {/* Production Companies */}
            <div className="flex flex-col gap-3">
                <h3 className="text-foreground/40 text-xs uppercase tracking-widest">Production Companies</h3>
                <div className="flex flex-wrap gap-4">
                    {movie.production_companies.map((company) => (
                        <div key={company.id} className="flex items-center gap-2">
                            {company.logo_path && (
                                <div className="relative w-10 h-10 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                        alt={company.name}
                                        fill
                                        className="object-contain p-1"
                                    />
                                </div>
                            )}
                            <span className="text-foreground/60 text-xs">{company.name}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}