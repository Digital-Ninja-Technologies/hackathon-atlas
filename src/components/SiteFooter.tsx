import { Link } from "@tanstack/react-router";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/", label: "All Hackathons", hash: "hackathons" },
  { to: "/about", label: "About" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-background/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Hackathon Radar
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              hash={"hash" in link ? link.hash : undefined}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-muted-foreground">
          Created by{" "}
          <span className="font-medium text-foreground">Vibecity Community</span>
        </p>
      </div>
    </footer>
  );
}
