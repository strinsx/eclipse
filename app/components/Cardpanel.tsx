"use client"
import { useState, useEffect } from "react";
import { Carousel } from "../types/movie";
import Image from "next/image";

export function CardPanel() {
    const [isLoading, setIsLoading] = useState(false);
    const [playing, setPlaying] = useState<Carousel[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:3000/api/playing');
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

    return (
        <div className="relative w-full h-150 overflow-hidden rounded-xl">

            {/* Loading */}
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                    <p className="text-white text-lg font-semibold">Loading...</p>
                </div>
            )}

            {/* Slides */}
            {playing.map((movie, index) => (
                <div
                    key={movie.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                        index === currentIndex ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <Image
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        alt='backdrop'
                        fill
                        className="object-cover"
                    />

                    {/* Top gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10" />

                    {/* Bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />

                    {/* Side gradients */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10" />
                </div>
            ))}

            {/* Prev Button */}
            <button
                onClick={prevSlide}
                className="absolute curosr-pointer left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white rounded-full w-10 h-10 flex items-center justify-center transition border border-white/20"
            >
                ‹
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white rounded-full w-10 h-10 flex items-center justify-center transition border border-white/20"
            >
                ›
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {playing.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === currentIndex ? "bg-white w-10" : "bg-white/40 w-2.5"
                        }`}
                    />
                ))}
            </div>

        </div>
    );
}