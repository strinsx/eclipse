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
            className="relative w-250 aspect-video rounded-xl overflow-hidden bg-black group cursor-pointer"
            onClick={() => setPlaying(true)}
        >
            {!playing ? (
                <>
                    <Image
                        src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
                        alt={name}
                        fill
                        className="object-cover saturate-60 group-hover:saturate-100 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition">
                            <span className="text-white text-2xl ml-1">▶</span>
                        </div>
                    </div>
                </>
            ) : (
                <iframe
                    className="w-full h-full"
                    src={`https://vsembed.ru/embed/tv?tmdb=${id}&season=${season}&episode=${episode}&autoplay=1`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                />
            )}
        </div>
    );
}