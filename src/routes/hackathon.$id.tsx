import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin, Trophy, Users, ExternalLink } from "lucide-react";
import { hackathons } from "@/data/hackathons";
import { SiteHeader } from "@/components/SiteHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/hackathon/$id")({
  loader: ({ params }) => {
    const h = hackathons.find((x) => x.id === params.id);
    if (!h) throw notFound();
    return h;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Hackathon Radar` },
          { name: "description", content: loaderData.shortDescription },
          { property: "og:title", content: loaderData.name },
          { property: "og:description", content: loaderData.shortDescription },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Hackathon not found</h1>
        <p className="mt-2 text-muted-foreground">It may have ended or been removed.</p>
        <Button asChild className="mt-6"><Link to="/">Back to discover</Link></Button>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-10 text-center text-destructive">{error.message}</div>
  ),
  component: HackathonDetail,
});

function fmt(d: string) {
  return new Date(d).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function HackathonDetail() {
  const h = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-3xl px-6 pb-24 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-2">
            <span className={`inline-flex h-2 w-2 rounded-full ${
              h.mode === "Online" ? "bg-emerald-500" : h.mode === "Offline" ? "bg-orange-500" : "bg-primary"
            }`} />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {h.mode}{h.location ? ` · ${h.location}` : ""}
            </span>
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{h.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{h.shortDescription}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {h.tags.map((t: string) => (
              <Badge key={t} variant="secondary" className="rounded-full font-normal">{t}</Badge>
            ))}
          </div>
        </header>

        <section
          className="mt-10 grid gap-4 rounded-2xl border bg-card p-6 sm:grid-cols-3"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <Stat icon={<Calendar className="h-4 w-4" />} label="Dates" value={
            h.endDate ? `${fmt(h.date).split(",")[1]?.trim()} – ${fmt(h.endDate)}` : fmt(h.date)
          } />
          <Stat icon={<Trophy className="h-4 w-4" />} label="Prize Pool" value={h.prize} />
          <Stat icon={h.location ? <MapPin className="h-4 w-4" /> : <Users className="h-4 w-4" />} label="Format" value={h.location ?? h.mode} />
        </section>

        <section className="prose prose-neutral mt-10 max-w-none">
          <h2 className="text-xl font-semibold tracking-tight">About</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{h.description}</p>

          <h2 className="mt-10 text-xl font-semibold tracking-tight">Organizer</h2>
          <p className="mt-2 text-muted-foreground">{h.organizer}</p>
        </section>

        <div className="mt-10 flex flex-col gap-3 rounded-2xl border bg-foreground p-6 text-background sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold">Ready to build?</p>
            <p className="text-sm opacity-70">Register your team and start hacking.</p>
          </div>
          <Button size="lg" variant="secondary" className="rounded-full">
            Register now <ExternalLink className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground">
        {icon} {label}
      </div>
      <div className="mt-1.5 font-medium">{value}</div>
    </div>
  );
}
