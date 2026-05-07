import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Hackathon Radar" },
      {
        name: "description",
        content:
          "Hackathon Radar helps developers, designers, and builders discover the best hackathons happening worldwide.",
      },
      { property: "og:title", content: "About — Hackathon Radar" },
      {
        property: "og:description",
        content:
          "Discover upcoming, ongoing, and past hackathons tailored for you.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pt-20 pb-16">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          About Hackathon Radar
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Hackathon Radar is a curated discovery hub for hackathons happening
          around the world — online and offline. We help developers, designers,
          and builders find the right event to learn, ship, and win.
        </p>
        <div className="mt-10 grid gap-6 text-muted-foreground">
          <section>
            <h2 className="text-xl font-medium text-foreground">Our mission</h2>
            <p className="mt-2">
              Make it effortless to find your next hackathon — filtered by
              status, mode, and the topics you care about.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-medium text-foreground">Built by</h2>
            <p className="mt-2">
              Crafted with care by the Vibecity Community, for builders
              everywhere.
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
