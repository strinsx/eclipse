"use client"

import Image from "next/image";
import { useState } from "react";

interface Props {
    id: number
    name: string;
    first_air_date: string;
    backdrop_path: string;
    season: number;
    episode: number;
}

export function SeriesVideoPlayer({ name, first_air_date, backdrop_path, id, season, episode }: Props) {
    const [playing, setPlaying] = useState(false);

    return (
        <div
            className="relative w-full aspect-video rounded-lg sm:rounded-xl overflow-hidden bg-black group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
            onClick={() => setPlaying(true)}
        >
            {!playing ? (
                <>
                    <Image
                        src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
                        alt={name}
                        fill
                        className="object-cover saturate-60 group-hover:saturate-100 transition duration-500"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        {/* Play button - responsive size */}
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/40 active:bg-white/50 transition-all duration-200">
                            <span className="text-white text-xl sm:text-2xl ml-0.5 font-bold">▶</span>
                        </div>
                        {/* Optional: Play text on larger screens */}
                        <span className="hidden sm:inline text-white text-xs sm:text-sm font-medium opacity-80 mt-2">Play Episode</span>
                    </div>
                </>
            ) : (
                <div className="w-full h-full bg-black flex items-center justify-center">
                    <iframe
                        className="absolute inset-0 w-full h-full"
                        src={`https://vsembed.ru/embed/tv?tmdb=${id}&season=${season}&episode=${episode}&autoplay=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                        allowFullScreen
                        style={{ border: "none" }}
                        title={`${name} Season ${season} Episode ${episode}`}
                    />
                </div>
            )}
        </div>
    );
}