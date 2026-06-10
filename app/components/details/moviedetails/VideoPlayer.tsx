"use client"

import Image from "next/image";
import { useState } from "react";

interface Props {
    id: number
    title: string;
    release_date: string;
    backdrop_path: string;
}

export function VideoPlayer({ title, release_date, backdrop_path, id }: Props) {
    const [playing, setPlaying] = useState(false);

    return (
        <div
            className="relative w-300 aspect-video rounded-xl overflow-hidden bg-black group cursor-pointer"
            onClick={() => setPlaying(true)}
        >
            {!playing ? (
                <>
                    <Image
                        src={`https://image.tmdb.org/t/p/w1280${backdrop_path}`}
                        alt={title}
                        fill
                        className="object-cover saturate-60 group-hover:saturate-100 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition">
                            <span className="text-white text-2xl ml-1">▶</span>
                        </div>
                        <span className="text-white/70 text-sm">
                            {title} ({release_date.slice(0, 4)})
                        </span>
                    </div>
                </>
            ) : (
                <iframe
                    className="w-full h-full"
                    src={`https://vidsrc-embed.ru/embed/movie?tmdb=${id}&sub_url=https%3A%2F%2Fvidsrc.me%2Fsample.srt&autoplay=1`}
                    allow="autoplay; fullscreen"
                    allowFullScreen
                />
            )}
        </div>
    );
}