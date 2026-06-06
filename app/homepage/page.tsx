import { CardPanel } from "../components/Cardpanel";
import { Navbar } from "../components/Navbar";

export default function Homepage() {
  return (
    <div className="flex flex-col w-[70%] mx-auto min-h-screen">
      <Navbar />
      <CardPanel />
    </div>
  );
}