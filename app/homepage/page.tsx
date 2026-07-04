import { CardPanel } from "../components/movie/Cardpanel";
import { MoviePanel } from "../components/movie/MoviePanel";
import  Navbar  from "../components/Navbar";
import { TrendingPanel } from "../components/movie/TrendingPanel";
import { Footer } from '../components/Footer'
import { TopRatedPanel } from "../components/movie/TopRatedPanel";
import { OnAirTv } from "../components/series/OnAir";
import { TrendingPanelTV } from "../components/series/TrendingPanelTV";
import { Searchpanel } from "../components/movie/Searchpanel";
import { RecentlyWatched } from "../components/recently/RecentlyWatched";
export default function Homepage() {
  return (
    <div className="flex flex-col w-full px-4 md:px-0 md:w-[85%] lg:w-[70%] mx-auto min-h-screen">
      <Navbar />
      <CardPanel />
      <Searchpanel />
      <RecentlyWatched />


      <MoviePanel />
      <TrendingPanel />
      <TopRatedPanel />
      <OnAirTv />
      <TrendingPanelTV />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}