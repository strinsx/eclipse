import Image from "next/image";

interface Props {
    title: string;
    release_date: string;
    runtime: number;
    vote_average: number;
    overview: string;
    poster_path: string,
}

export function MovieInfo({ title, release_date, runtime, vote_average, overview, poster_path }: Props) {
    return (
        <div className="flex flex-col gap-3">
            <h1 className="text-foreground text-xl sm:text-2xl md:text-3xl font-bold">
                {title}
            </h1>

            <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm flex-wrap">

                <span className="flex items-center gap-1 text-amber-400">
                    ★ <span className="text-foreground/80">{vote_average.toFixed(1)}</span>
                </span>
                <span className="flex items-center gap-1 text-foreground/50">
                    🗓 {release_date.slice(0, 4)}
                </span>
                <span className="flex items-center gap-1 text-foreground/50">
                    🕐 {runtime} min
                </span>
            </div>

            <p className="text-foreground/60 text-sm leading-relaxed max-w-2xl">
                {overview}
            </p>
        </div>
    );
}