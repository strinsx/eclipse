
import  Navbar  from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { VideoPlayer } from "@/app/components/details/moviedetails/VideoPlayer";
import { MovieHeader } from "@/app/components/details/moviedetails/onboarding/MovieHeader";
import { TopCast } from "@/app/components/details/moviedetails/onboarding/TopCast";
import { SimilarMoviesGrid } from "@/app/components/details/moviedetails/onboarding/SimilarMoviesGrid";
import { getDetails, getSimilar, getCredits } from "@/app/lib/tmdb/movie";



export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

   const [movie, similar, cast] = await Promise.all([
    getDetails(Number(id)),
    getSimilar(Number(id)),
    getCredits(Number(id)),
  ]);

  return(

    <div className="flex flex-col w-full md:w-[85%] lg:w-[70%] mx-auto min-h-screen">
      <Navbar />

      <MovieHeader
        id={movie.id}
        title={movie.title}
        overview={movie.overview}
        poster_path={movie.poster_path}
        release_date={movie.release_date}
        runtime={movie.runtime}
        vote_average={movie.vote_average}
        vote_count={movie.vote_count}
        genres={movie.genres}
        backdrop_path={movie.backdrop_path}
      />

      <TopCast cast={cast} />

      <SimilarMoviesGrid movies={similar} />

      <footer>
        <Footer />
      </footer>
    </div>
  );
}