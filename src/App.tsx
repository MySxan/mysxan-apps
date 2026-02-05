import { useEffect, useMemo, useState } from "react";

type AppCategory = "all" | "utilities" | "music" | "study" | "dev" | "fun";
type AppStatus = "stable" | "beta" | "deprecated";

type AppItem = {
  slug: string;
  name: string;
  description: string;
  category: Exclude<AppCategory, "all">;
  tags: ("sync" | "beta" | "new")[];
  path: string;
  requiresAuthForSync: boolean;
  status: AppStatus;
  updatedAt: string;
  links?: {
    docs?: string;
    changelog?: string;
    repository?: string;
  };
  iconUrl?: string;
};

type UpcomingApp = {
  name: string;
  description?: string;
  status: "coming-soon" | "planned";
};

const apps: AppItem[] = [
  {
    slug: "wordle-helper",
    name: "Wordle Helper",
    description: "Refine your guesses by filtering possible words",
    category: "utilities",
    tags: [],
    path: "/wordle-helper/",
    requiresAuthForSync: false,
    status: "stable",
    updatedAt: "2026-02-05",
    iconUrl: "https://apps.mysxan.com/wordle-helper/icon-192-maskable.png",
    links: {
      repository: "https://github.com/MySxan/wordle-helper",
    },
  },
  {
    slug: "course-scheduler",
    name: "Course Scheduler",
    description: "Visualize, manage, and export your schedules",
    category: "study",
    tags: ["sync"],
    path: "/course-scheduler/",
    requiresAuthForSync: true,
    status: "stable",
    updatedAt: "2026-02-01",
    iconUrl: "https://apps.mysxan.com/course-scheduler/icon-192-maskable.png",
    links: {
      repository: "https://github.com/MySxan/course-scheduler",
    },
  },
];

const upcomingApps: UpcomingApp[] = [
  {
    name: "Habit Tracker",
    description: "Track daily habits with cloud sync",
    status: "coming-soon",
  },
  {
    name: "ArxsBot",
    description: "QQ-Group based chatbot with memory and learning capabilities",
    status: "planned",
  },
];

const categories: AppCategory[] = [
  "all",
  "utilities",
  "music",
  "study",
  "dev",
  "fun",
];

function useCursorGlow() {
  useEffect(() => {
    const root = document.documentElement;
    let currentX = 50;
    let currentY = 20;
    let targetX = 50;
    let targetY = 20;
    let frame: number | null = null;

    const lerp = (start: number, end: number, amt: number) =>
      start + (end - start) * amt;

    const update = () => {
      currentX = lerp(currentX, targetX, 0.08);
      currentY = lerp(currentY, targetY, 0.08);
      root.style.setProperty("--mx-glow-x", `${currentX.toFixed(2)}%`);
      root.style.setProperty("--mx-glow-y", `${currentY.toFixed(2)}%`);
      frame = window.requestAnimationFrame(update);
    };

    const onMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth) * 100;
      targetY = (e.clientY / window.innerHeight) * 100;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    frame = window.requestAnimationFrame(update);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);
}

export default function App() {
  useCursorGlow();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<AppCategory>("all");

  const filteredApps = useMemo(() => {
    return apps.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || app.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="mx-bg relative text-zinc-900">
      <header className="fixed left-0 right-0 top-0 z-40 bg-white/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-8">
            <a
              href="https://mysxan.com/"
              className="font-semibold tracking-tight"
            >
              Apps / MySxan
            </a>
            <nav className="hidden gap-6 text-sm text-zinc-600 md:flex">
              <a
                className="transition hover:text-zinc-900"
                href="https://mysxan.com/"
              >
                Index
              </a>
              <a
                className="transition hover:text-zinc-900"
                href="https://archive.mysxan.com"
              >
                Archive
              </a>

              <a
                className="transition hover:text-zinc-900"
                href="https://mysxan.com/activities"
              >
                Activities
              </a>
              <a
                className="transition hover:text-zinc-900"
                href="https://works.mysxan.com/"
              >
                Portfolio
              </a>
              <a
                className="transition hover:text-zinc-900"
                href="https://mysxan.com/#links"
              >
                Links
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/login"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-150 hover:opacity-95"
            >
              Sign in
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 pt-16">
        <section className="pt-10 md:pt-16">
          <div className="flex max-w-2xl flex-col">
            <p className="text-sm uppercase tracking-[0.3em] text-zinc-400">
              MySxan · Apps
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
              Apps.
            </h1>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-zinc-600">
              Utilities I build. Sign in to sync data where supported.
            </p>
          </div>
        </section>

        <section className="mt-10 md:mt-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-3xl border border-zinc-200 bg-white/70 px-4 py-2.5 pr-10 text-sm backdrop-blur transition placeholder:text-zinc-400 hover:border-zinc-300 focus:border-zinc-400 focus:outline-none"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="mx-icon absolute right-3 top-1/2 -translate-y-1/2 transition hover:text-zinc-600"
                    aria-label="Clear search"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4l8 8M12 4l-8 8" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            <div className="md:w-52">
              <label className="block text-sm font-medium text-zinc-700 mb-2">
                Category
              </label>
              <div className="relative group">
                <select
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as AppCategory)
                  }
                  className="w-full appearance-none rounded-3xl border border-zinc-200 bg-white/70 px-4 py-2.5 pr-10 text-sm backdrop-blur transition hover:border-zinc-300 focus:border-zinc-400 focus:outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                <div className="mx-icon pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition group-hover:text-zinc-600 group-focus-within:text-zinc-600">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 6l4 4 4-4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 md:mt-12">
          {filteredApps.length === 0 ? (
            <div className="rounded-lg border border-zinc-200 bg-white/70 p-8 text-center mx-glass-flat shadow-none">
              <p className="text-zinc-600">
                No apps found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredApps.map((app) => (
                <div
                  key={app.slug}
                  className="mx-glass p-6 flex flex-col gap-5"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-[84px] w-[84px] overflow-hidden rounded-2xl border border-slate-300/60 bg-white/70">
                      {app.iconUrl && (
                        <img
                          src={app.iconUrl}
                          alt={`${app.name} icon`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">
                            {app.name}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {app.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 flex-1 flex-wrap gap-2">
                        {!app.requiresAuthForSync && (
                          <span className="inline-flex items-center text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full border border-green-200/50">
                            Public
                          </span>
                        )}
                        {app.requiresAuthForSync && (
                          <span className="inline-flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200/50">
                            Sync
                          </span>
                        )}
                        {app.status === "beta" && (
                          <span className="inline-flex items-center text-xs bg-yellow-50 text-yellow-700 px-2 py-0.5 rounded-full border border-yellow-200/50">
                            Beta
                          </span>
                        )}
                        {app.tags.includes("new") && (
                          <span className="inline-flex items-center text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200/50">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href={app.path}
                      className="flex-1 rounded-full bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition duration-150 hover:opacity-95 text-center"
                    >
                      Open
                    </a>
                    {app.links?.repository && (
                      <a
                        href={app.links.repository}
                        className="rounded-full border border-zinc-200 bg-white/70 px-4 py-2.5 text-sm font-medium backdrop-blur transition duration-150 hover:bg-white"
                      >
                        Repository
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {upcomingApps.length > 0 && (
          <section className="mt-14">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Coming Soon
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {upcomingApps.map((app) => (
                <div key={app.name} className="mx-glass p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold leading-tight text-slate-900">
                        {app.name}
                      </h3>
                      {app.description && (
                        <p className="text-sm text-slate-600">
                          {app.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-14 mb-10">
          <div className="mx-glass-flat p-6">
            <div className="max-w-2xl">
              <h3 className="font-semibold text-slate-900 mb-2">
                Connected Data
              </h3>
              <div className="space-y-2 text-sm text-slate-600 leading-tight">
                <p>
                  Some apps support account-based sync. Your data stays within
                  each app's scope.
                </p>
                <p>Sign in to connect your data across supported apps.</p>
              </div>
            </div>
          </div>
        </section>
        <footer
          id="footer"
          className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-zinc-200/60 py-8 text-sm text-slate-600 md:flex-row"
        >
          <div>© {new Date().getFullYear()} MySxan</div>
          <div className="flex gap-4">
            <a
              className="transition hover:text-slate-900"
              href="https://github.com/MySxan"
            >
              GitHub
            </a>
            <a
              className="transition hover:text-slate-900"
              href="https://works.mysxan.com/"
            >
              Portfolio
            </a>
            <a
              className="transition hover:text-slate-900"
              href="mailto:mysxan@163.com"
            >
              Email
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
