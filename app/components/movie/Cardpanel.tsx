"use client"
import { useState, useEffect } from "react";
import { Carousel } from "../../types/movie";
import Link from "next/link";
import Image from "next/image";

export function CardPanel() {
    const [isLoading, setIsLoading] = useState(false);
    const [playing, setPlaying] = useState<Carousel[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3000/api/movies/playing');
            const data = await response.json();
            setPlaying(data.results.slice(5, 12));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? playing.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === playing.length - 1 ? 0 : prev + 1));
    };

    const currentMovie = playing[currentIndex];

    return (
        <div className="relative w-full h-64 sm:h-96 md:h-150 overflow-hidden rounded-xl group">
            {/* Loading */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
                    <p className="text-foreground text-md">Loading...</p>
                </div>
            )}

            {/* Slides */}
            {playing.map((movie, index) => (


                <div
                    key={movie.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        alt='backdrop'
                        fill
                        className="object-cover transition duration-300 saturate-80 group-hover:saturate-120"
                    />

                    {/* Top gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent z-10" />

                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />

                    {/* Side gradients */}
                    <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 z-10" />
                </div>

            ))}

            {/* Movie Info */}
            {currentMovie && (
                <div className="absolute bottom-14 left-8 z-20 max-w-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs uppercase tracking-widest text-foreground/60 border border-foreground/20 px-2 py-0.5 rounded-full">
                            {currentMovie.original_language.toUpperCase()}
                        </span>
                        <span className="text-xs text-foreground/50">
                            ★ {currentMovie.popularity.toFixed(1)}
                        </span>
                    </div>

                    <h2 className="text-foreground text-3xl font-bold mb-2 drop-shadow-lg">
                        {currentMovie.title}
                    </h2>

                    <p className="text-foreground/70 text-sm leading-relaxed line-clamp-2 mb-4">
                        {currentMovie.overview}
                    </p>

                    <div className="flex items-center gap-3">
                        <Link href={`/homepage/movies/${currentMovie.id}`}>
                            <button className="cursor-pointer flex items-center gap-2 bg-foreground text-background font-semibold px-5 py-2 rounded-full hover:opacity-90 transition text-sm">
                                ▶ Play Now
                            </button>
                        </Link>

                        <button className="cursor-pointer flex items-center gap-2 bg-foreground/10 backdrop-blur-sm text-foreground font-semibold px-5 py-2 rounded-full hover:bg-foreground/20 transition text-sm border border-foreground/20">
                            + Play Later
                        </button>
                    </div>
                </div>


            )}

            {/* Prev Button */}
            <button
                onClick={prevSlide}
                className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-20 bg-foreground/10 hover:bg-foreground/25 backdrop-blur-sm text-foreground rounded-full w-10 h-10 flex items-center justify-center transition border border-foreground/20"
            >
                ‹
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-20 bg-foreground/10 hover:bg-foreground/25 backdrop-blur-sm text-foreground rounded-full w-10 h-10 flex items-center justify-center transition border border-foreground/20"
            >
                ›
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {playing.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-foreground w-10" : "bg-foreground/40 w-2.5"
                            }`}
                    />
                ))}
            </div>

        </div>
    );
}