import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faStar } from "@fortawesome/free-solid-svg-icons";

interface Movie {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
    release_date: string;
}

interface Props {
    movies: Movie[];
}

export function SimilarMoviesGrid({ movies }: Props) {
    if (!movies || !Array.isArray(movies)) return null;

    return (
        <div className="py-6">
            <h2 className="text-foreground font-bold text-lg mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faFilm} className="text-lg" /> Similar Movies
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {movies.slice(0, 12).map((m) => (
                    <Link href={`/homepage/movies/${m.id}/onboarding`} key={m.id}>
                        <div className="group flex flex-col cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl aspect-[2/3]">
                                {m.poster_path ? (
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w300${m.poster_path}`}
                                        alt={m.title}
                                        fill
                                        className="object-cover transition duration-300 saturate-60 group-hover:saturate-100 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-foreground/10 flex items-center justify-center text-foreground/20">
                                        <FontAwesomeIcon icon={faFilm} className="text-foreground/20 text-lg" />
                                    </div>
                                )}

                                {/* Rating badge */}
                                <div className="absolute top-2 right-2 z-10 bg-background/70 backdrop-blur-sm text-amber-400 text-xs font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                    <FontAwesomeIcon icon={faStar} className="text-xs" /> {m.vote_average.toFixed(1)}
                                </div>
                            </div>

                            <div className="pt-1.5 px-0.5">
                                <p className="text-foreground text-xs font-semibold line-clamp-1">{m.title}</p>
                                <p className="text-foreground/40 text-xs">{m.release_date?.slice(0, 4)}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
