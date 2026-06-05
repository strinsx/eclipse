import Link from \"next/link\";

export default function Navbar() {
  return (
    <nav className=\"bg-slate-950 text-slate-100 shadow-sm shadow-slate-900/10\">
      <div className=\"mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6\">
        <div className=\"flex items-center gap-6\">
          <Link href=\"/\" className=\"text-sm font-semibold uppercase tracking-wide text-slate-100 transition hover:text-white\">
            Home
          </Link>
          <Link href=\"/genres\" className=\"text-sm font-semibold uppercase tracking-wide text-slate-100 transition hover:text-white\">
            Genre
          </Link>
        </div>

        <div className=\"relative w-full max-w-md\">
          <span className=\"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400\">
            <svg
              viewBox=\"0 0 24 24\"
              fill=\"none\"
              stroke=\"currentColor\"
              strokeWidth=\"2\"
              strokeLinecap=\"round\"
              strokeLinejoin=\"round\"
              className=\"h-4 w-4\"
              aria-hidden=\"true\"
            >
              <circle cx=\"11\" cy=\"11\" r=\"7\" />
              <line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\" />
            </svg>
          </span>
          <input
            type=\"search\"
            placeholder=\"Search...\"
            aria-label=\"Search\"
            className=\"w-full rounded-full border border-slate-700 bg-slate-900 py-2 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20\"
          />
        </div>
      </div>
    </nav>
  );
}
