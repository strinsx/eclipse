import Image from "next/image";
import Link from "next/link";

interface Series {
    id: number;
    name: string;
    vote_average: number;
    poster_path: string;
    first_air_date: string;
}

interface Props {
    series: Series[];
}

export function SimilarSeriesGrid({ series }: Props) {
    if (!series || !Array.isArray(series)) return null;

    return (
        <div className="py-6">
            <h2 className="text-foreground font-bold text-lg mb-4 flex items-center gap-2">
                <span>📺</span> Similar Series
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
                {series.slice(0, 12).map((s) => (
                    <Link href={`/homepage/series/${s.id}/onboarding`} key={s.id}>
                        <div className="group flex flex-col cursor-pointer">
                            <div className="relative overflow-hidden rounded-xl aspect-[2/3]">
                                {s.poster_path ? (
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w300${s.poster_path}`}
                                        alt={s.name}
                                        fill
                                        className="object-cover transition duration-300 saturate-60 group-hover:saturate-100 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-foreground/10 flex items-center justify-center text-foreground/20">
                                        
                                    </div>
                                )}

                                {/* Rating badge */}
                                <div className="absolute top-2 right-2 z-10 bg-background/70 backdrop-blur-sm text-amber-400 text-xs font-semibold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                                    ★ {s.vote_average.toFixed(1)}
                                </div>
                            </div>

                            <div className="pt-1.5 px-0.5">
                                <p className="text-foreground text-xs font-semibold line-clamp-1">{s.name}</p>
                                <p className="text-foreground/40 text-xs">{s.first_air_date?.slice(0, 4)}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
