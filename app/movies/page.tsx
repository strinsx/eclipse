"use client"

import { VideoPlayer } from "../components/details/moviedetails/VideoPlayer";
import { MovieInfo } from "../components/details/moviedetails/MovieInfo";
import { SimilarMovies } from "../components/details/moviedetails/SimilarMovies";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { MovieDetailsInfo } from "../components/details/moviedetails/CastInfo";

const mockMovie = {
    title: "Michael",
    release_date: "2026-04-18",
    runtime: 128,
    vote_average: 8.1,
    overview: "The story of Michael Jackson, one of the most influential artists the world has ever known, and his life beyond the music. His journey from the discovery of his extraordinary talent as the lead of the Jackson Five, to the visionary artist whose creative ambition fueled a relentless pursuit to become the biggest entertainer in the world, highlighting both his life off-stage and some of the most iconic performances from his early solo career.",
    backdrop_path: "/4k99kV4R1bbbrsnjR205v91Xbin.jpg",
};

const mockSimilar = [
    { id: 1, title: "Wings of Desire", vote_average: 7.8, poster_path: "/xugEpZk9YQ0DIz1aFvH5HGkqpZK.jpg" },
    { id: 2, title: "Breaking the Waves", vote_average: 7.5, poster_path: "/mCpwRayjXMFzKHbjbzc5JRKfq1O.jpg" },
    { id: 3, title: "Yoshiko & Yuriko", vote_average: 0.8, poster_path: "/dd31qJxOarrHyGZwYsCzOjobQzP.jpg" },
    { id: 4, title: "Volver", vote_average: 7.5, poster_path: "/e5IdZ1OEWMYxTeu51tI67gXvfpn.jpg" },
    { id: 5, title: "East of Eden", vote_average: 7.5, poster_path: "/qO55CD8tgVL1T4WKn6zYFFiD6lL.jpg" },
    { id: 6, title: "Walk the Line", vote_average: 7.5, poster_path: "/9Z2uDYXqJrlmePznQQJhL6d92Rq.jpg" },
];

export default function MovieDetails() {
    return (

        <div className="flex flex-col w-[70%] mx-auto min-h-screen">


            {/* Left — takes up most of the width */}
            <div className="flex-1 flex flex-col gap-4 min-w-0">

                <Navbar />


                <VideoPlayer
                    title={mockMovie.title}
                    release_date={mockMovie.release_date}
                    backdrop_path={mockMovie.backdrop_path}
                />

                <div className="flex justify-between mt-10">

                    <div className="flex flex-col items-start">
                        <MovieInfo
                            title={mockMovie.title}
                            release_date={mockMovie.release_date}
                            runtime={mockMovie.runtime}
                            vote_average={mockMovie.vote_average}
                            overview={mockMovie.overview}
                        />

                        <MovieDetailsInfo />

                    </div>

                    {/* Right — fixed width similar to screenshot */}
                    <div className="w-[600px] flex-shrink-0">
                        <SimilarMovies movies={mockSimilar} />
                    </div>
                </div>

            </div>


            <footer>
                <Footer />
            </footer>

        </div>
    );
}