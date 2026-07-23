"use client"
import { useState, useEffect, useRef } from "react";
import { Carousel } from "../../types/movie";
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlay } from "@fortawesome/free-solid-svg-icons";
import { WatchLaterButton } from "@/app/components/ui/WatchLaterButton";

export function CardPanel() {
    const [isLoading, setIsLoading] = useState(false);
    const [playing, setPlaying] = useState<Carousel[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const dragStartX = useRef(0);
    const isPointerDown = useRef(false);
    const isDragActive = useRef(false);
    const dragOffsetRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/movies/playing');
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

    const SWIPE_THRESHOLD = 50;

    const handleDragStart = (clientX: number) => {
        isPointerDown.current = true;
        isDragActive.current = false;
        dragOffsetRef.current = 0;
        setDragOffset(0);
        dragStartX.current = clientX;
    };

    const handleDragMove = (clientX: number) => {
        if (!isPointerDown.current) return;
        const offset = clientX - dragStartX.current;
        dragOffsetRef.current = offset;
        setDragOffset(offset);
        if (!isDragActive.current && Math.abs(offset) > 5) {
            isDragActive.current = true;
            setIsDragging(true);
        }
    };

    const handleDragEnd = () => {
        if (!isPointerDown.current) return;
        isPointerDown.current = false;

        if (isDragActive.current) {
            isDragActive.current = false;
            setIsDragging(false);

            if (Math.abs(dragOffsetRef.current) >= SWIPE_THRESHOLD) {
                if (dragOffsetRef.current > 0) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            }
        }
        setDragOffset(0);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? playing.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === playing.length - 1 ? 0 : prev + 1));
    };

    const getPrevIndex = (i: number) => (i === 0 ? playing.length - 1 : i - 1);
    const getNextIndex = (i: number) => (i === playing.length - 1 ? 0 : i + 1);

    const currentMovie = playing[currentIndex];

    const renderMovieInfo = (movie: Carousel | undefined, opacity: number) => {
        if (!movie) return null;
        return (
            <div
                className="absolute bottom-10 sm:bottom-14 left-4 sm:left-8 z-30 max-w-lg select-none"
                style={{ opacity }}
            >
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase tracking-widest text-white/60 border border-white/20 px-2 py-0.5 rounded-full">
                        {movie.original_language.toUpperCase()}
                    </span>
                    <span className="text-xs text-white/50">
                        <FontAwesomeIcon icon={faStar} className="text-amber-400 mr-1" />{movie.popularity.toFixed(1)}
                    </span>
                </div>

                <h2 className="text-white text-lg sm:text-2xl md:text-3xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
                    {movie.title}
                </h2>

                <p className="text-white/70 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4">
                    {movie.overview}
                </p>

                <div className="flex items-center gap-3">
                    <Link href={`/homepage/movies/${movie.id}/onboarding`}>
                        <button className="cursor-pointer flex items-center gap-2 bg-white text-background font-semibold px-3 sm:px-5 py-1.5 sm:py-2 rounded-xl transition-transform duration-200 hover:-translate-y-1 text-xs sm:text-sm">
                            <FontAwesomeIcon icon={faPlay} className="text-xs" /> Play Now
                        </button>
                    </Link>

                    <WatchLaterButton id={movie.id} title={movie.title} overview={movie.overview} poster_path={(movie as any).poster_path ?? ""} release_date={(movie as any).release_date ?? ""} mediaType="movie" className="bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 border border-white/20" />
                </div>
            </div>
        );
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full h-56 sm:h-80 md:h-96 lg:h-150 overflow-hidden rounded-xl group select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
            onMouseDown={(e) => handleDragStart(e.clientX)}
            onMouseMove={(e) => handleDragMove(e.clientX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
            onTouchEnd={handleDragEnd}
            style={{ userSelect: "none" }}
        >
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
                    <p className="text-white/80 text-md">Loading...</p>
                </div>
            )}

            {/* Slides — idle */}
            {!isDragging && playing.map((movie, index) => (
                <div
                    key={movie.id}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <Image
                        src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                        alt='backdrop'
                        fill
                        draggable={false}
                        className="object-cover saturate-80 group-hover:saturate-120 pointer-events-none select-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 z-10" />
                </div>
            ))}

            {/* Slides — dragging, static crossfade by threshold */}
            {isDragging && (() => {
                const width = containerRef.current?.clientWidth || 1;
                const frac = Math.max(-1, Math.min(1, dragOffset / width));
                const prevIdx = getPrevIndex(currentIndex);
                const nextIdx = getNextIndex(currentIndex);

                if (frac < 0) {
                    const progress = Math.abs(frac);
                    return (
                        <>
                            <div className="absolute inset-0" style={{ zIndex: 10, opacity: 1 - progress, transition: "none" }}>
                                <Image
                                    src={`https://image.tmdb.org/t/p/w1280${playing[currentIndex].backdrop_path}`}
                                    alt='backdrop'
                                    fill
                                    draggable={false}
                                    className="object-cover saturate-80 group-hover:saturate-120 pointer-events-none select-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent z-10" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 z-10" />
                            </div>
                            <div
                                key={playing[nextIdx].id}
                                className="absolute inset-0"
                                style={{
                                    zIndex: 20,
                                    opacity: progress,
                                    transition: "none",
                                }}
                            >
                                <Image
                                    src={`https://image.tmdb.org/t/p/w1280${playing[nextIdx].backdrop_path}`}
                                    alt='backdrop'
                                    fill
                                    draggable={false}
                                    className="object-cover saturate-80 group-hover:saturate-120 pointer-events-none select-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent z-10" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 z-10" />
                            </div>
                        </>
                    );
                } else {
                    const progress = Math.abs(frac);
                    return (
                        <>
                            <div
                                key={playing[currentIndex].id + "-outgoing"}
                                className="absolute inset-0"
                                style={{
                                    zIndex: 15,
                                    opacity: 1 - progress,
                                    transition: "none",
                                }}
                            >
                                <Image
                                    src={`https://image.tmdb.org/t/p/w1280${playing[currentIndex].backdrop_path}`}
                                    alt='backdrop'
                                    fill
                                    draggable={false}
                                    className="object-cover saturate-80 group-hover:saturate-120 pointer-events-none select-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent z-10" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 z-10" />
                            </div>
                            <div
                                key={playing[prevIdx].id}
                                className="absolute inset-0"
                                style={{
                                    zIndex: 20,
                                    opacity: progress,
                                    transition: "none",
                                }}
                            >
                                <Image
                                    src={`https://image.tmdb.org/t/p/w1280${playing[prevIdx].backdrop_path}`}
                                    alt='backdrop'
                                    fill
                                    draggable={false}
                                    className="object-cover saturate-80 group-hover:saturate-120 pointer-events-none select-none"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent z-10" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent z-10" />
                                <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 z-10" />
                            </div>
                        </>
                    );
                }
            })()}

            {/* Movie Info — idle */}
            {!isDragging && renderMovieInfo(currentMovie, 1)}

            {/* Movie Info — dragging, crossfade with incoming */}
            {isDragging && (() => {
                const width = containerRef.current?.clientWidth || 1;
                const frac = Math.max(-1, Math.min(1, dragOffset / width));
                const progress = Math.abs(frac);

                if (frac < 0) {
                    const nextIdx = getNextIndex(currentIndex);
                    return (
                        <>
                            {renderMovieInfo(currentMovie, 1 - progress)}
                            {renderMovieInfo(playing[nextIdx], progress)}
                        </>
                    );
                } else {
                    const prevIdx = getPrevIndex(currentIndex);
                    return (
                        <>
                            {renderMovieInfo(currentMovie, 1 - progress)}
                            {renderMovieInfo(playing[prevIdx], progress)}
                        </>
                    );
                }
            })()}

            {/* Prev Button */}
            <button
                onClick={prevSlide}
                className="absolute cursor-pointer left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition border border-white/20"
            >
                ‹
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute cursor-pointer right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/25 backdrop-blur-sm text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition border border-white/20"
            >
                ›
            </button>

            {/* Dot Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2 select-none">
                {playing.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white w-10" : "bg-white/40 w-2.5"
                            }`}
                    />
                ))}
            </div>

        </div>
    );
}