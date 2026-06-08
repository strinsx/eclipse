import { CardPanel } from "../components/movie/Cardpanel";
import { MoviePanel } from "../components/movie/MoviePanel";
import { Navbar } from "../components/Navbar";
import { TrendingPanel } from "../components/movie/TrendingPanel";
import {Footer} from '../components/Footer'
import { TopRatedPanel } from "../components/movie/TopRatedPanel";
import { OnAirTv } from "../components/series/OnAir";
import { TrendingPanelTV } from "../components/series/TrendingPanelTV";
export default function Homepage() {
  return (
    <div className="flex flex-col w-[70%] mx-auto min-h-screen">
      <Navbar />
      <CardPanel />
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