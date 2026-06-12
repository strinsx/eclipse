import Image from "next/image";
import Link from "next/link";

interface Props {
    id: number;
    name: string;
    tagline?: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
    genres: { id: number; name: string }[];
    number_of_seasons: number;
    number_of_episodes: number;
}

export function SeriesHeader({
    id,
    name,
    tagline,
    overview,
    poster_path,
    backdrop_path,
    first_air_date,
    vote_average,
    vote_count,
    genres,
    number_of_seasons,
    number_of_episodes,
}: Props) {
    const year = first_air_date?.slice(0, 4);

    return (
        <div className="relative w-full min-h-[500px] overflow-hidden rounded-xl">

            {/* Backdrop image */}
            <Image
                src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
                alt={name}
                fill
                className="object-cover object-top saturate-160"
                priority
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex gap-6 p-8 pt-16 items-end min-h-[500px]">

                {/* Poster */}
                <div className="flex-shrink-0 w-[200px] h-[350px] relative rounded-xl overflow-hidden shadow-2xl hidden sm:block">
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2 flex-1 min-w-0 pb-2">

                    {/* Badges */}
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-semibold uppercase tracking-wide">
                            TV Series
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold flex items-center gap-1">
                            ⭐ Top Rated
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-white text-4xl font-bold leading-tight drop-shadow-lg">
                        {name}
                    </h1>

                    {/* Tagline */}
                    {tagline && (
                        <p className="text-foreground/50 text-sm italic">"{tagline}"</p>
                    )}

                    {/* Meta row */}
                    <div className="flex items-center gap-3 text-xs text-foreground/60 flex-wrap">
                        <span className="flex items-center gap-1 bg-amber-500/20 text-amber-400 font-bold px-2 py-0.5 rounded-md">
                            ★ {vote_average.toFixed(1)}
                            <span className="text-amber-400/60 font-normal">/10</span>
                        </span>
                        <span>📅 {year}</span>
                        <span>🎞 {number_of_seasons} Season{number_of_seasons !== 1 ? "s" : ""}</span>
                        <span>📺 {number_of_episodes} Episodes</span>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2">
                        {genres.map((g) => (
                            <span
                                key={g.id}
                                className="text-xs px-3 py-0.5 rounded-full border border-foreground/20 text-foreground/60"
                            >
                                {g.name}
                            </span>
                        ))}
                    </div>

                    {/* Overview */}
                    <p className="text-foreground/70 text-sm leading-relaxed line-clamp-2 max-w-2xl">
                        {overview}
                    </p>

                    {/* Action buttons */}
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                        <Link href={`/homepage/series/${id}/watch`}>
                            <button className="flex items-center cursor-pointer gap-2 bg-foreground hover:bg-foreground/50 text-white font-semibold px-5 py-2 rounded-full transition text-sm">
                                ▶ Watch Now
                            </button>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
