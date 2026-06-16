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
    }, [selectedSeason]);

    const seasons = Array.from({ length: numberOfSeasons }, (_, i) => i + 1);

    return (
        <div className="bg-foreground/5 rounded-xl p-4 min-w-80">

            {/* Header */}
            <h2 className="text-foreground font-bold text-base mb-4 flex items-center gap-2">
                 Episodes
            </h2>

            {/* Season selector grid */}
            <div className="grid grid-cols-5 gap-2 mb-4">
                {seasons.map((s) => (
                    <button
                        key={s}
                        onClick={() => setSelectedSeason(s)}
                        className={`text-xs font-semibold py-2 rounded-md transition cursor-pointer ${s === selectedSeason
                                ? "bg-blue-600 text-white"
                                : "bg-foreground/10 text-foreground/70 hover:bg-foreground/20"
                            }`}
                    >
                        S{s}
                    </button>
                ))}
            </div>

            {/* Episode list */}
            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1">
                {isLoading && (
                    <p className="text-foreground/40 text-sm text-center py-4">Loading...</p>
                )}

                {!isLoading && episodes.map((ep) => (
                    <div
                        key={ep.id}
                        className="flex items-center gap-3 cursor-pointer hover:bg-foreground/5 rounded-lg p-1.5 transition"
                        onClick={() => onEpisodeSelect(selectedSeason, ep.episode_number)} // 👈 here
                    >
                        {/* Thumbnail */}
                        <div className="relative w-20 h-12 flex-shrink-0 rounded-md overflow-hidden bg-foreground/10">
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
                            <div className="absolute top-1 left-1 bg-background/70 text-foreground text-xs font-bold px-1.5 py-0.5 rounded">
                                E{ep.episode_number}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col min-w-0">
                            <h3 className="text-foreground text-sm font-semibold line-clamp-1">
                                {ep.name}
                            </h3>
                            <span className="text-foreground/40 text-xs">
                                {ep.runtime ? `${ep.runtime} min` : ep.air_date}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
