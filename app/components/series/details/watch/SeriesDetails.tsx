

interface Props {
    id: number;
    name: string;
    overview: string;
    number_of_seasons: number;
    number_of_episodes: number;
    genres: { id: number; name: string }[];
    first_air_date: string;
    vote_average: number;
    poster_path: string;
}

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export function SeriesDetailsInfo({
    id,
    name,
    overview,
    number_of_seasons,
    number_of_episodes,
    genres,
    first_air_date,
    vote_average,
    poster_path
}: Props) {
    const year = first_air_date?.slice(0, 4);

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full p-0 md:p-4 lg:p-6 rounded-lg md:rounded-xl bg-gradient-to-br from-foreground/5 to-transparent hover:from-foreground/10 transition-colors duration-300">
            {/* Poster Image - responsive sizing */}
            <div className="w-full sm:w-48 md:w-40 lg:w-56 relative aspect-[2/3] rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                    src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                    alt={name}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 w-full flex-1">
                {/* Title and Type */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-foreground text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                        {name}
                    </h1>
                    <p className="text-foreground/40 text-xs sm:text-xs uppercase tracking-widest font-semibold">
                        TV Series • {year}
                    </p>
                </div>

                {/* Genres - responsive wrap */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-foreground/40 text-xs uppercase tracking-widest font-semibold">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                        {genres.map((g) => (
                            <span
                                key={g.id}
                                className="text-xs px-2.5 sm:px-3 py-1 rounded-full border border-foreground/20 text-foreground/70 bg-foreground/5 hover:bg-foreground/10 hover:border-foreground/30 transition-all duration-200"
                            >
                                {g.name || "Unknown"}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats Grid - responsive columns */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {/* First Air Date */}
                    <div className="flex flex-col gap-1">
                        <span className="text-foreground/40 text-xs uppercase tracking-widest font-semibold">Year</span>
                        <span className="text-foreground text-sm sm:text-base font-semibold">{year}</span>
                    </div>

                    {/* Vote Average */}
                    <div className="flex flex-col gap-1">
                        <span className="text-foreground/40 text-xs uppercase tracking-widest font-semibold">Rating</span>
                        <span className="text-amber-400 text-sm sm:text-base font-semibold flex items-center gap-1">
                            <FontAwesomeIcon icon={faStar} className="text-xs" /> {vote_average.toFixed(1)}
                        </span>
                    </div>

                    {/* Seasons */}
                    <div className="flex flex-col gap-1">
                        <span className="text-foreground/40 text-xs uppercase tracking-widest font-semibold">Seasons</span>
                        <span className="text-foreground text-sm sm:text-base font-semibold">{number_of_seasons}</span>
                    </div>

                    {/* Episodes */}
                    <div className="flex flex-col gap-1">
                        <span className="text-foreground/40 text-xs uppercase tracking-widest font-semibold">Episodes</span>
                        <span className="text-foreground text-sm sm:text-base font-semibold">{number_of_episodes}</span>
                    </div>
                </div>

                {/* Overview - responsive text size */}
                <div className="flex flex-col gap-2 pt-2 md:pt-4">
                    <h3 className="text-foreground/40 text-xs uppercase tracking-widest font-semibold">Overview</h3>
                    <p className="text-foreground/70 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-4 md:line-clamp-none hover:line-clamp-none transition-all duration-300">
                        {overview}
                    </p>
                </div>
            </div>
        </div>
   );
}