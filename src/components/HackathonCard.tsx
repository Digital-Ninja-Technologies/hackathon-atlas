import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, Trophy, ArrowUpRight } from "lucide-react";
import type { Hackathon } from "@/data/hackathons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function formatDateRange(start: string, end?: string) {
  const s = new Date(start);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  if (!end) return s.toLocaleDateString("en-US", { ...opts, year: "numeric" });
  const e = new Date(end);
  return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", { ...opts, year: "numeric" })}`;
}

export function HackathonCard({ h }: { h: Hackathon }) {
  return (
    <article
      className="group flex flex-col rounded-2xl border bg-card p-6 transition-all hover:-translate-y-0.5"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className={`inline-flex h-2 w-2 rounded-full ${
            h.mode === "Online" ? "bg-emerald-500" : h.mode === "Offline" ? "bg-orange-500" : "bg-primary"
          }`} />
          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {h.mode}{h.location ? ` · ${h.location}` : ""}
          </span>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <h3 className="mt-4 text-xl font-semibold tracking-tight">{h.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{h.shortDescription}</p>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="truncate text-foreground">{formatDateRange(h.date, h.endDate)}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Trophy className="h-4 w-4" />
          <span className="truncate font-medium text-foreground">{h.prize}</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {h.tags.map((t) => (
          <Badge key={t} variant="secondary" className="rounded-full font-normal">
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <span className="text-xs text-muted-foreground">{h.organizer}</span>
        <Button asChild size="sm" variant="ghost" className="-mr-2">
          <Link to="/hackathon/$id" params={{ id: h.id }}>
            View Details
            <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      {h.location && (
        <div className="sr-only">
          <MapPin /> {h.location}
        </div>
      )}
    </article>
  );
}
