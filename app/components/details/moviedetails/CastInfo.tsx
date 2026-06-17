import Image from "next/image";
import { MovieDetails } from "../../../types/movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface Props {
    genres: { id: number; name: string }[];
    release_date: string,
    runtime: number,
    vote_average: number,
    vote_count: number,
    popularity: number,
    revenue: number,
    production_countries: { iso_3166_1: string; name: string }[];
    production_companies: { id: number; name: string; logo_path: string | null }[];
    poster_path: string
}

export function MovieDetailsInfo({ poster_path, genres, release_date, runtime, vote_average, vote_count, popularity, revenue, production_countries, production_companies }: Props) {


    return (
        <div className="flex flex-col md:flex-row gap-5 mt-5">

            <div className="relative w-full max-w-[200px] sm:max-w-[300px] aspect-[3/4] flex-shrink-0 mx-auto md:mx-0 rounded-lg overflow-hidden">
                <Image src={`https://image.tmdb.org/t/p/original${poster_path}`} alt="poster_path" fill className="object-cover" />
            </div>

            <div className="flex flex-col gap-4 sm:gap-6 p-4">


            {/* Genres */}
            <div className="flex flex-col gap-2">
                <h3 className="text-foreground/40 text-xs uppercase tracking-widest">Genres</h3>
                <div className="flex flex-wrap gap-2">
                    {genres.map((g) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <span className="text-foreground/40 text-xs uppercase tracking-widest">Release Date</span>
                    <span className="text-foreground text-sm font-semibold">{release_date}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-foreground/40 text-xs uppercase tracking-widest">Runtime</span>
                    <span className="text-foreground text-sm font-semibold">{runtime} min</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-foreground/40 text-xs uppercase tracking-widest">Vote Average</span>
                    <span className="text-amber-400 text-sm font-semibold flex items-center gap-1"><FontAwesomeIcon icon={faStar} className="text-xs" /> {vote_average.toFixed(1)}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-foreground/40 text-xs uppercase tracking-widest">Vote Count</span>
                    <span className="text-foreground text-sm font-semibold">{vote_count.toLocaleString()}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-foreground/40 text-xs uppercase tracking-widest">Popularity</span>
                    <span className="text-foreground text-sm font-semibold">{popularity.toFixed(1)}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-foreground/40 text-xs uppercase tracking-widest">Revenue</span>
                    <span className="text-foreground text-sm font-semibold">${revenue.toLocaleString()}</span>
                </div>
            </div>

            {/* Production Countries */}
            <div className="flex flex-col gap-2">
                <h3 className="text-foreground/40 text-xs uppercase tracking-widest">Production Countries</h3>
                <div className="flex flex-wrap gap-2">
                    {production_countries.map((c) => (
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
                    {production_companies.map((company) => (
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

        </div>
    );
}