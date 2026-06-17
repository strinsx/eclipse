"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

interface Episode {
    id: number;
    episode_number: number;
    name: string;
    overview: string;
    still_path: string | null;
    runtime: number | null;
    air_date: string;
}

interface Props {
    tvId: number;
    numberOfSeasons: number;
    onEpisodeSelect: (season: number, episode: number) => void;
}

export function EpisodesPanel({ tvId, numberOfSeasons, onEpisodeSelect }: Props) {
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [episodes, setEpisodes] = useState<Episode[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchEpisodes = async (season: number) => {
        try {
            setIsLoading(true);
            const res = await fetch(`/api/series/${tvId}/season/${season}`);
            const data = await res.json();
            setEpisodes(data.episodes ?? []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEpisodes(selectedSeason);
    }, [selectedSeason, tvId]);

    const seasons = Array.from({ length: numberOfSeasons }, (_, i) => i + 1);

    return (
        <div className="bg-foreground/5 rounded-lg sm:rounded-xl p-3 sm:p-4 w-full lg:w-80 lg:min-w-80 shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Header */}
            <h2 className="text-foreground font-bold text-sm sm:text-base mb-3 sm:mb-4 flex items-center gap-2">
                Episodes
            </h2>

            {/* Season selector grid - responsive columns */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                {seasons.map((s) => (
                    <button
                        key={s}
                        onClick={() => setSelectedSeason(s)}
                        className={`text-xs sm:text-xs font-semibold py-1.5 sm:py-2 rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap ${
                            s === selectedSeason
                                ? "bg-blue-600 text-white shadow-md scale-100"
                                : "bg-foreground/10 text-foreground/70 hover:bg-foreground/20 active:bg-foreground/30"
                        }`}
                        title={`Season ${s}`}
                    >
                        S{s}
                    </button>
                ))}
            </div>

            {/* Episode list - responsive height and scrolling */}
            <div className="flex flex-col gap-2 sm:gap-3 max-h-[300px] sm:max-h-[400px] lg:max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                {isLoading && (
                    <div className="flex items-center justify-center py-6 sm:py-8">
                        <p className="text-foreground/40 text-xs sm:text-sm">Loading episodes...</p>
                    </div>
                )}

                {!isLoading && episodes.length === 0 && (
                    <p className="text-foreground/40 text-xs sm:text-sm text-center py-4">No episodes found</p>
                )}

                {!isLoading && episodes.map((ep) => (
                    <div
                        key={ep.id}
                        className="flex items-start sm:items-center gap-2 sm:gap-3 cursor-pointer hover:bg-foreground/10 rounded-lg p-1.5 sm:p-2 transition-all duration-200 active:bg-foreground/20"
                        onClick={() => onEpisodeSelect(selectedSeason, ep.episode_number)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                onEpisodeSelect(selectedSeason, ep.episode_number);
                            }
                        }}
                    >
                        {/* Thumbnail - responsive size */}
                        <div className="relative w-16 sm:w-20 h-10 sm:h-12 flex-shrink-0 rounded-md overflow-hidden bg-foreground/10">
                            {ep.still_path ? (
                                <Image
                                    src={`https://image.tmdb.org/t/p/w300${ep.still_path}`}
                                    alt={ep.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-foreground/20 text-xs">
                                    No image
                                </div>
                            )}
                            {/* Episode badge */}
                            <div className="absolute top-0.5 left-0.5 bg-background/80 text-foreground text-xs font-bold px-1 sm:px-1.5 py-0.5 rounded">
                                E{ep.episode_number}
                            </div>
                        </div>

                        {/* Episode Info - responsive text size */}
                        <div className="flex flex-col min-w-0 flex-1">
                            <h3 className="text-foreground text-xs sm:text-sm font-semibold line-clamp-2 sm:line-clamp-1 leading-tight sm:leading-normal">
                                {ep.name}
                            </h3>
                            <span className="text-foreground/40 text-xs mt-0.5">
                                {ep.runtime ? `${ep.runtime} min` : ep.air_date ? new Date(ep.air_date).toLocaleDateString() : "TBA"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
