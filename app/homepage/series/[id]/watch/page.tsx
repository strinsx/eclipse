// No "use client"
import { getDetails } from "@/app/lib/tmdb/tv";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { WatchClient } from "@/app/homepage/series/[id]/watch/watchClient";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const series = await getDetails(Number(id));

  return (
    <div className="flex flex-col w-[70%] mx-auto min-h-screen">
      <Navbar />
      <WatchClient series={series} />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}