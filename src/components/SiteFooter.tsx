export function SiteFooter() {
  return (
    <footer className="mt-24 border-t bg-background/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Hackathon Radar</p>
        <p>
          Created by{" "}
          <span className="font-medium text-foreground">Vibecity Community</span>
        </p>
      </div>
    </footer>
  );
}
