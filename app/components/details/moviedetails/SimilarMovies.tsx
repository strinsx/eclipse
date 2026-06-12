import Image from "next/image";
import Link from "next/link";

interface Movie {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
}

interface Props {
    movies: Movie[];
}

export function SimilarMovies({ movies }: Props) {

     if (!movies || !Array.isArray(movies)) return null; 

    return (
        <div className="flex flex-col gap-3 w-full">
            <h2 className="text-foreground font-bold text-sm flex items-center gap-2">
                <span className="text-blue-400">🎬</span> Similar Movies
            </h2>

            <div className="flex flex-col gap-3">
                {movies.slice(0,6).map((s) => (

                    <Link href={`/homepage/movies/${s.id}/onboarding`} key={s.id}>

                    
                    <div
                        key={s.id}
                        className="group flex items-center gap-3 cursor-pointer hover:bg-foreground/5 rounded-xl p-2 transition"
                    >
                        <div className="relative w-16 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                            <Image
                                src={`https://image.tmdb.org/t/p/w200${s.poster_path}`}
                                alt={s.title}
                                fill
                                className="object-cover saturate-60 group-hover:saturate-160 transition duration-300"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-foreground text-sm font-semibold line-clamp-2">
                                {s.title}
                            </h3>
                            <span className="text-amber-400 text-xs flex items-center gap-1">
                                ★ {s.vote_average.toFixed(1)}
                            </span>
                        </div>
                    </div>

                   </Link>
                ))}
            </div>
        </div>
    );
}