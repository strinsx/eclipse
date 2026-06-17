"use client"

import { useState } from "react";
import { SeriesVideoPlayer } from "@/app/components/series/details/watch/SeriesVideoPlayer";
import { EpisodesPanel } from "@/app/components/series/details/watch/EpisodesPanel";
import { SeriesDetailsInfo } from "@/app/components/series/details/watch/SeriesDetails";

interface Props {
    series: any;
}

export function WatchClient({ series }: Props) {
    const [season, setSeason] = useState(1);
    const [episode, setEpisode] = useState(1);

    return (
        <div className="w-full flex flex-col gap-6 md:gap-8 lg:gap-10 px-3 sm:px-4 md:px-6 py-4 md:py-6 lg:py-8">
            {/* Main Content Section */}
            <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-10 w-full">
                {/* Video Player - Full width on mobile, flexible on larger screens */}
                <div className="w-full lg:flex-1 min-w-0">
                    <SeriesVideoPlayer
                        id={series.id}
                        name={series.name}
                        first_air_date={series.first_air_date}
                        backdrop_path={series.backdrop_path}
                        season={season}
                        episode={episode}
                    />
                </div>

                {/* Episodes Panel - Full width on mobile, fixed width on larger screens */}
                <div className="w-full lg:w-80 flex-shrink-0">
                    <EpisodesPanel
                        tvId={series.id}
                        numberOfSeasons={series.number_of_seasons}
                        onEpisodeSelect={(s, e) => {
                            setSeason(s);
                            setEpisode(e);
                        }}
                    />
                </div>
            </div>

            {/* Series Details - Full width, responsive layout */}
            <div className="w-full">
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
        </div>
    );
}