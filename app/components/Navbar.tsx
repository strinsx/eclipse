import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";
import Icon from "../../public/eclipse.svg";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export function Navbar() {
  return (
    <nav className={`${poppins.className} flex items-center px-10 py-6 m-4`}>

      {/* Left */}
      <div className="flex-1 flex items-center gap-3">
        <Image src={Icon} alt="Logo" width={50} height={50} />
        <Link href="/" className="font-semibold text-2xl">Eclipse</Link>
      </div>

      {/* Center */}
      <div className="flex-1 flex items-center justify-center gap-6">
        <Link href="/" className="text-foreground/70 hover:text-foreground transition">Home</Link>
        <Link href="/genre" className="text-foreground/70 hover:text-foreground transition">Movies</Link>
        <Link href="/genre" className="text-foreground/70 hover:text-foreground transition">TV Shows</Link>
      </div>

      {/* Right */}
      <div className="flex-1" />

    </nav>
  );
}