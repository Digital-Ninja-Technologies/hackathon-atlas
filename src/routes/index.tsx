import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Search, SearchX, RotateCcw } from "lucide-react";
import { hackathons } from "@/data/hackathons";
import { HackathonCard } from "@/components/HackathonCard";
import { HackathonCardSkeleton } from "@/components/HackathonCardSkeleton";
import { SiteHeader } from "@/components/SiteHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hackathon Radar — Discover hackathons worldwide" },
      { name: "description", content: "Browse, filter and search the best hackathons happening online and in-person." },
      { property: "og:title", content: "Hackathon Radar" },
      { property: "og:description", content: "Discover the best hackathons happening worldwide." },
    ],
  }),
  component: Index,
});

const MODES = ["All", "Online", "Offline", "Hybrid"] as const;
const STATUSES = ["All", "Upcoming", "Ongoing", "Past"] as const;
const CATEGORIES = ["All", "AI", "Web3", "Design", "Open Source"] as const;

function getStatus(h: { date: string; endDate?: string }): "Upcoming" | "Ongoing" | "Past" {
  const now = Date.now();
  const start = new Date(h.date).getTime();
  const end = new Date(h.endDate ?? h.date).getTime();
  if (now < start) return "Upcoming";
  if (now > end) return "Past";
  return "Ongoing";
}

function Index() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<(typeof MODES)[number]>("All");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  const resetFilters = () => {
    setQuery("");
    setMode("All");
    setStatus("All");
    setCategory("All");
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hackathons.filter((h) => {
      if (mode !== "All" && h.mode !== mode) return false;
      if (status !== "All" && getStatus(h) !== status) return false;
      if (category !== "All" && !h.tags.includes(category)) return false;
      if (!q) return true;
      return (
        h.name.toLowerCase().includes(q) ||
        h.shortDescription.toLowerCase().includes(q) ||
        h.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, mode, status, category]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {/* Hero */}
        <section className="pt-16 pb-12 sm:pt-28 sm:pb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-foreground/20">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {hackathons.length} hackathons live this season
          </div>
          <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight sm:text-6xl sm:leading-[1.05]">
            Find Your Next Hackathon
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Discover upcoming, ongoing, and past hackathons tailored for you.
          </p>
        </section>

        {/* Filter bar */}
        <section
          className="sticky top-16 z-30 -mx-2 mb-10 rounded-2xl border bg-background/80 p-3 backdrop-blur-md transition-shadow sm:p-4"
          style={{ boxShadow: "var(--shadow-soft)" }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search hackathons, tags, themes…"
                className="h-11 border-0 bg-secondary pl-10"
              />
            </div>
            <div className="flex gap-1 rounded-lg bg-secondary p-1">
              {MODES.map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    mode === m ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</span>
              <div className="flex flex-wrap gap-1.5">
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                      status === s
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Category</span>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={cn(
                      "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                      category === c
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        {filtered.length > 0 ? (
          <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((h) => (
              <HackathonCard key={h.id} h={h} />
            ))}
          </section>
        ) : (
          <div className="rounded-2xl border border-dashed py-20 text-center">
            <p className="text-sm text-muted-foreground">No hackathons match your filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}
