import Image from "next/image";

export function HomeFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center text-center lg:items-start lg:text-left">
            <img
              src="/kaishi-logo.png"
              alt="Kaishi Innovations"
              className="mb-1 h-16 md:h-25 w-auto object-contain"
            />
            <p className="text-sm leading-relaxed text-slate-500">
              LearningHub is built by Kaishi Innovations to help IT professionals learn faster, grow smarter, and reach their career goals.
            </p>
            <div className="mt-4 flex justify-center lg:justify-start gap-3">
              {["Twitter", "LinkedIn", "GitHub"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Platform",
              links: ["All Courses", "Learning Paths", "Certificates", "Community"],
            },
            {
              title: "Company",
              links: ["About", "Blog", "Careers", "Press"],
            },
            {
              title: "Support",
              links: ["Help Centre", "Privacy Policy", "Terms of Service", "Contact"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-slate-600 transition hover:text-violet-600">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-slate-100 pt-4 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Kaishi Innovations. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            Built with ♥ for IT learners worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
