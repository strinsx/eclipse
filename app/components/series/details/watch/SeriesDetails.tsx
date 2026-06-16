

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
        <div className="flex mt-10 items-center gap-10">



            <div className="relative w-[200px] h-[300px] rounded-xl overflow-hidden flex-shrink-0">
                <Image
                    src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                    alt={name}
                    fill
                    className="object-cover"
                />
            </div>


            <div className="flex flex-col gap-6 p-4">

                <div className="flex flex-col gap-1">
                    <h1 className="text-foreground text-2xl font-bold">{name}</h1>
                    <p className="text-foreground/40 text-xs uppercase tracking-widest">Series</p>
                </div>

                {/* Genres */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-foreground/40 text-xs uppercase tracking-widest">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                        {genres.map((g) => (
                            <span
                                key={g.id}
                                className="text-xs px-3 py-1 rounded-full border border-foreground/20 text-foreground/70"
                            >
                                {g.name || "series name"}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-foreground/40 text-xs uppercase tracking-widest">First Air Date</span>
                        <span className="text-foreground text-sm font-semibold">{year}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-foreground/40 text-xs uppercase tracking-widest">Vote Average</span>
                        <span className="text-amber-400 text-sm font-semibold">★ {vote_average.toFixed(1)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-foreground/40 text-xs uppercase tracking-widest">Seasons</span>
                        <span className="text-foreground text-sm font-semibold">{number_of_seasons}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-foreground/40 text-xs uppercase tracking-widest">Episodes</span>
                        <span className="text-foreground text-sm font-semibold">{number_of_episodes}</span>
                    </div>
                </div>




                {/* Overview */}
                <div className="flex flex-col gap-2">
                    <h3 className="text-foreground/40 text-xs uppercase tracking-widest">Overview</h3>
                    <p className="text-foreground/70 text-sm leading-relaxed">{overview}</p>
                </div>

            </div>


        </div>


    );
}