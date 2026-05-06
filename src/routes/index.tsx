import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { hackathons } from "@/data/hackathons";
import { HackathonCard } from "@/components/HackathonCard";
import { SiteHeader } from "@/components/SiteHeader";
import { Input } from "@/components/ui/input";
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

function Index() {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<(typeof MODES)[number]>("All");
  const [tag, setTag] = useState<string>("All");

  const allTags = useMemo(
    () => ["All", ...Array.from(new Set(hackathons.flatMap((h) => h.tags)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return hackathons.filter((h) => {
      if (mode !== "All" && h.mode !== mode) return false;
      if (tag !== "All" && !h.tags.includes(tag)) return false;
      if (!q) return true;
      return (
        h.name.toLowerCase().includes(q) ||
        h.shortDescription.toLowerCase().includes(q) ||
        h.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, mode, tag]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-6xl px-6 pb-24">
        {/* Hero */}
        <section className="pt-16 pb-10 sm:pt-24">
          <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            {hackathons.length} hackathons live this season
          </div>
          <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Find your next hackathon.
          </h1>
          <p className="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
            A curated radar of the world's best hackathons — from AI to Web3, online and in-person.
          </p>
        </section>

        {/* Filter bar */}
        <section className="sticky top-16 z-30 -mx-2 mb-8 rounded-2xl border bg-background/80 p-3 backdrop-blur-md sm:p-4"
          style={{ boxShadow: "var(--shadow-soft)" }}>
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

          <div className="mt-3 flex flex-wrap gap-1.5">
            {allTags.map((t) => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  tag === t
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
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
