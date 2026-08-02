"use client"

import { useEffect, useState } from "react";
import { SeriesVideoPlayer } from "@/app/components/series/details/watch/SeriesVideoPlayer";
import { EpisodesPanel } from "@/app/components/series/details/watch/EpisodesPanel";
import { SeriesDetailsInfo } from "@/app/components/series/details/watch/SeriesDetails";
import { RecentlyTracker } from "@/app/components/recently/RecentlyTracker";
import {
    getSeriesProgress,
    hasActiveProfile,
} from "@/app/lib/services/recently.services";

interface Props {
    series: any;
}

const STORAGE_KEY = (id: number) => `watch-progress:tv:${id}`;

interface StoredProgress {
    season: number;
    episode: number;
}

function readStoredProgress(id: number): StoredProgress | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY(id));
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (
            typeof parsed?.season === "number" &&
            typeof parsed?.episode === "number"
        ) {
            return parsed;
        }
        return null;
    } catch {
        return null;
    }
}

export function WatchClient({ series }: Props) {
    const [ready, setReady] = useState(false);
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);

    useEffect(() => {
        let cancelled = false;

        async function load() {
            const local = readStoredProgress(series.id);
            let nextSeason = local?.season ?? 1;
            let nextEpisode = local?.episode ?? 1;

            if (hasActiveProfile()) {
                try {
                    const server = await getSeriesProgress(series.id);
                    if (server) {
                        nextSeason = server.season;
                        nextEpisode = server.episode;
                    }
                } catch {
                    // fall back to local storage
                }
            }

            if (cancelled) return;
            setSeason(nextSeason);
            setEpisode(nextEpisode);
            setReady(true);
        }

        load();
        return () => {
            cancelled = true;
        };
    }, [series.id]);

    useEffect(() => {
        if (!ready) return;
        try {
            localStorage.setItem(
                STORAGE_KEY(series.id),
                JSON.stringify({ season, episode })
            );
        } catch {
            // ignore storage errors (e.g. private mode)
        }
    }, [season, episode, ready, series.id]);

    if (!ready) {
        return (
            <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 md:px-6 py-4 md:py-6 lg:py-8" />
        );
    }

    return (
        <>
            <RecentlyTracker
                tmdb_id={series.id}
                media_type="tv"
                title={series.name}
                overview={series.overview}
                backdrop_path={series.backdrop_path}
                release_date={series.first_air_date}
                season_number={season}
                episode_number={episode}
            />
            <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 md:px-6 py-4 md:py-6 lg:py-8">
            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-10 w-full">
                {/* Video Player + Info - Full width on mobile, flexible on larger screens */}
                <div className="w-full lg:flex-1 min-w-0 flex flex-col gap-5">
                    <SeriesVideoPlayer
                        id={series.id}
                        name={series.name}
                        first_air_date={series.first_air_date}
                        backdrop_path={series.backdrop_path}
                        season={season}
                        episode={episode}
                    />

                    <SeriesDetailsInfo
                        id={series.id}
                        name={series.name}
                        overview={series.overview}
                        number_of_episodes={series.number_of_episodes}
                        number_of_seasons={series.number_of_seasons}
                        genres={series.genres}
                        first_air_date={series.first_air_date}
                        vote_average={series.vote_average}
                        poster_path={series.poster_path}
                    />
                </div>

                {/* Episodes Panel - Full width on mobile, fixed width on larger screens */}
                <div className="w-full lg:w-80 flex-shrink-0">
                    <EpisodesPanel
                        tvId={series.id}
                        numberOfSeasons={series.number_of_seasons}
                        activeSeason={season}
                        activeEpisode={episode}
                        onEpisodeSelect={(s, e) => {
                            setSeason(s);
                            setEpisode(e);
                        }}
                    />
                </div>
            </div>
        </div>
        </>
    );
}