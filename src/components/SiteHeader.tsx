import { Link } from "@tanstack/react-router";
import { Radar } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background">
            <Radar className="h-4 w-4" />
          </span>
          Hackathon Radar
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">Discover</Link>
          <Link to="/submit" className="transition-colors hover:text-foreground">Submit</Link>
          <a href="#" className="hidden rounded-full bg-foreground px-4 py-1.5 text-background transition-opacity hover:opacity-90 sm:inline-block">
            Sign in
          </a>
        </nav>
      </div>
    </header>
  );
}
