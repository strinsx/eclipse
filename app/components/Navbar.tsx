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
    <nav className={`${poppins.className} flex items-center justify-between px-10 py-6 m-4`}>
      {/* Left: Logo + Name + Nav Links */}
      <div className="flex items-center gap-20">
        <div className="flex items-center gap-3">
          <Image
            src={Icon}
            alt="Logo"
            width={50}
            height={50}
          />
          <Link href="/" className="font-semibold text-2xl">Eclipse</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/genre">Genre</Link>
        </div>
      </div>

      {/* Right: Search alone */}
      <input
        type="text"
        placeholder="Search movies..."
        className="border rounded-md px-3 py-2 w-75 text-sm"
      />
    </nav>
  );
}