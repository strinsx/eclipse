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
        <>

            <div className="flex gap-10">
                <SeriesVideoPlayer
                    id={series.id}
                    name={series.name}
                    first_air_date={series.first_air_date}
                    backdrop_path={series.backdrop_path}
                    season={season}
                    episode={episode}
                />


                <div className="flex justify-between mt-10">
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


        </>
    );
}