// No "use client"
import { getDetails } from "@/app/lib/tmdb/movie";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { VideoPlayer } from "@/app/components/details/moviedetails/VideoPlayer";
import { MovieInfo } from "@/app/components/details/moviedetails/MovieInfo";
import { SimilarMovies } from "@/app/components/details/moviedetails/SimilarMovies";
import { MovieDetailsInfo } from "@/app/components/details/moviedetails/CastInfo";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const movie = await getDetails(Number(id));

  return (
    <div className="flex flex-col w-[70%] mx-auto min-h-screen">


      {/* Left — takes up most of the width */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">

        <Navbar />


        <VideoPlayer
          title={movie.title}
          release_date={movie.release_date}
          backdrop_path={movie.backdrop_path}
        />

        <div className="flex justify-between mt-10">

          <div className="flex flex-col items-start">
            <MovieInfo
              title={movie.title}
              release_date={movie.release_date}
              runtime={movie.runtime}
              vote_average={movie.vote_average}
              overview={movie.overview}
              poster_path={movie.poster_path}
            />

            <MovieDetailsInfo

              poster_path={movie.poster_path}
              genres={movie.genres}
              runtime={movie.runtime}
              release_date={movie.release_date}
              vote_average={movie.vote_average}
              vote_count={movie.vote_count}
              popularity={movie.popularity}
              revenue={movie.revenue}
              production_companies={movie.production_companies}
              production_countries={movie.production_countries}


            />

          </div>

          {/* Right — fixed width similar to screenshot */}
          <div className="w-[600px] flex-shrink-0">
            {/*                             <SimilarMovies movies={mockSimilar} />
 */}                        </div>
        </div>

      </div>


      <footer>
        <Footer />
      </footer>

    </div>
  );
}