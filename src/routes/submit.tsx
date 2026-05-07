import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit a Hackathon — Hackathon Radar" },
      { name: "description", content: "Add your hackathon to the Hackathon Radar directory." },
    ],
  }),
  component: SubmitPage,
});

// ─── Constants ────────────────────────────────────────────────────────────────

const MODES = ["Online", "Offline", "Hybrid"] as const;
type Mode = (typeof MODES)[number];

const ALL_TAGS = [
  "AI", "LLM", "Agents", "Web3", "DeFi", "Infra", "Design", "Product",
  "Branding", "Climate", "Social Impact", "Health", "Fintech", "Payments",
  "Security", "DevTools", "Open Source", "CLI", "API", "Education", "Data",
  "Gaming", "Mobile", "Hardware",
];

const STEPS = ["Basics", "Details", "Description", "Review"] as const;

// ─── Form state type ───────────────────────────────────────────────────────────

type FormData = {
  name: string;
  organizer: string;
  url: string;
  startDate: string;
  endDate: string;
  mode: Mode | "";
  location: string;
  prize: string;
  tags: string[];
  shortDescription: string;
  description: string;
  contactEmail: string;
};

const EMPTY: FormData = {
  name: "",
  organizer: "",
  url: "",
  startDate: "",
  endDate: "",
  mode: "",
  location: "",
  prize: "",
  tags: [],
  shortDescription: "",
  description: "",
  contactEmail: "",
};

// ─── Validation ───────────────────────────────────────────────────────────────

function validateStep(step: number, data: FormData): string[] {
  const errors: string[] = [];
  if (step === 0) {
    if (!data.name.trim()) errors.push("Hackathon name is required.");
    if (!data.organizer.trim()) errors.push("Organizer name is required.");
    if (!data.startDate) errors.push("Start date is required.");
    if (data.endDate && data.startDate && data.endDate < data.startDate)
      errors.push("End date must be after start date.");
  }
  if (step === 1) {
    if (!data.mode) errors.push("Please select a mode.");
    if (data.mode !== "Online" && !data.location.trim())
      errors.push("Location is required for offline/hybrid hackathons.");
    if (!data.prize.trim()) errors.push("Prize pool is required.");
    if (data.tags.length === 0) errors.push("Select at least one tag.");
  }
  if (step === 2) {
    if (!data.shortDescription.trim()) errors.push("Short description is required.");
    if (data.shortDescription.length > 120)
      errors.push("Short description must be 120 characters or less.");
    if (!data.description.trim()) errors.push("Full description is required.");
    if (!data.contactEmail.trim()) errors.push("Contact email is required.");
    if (data.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail))
      errors.push("Enter a valid email address.");
  }
  return errors;
}

// ─── Step indicator ───────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300",
                i < current
                  ? "bg-foreground text-background"
                  : i === current
                    ? "border-2 border-foreground bg-background text-foreground"
                    : "border border-border bg-card text-muted-foreground",
              )}
            >
              {i < current ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </div>
            <span
              className={cn(
                "hidden text-[10px] font-medium uppercase tracking-wider sm:block",
                i === current ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                "mx-2 mb-5 h-px w-12 sm:w-20 transition-colors duration-300",
                i < current ? "bg-foreground" : "bg-border",
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1 text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function StepBasics({
  data,
  onChange,
  errors,
}: {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
  errors: string[];
}) {
  const err = (field: string) => {
    if (field === "name" && errors.some((e) => e.includes("name"))) return errors.find((e) => e.includes("name"));
    if (field === "organizer" && errors.some((e) => e.includes("Organizer"))) return errors.find((e) => e.includes("Organizer"));
    if (field === "startDate" && errors.some((e) => e.includes("Start"))) return errors.find((e) => e.includes("Start"));
    if (field === "endDate" && errors.some((e) => e.includes("End"))) return errors.find((e) => e.includes("End"));
  };

  return (
    <div className="flex flex-col gap-6">
      <Field label="Hackathon Name" required error={err("name")}>
        <Input
          value={data.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="e.g. AI Genesis 2026"
          className="h-11"
        />
      </Field>

      <Field label="Organizer" required error={err("organizer")}>
        <Input
          value={data.organizer}
          onChange={(e) => onChange({ organizer: e.target.value })}
          placeholder="e.g. Genesis Labs"
          className="h-11"
        />
      </Field>

      <Field label="Website URL" hint="Link to the hackathon registration or info page.">
        <Input
          type="url"
          value={data.url}
          onChange={(e) => onChange({ url: e.target.value })}
          placeholder="https://..."
          className="h-11"
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Start Date" required error={err("startDate")}>
          <Input
            type="date"
            value={data.startDate}
            onChange={(e) => onChange({ startDate: e.target.value })}
            className="h-11"
          />
        </Field>
        <Field label="End Date" hint="Leave blank for single-day events." error={err("endDate")}>
          <Input
            type="date"
            value={data.endDate}
            onChange={(e) => onChange({ endDate: e.target.value })}
            className="h-11"
          />
        </Field>
      </div>
    </div>
  );
}

function StepDetails({
  data,
  onChange,
  errors,
}: {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
  errors: string[];
}) {
  const toggleTag = (tag: string) => {
    onChange({
      tags: data.tags.includes(tag) ? data.tags.filter((t) => t !== tag) : [...data.tags, tag],
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Mode */}
      <Field label="Mode" required error={errors.find((e) => e.includes("mode"))}>
        <div className="flex gap-2">
          {MODES.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onChange({ mode: m, location: m === "Online" ? "" : data.location })}
              className={cn(
                "flex-1 rounded-xl border py-3 text-sm font-medium transition-all",
                data.mode === m
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:border-foreground/30 hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "mr-1.5 inline-block h-2 w-2 rounded-full",
                  m === "Online" ? "bg-emerald-500" : m === "Offline" ? "bg-orange-500" : "bg-primary",
                  data.mode === m ? "opacity-100" : "opacity-50",
                )}
              />
              {m}
            </button>
          ))}
        </div>
      </Field>

      {/* Location */}
      {data.mode !== "Online" && (
        <Field
          label="Location"
          required
          hint={data.mode === "Hybrid" ? "In-person venue, e.g. Remote + NYC" : "City and country"}
          error={errors.find((e) => e.includes("Location"))}
        >
          <Input
            value={data.location}
            onChange={(e) => onChange({ location: e.target.value })}
            placeholder={data.mode === "Hybrid" ? "Remote + New York, NY" : "Berlin, Germany"}
            className="h-11"
          />
        </Field>
      )}

      {/* Prize */}
      <Field
        label="Prize Pool"
        required
        hint="Include currency symbol. E.g. $50,000 or £10,000"
        error={errors.find((e) => e.includes("Prize"))}
      >
        <Input
          value={data.prize}
          onChange={(e) => onChange({ prize: e.target.value })}
          placeholder="$50,000"
          className="h-11"
        />
      </Field>

      {/* Tags */}
      <Field
        label="Tags"
        required
        hint="Pick up to 5 tags that best describe your hackathon."
        error={errors.find((e) => e.includes("tag"))}
      >
        <div className="flex flex-wrap gap-1.5 rounded-xl border bg-card p-3">
          {ALL_TAGS.map((tag) => {
            const selected = data.tags.includes(tag);
            const maxed = data.tags.length >= 5 && !selected;
            return (
              <button
                key={tag}
                type="button"
                disabled={maxed}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-all",
                  selected
                    ? "bg-foreground text-background"
                    : maxed
                      ? "cursor-not-allowed opacity-30 border border-border"
                      : "border border-border bg-background text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
        {data.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {data.tags.map((t) => (
              <Badge key={t} variant="secondary" className="rounded-full text-xs">
                {t}
              </Badge>
            ))}
          </div>
        )}
      </Field>
    </div>
  );
}

function StepDescription({
  data,
  onChange,
  errors,
}: {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
  errors: string[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <Field
        label="Short Description"
        required
        hint={`One punchy sentence shown on the card. ${data.shortDescription.length}/120 characters.`}
        error={errors.find((e) => e.includes("Short") || e.includes("120"))}
      >
        <Input
          value={data.shortDescription}
          onChange={(e) => onChange({ shortDescription: e.target.value })}
          maxLength={120}
          placeholder="Build the next generation of AI-native products in 48 hours."
          className="h-11"
        />
      </Field>

      <Field
        label="Full Description"
        required
        hint="Describe what participants will build, who it's for, what makes it unique, and any special resources provided."
        error={errors.find((e) => e.includes("Full"))}
      >
        <textarea
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          rows={6}
          placeholder="AI Genesis is a global, fully online hackathon focused on building AI-native applications. Teams of up to 4 will ship end-to-end products powered by frontier models…"
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
        />
      </Field>

      <Field
        label="Contact Email"
        required
        hint="We'll reach out here to verify and publish your listing."
        error={errors.find((e) => e.includes("email") || e.includes("Email"))}
      >
        <Input
          type="email"
          value={data.contactEmail}
          onChange={(e) => onChange({ contactEmail: e.target.value })}
          placeholder="organizer@example.com"
          className="h-11"
        />
      </Field>
    </div>
  );
}

function StepReview({ data }: { data: FormData }) {
  const fmt = (d: string) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const Row = ({ label, value }: { label: string; value: string }) =>
    value ? (
      <div className="flex items-start justify-between gap-4 border-b py-3 last:border-0">
        <span className="text-sm text-muted-foreground shrink-0">{label}</span>
        <span className="text-sm font-medium text-right">{value}</span>
      </div>
    ) : null;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm text-muted-foreground">
        Review your submission below. We'll verify the details and publish your listing within 48 hours.
      </p>

      <div className="rounded-2xl border bg-card p-5">
        <Row label="Name" value={data.name} />
        <Row label="Organizer" value={data.organizer} />
        <Row label="Website" value={data.url} />
        <Row
          label="Dates"
          value={data.startDate ? (data.endDate ? `${fmt(data.startDate)} – ${fmt(data.endDate)}` : fmt(data.startDate)) : ""}
        />
        <Row label="Mode" value={data.mode + (data.location ? ` · ${data.location}` : "")} />
        <Row label="Prize Pool" value={data.prize} />
        <Row label="Contact" value={data.contactEmail} />

        {data.tags.length > 0 && (
          <div className="flex items-start justify-between gap-4 border-b py-3">
            <span className="text-sm text-muted-foreground shrink-0">Tags</span>
            <div className="flex flex-wrap justify-end gap-1">
              {data.tags.map((t) => (
                <Badge key={t} variant="secondary" className="rounded-full text-xs font-normal">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {data.shortDescription && (
          <div className="border-b py-3 last:border-0">
            <p className="text-sm text-muted-foreground mb-1">Short Description</p>
            <p className="text-sm">{data.shortDescription}</p>
          </div>
        )}

        {data.description && (
          <div className="py-3">
            <p className="text-sm text-muted-foreground mb-1">Description</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{data.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center py-16 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 mb-6">
        <Check className="h-8 w-8 text-emerald-500" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">Submission received!</h2>
      <p className="mt-2 max-w-sm text-muted-foreground text-sm">
        <span className="font-medium text-foreground">{name}</span> has been submitted for review. We'll
        verify the details and publish your listing within 48 hours.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild variant="outline">
          <Link to="/submit">Submit another</Link>
        </Button>
        <Button asChild>
          <Link to="/">Browse hackathons</Link>
        </Button>
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function SubmitPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (patch: Partial<FormData>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setErrors([]);
  };

  const next = () => {
    const errs = validateStep(step, data);
    if (errs.length) {
      setErrors(errs);
      return;
    }
    setErrors([]);
    if (step === STEPS.length - 1) {
      handleSubmit();
    } else {
      setStep((s) => s + 1);
    }
  };

  const back = () => {
    setErrors([]);
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // Simulate network request
    await new Promise((r) => setTimeout(r, 1400));
    setSubmitting(false);
    setSubmitted(true);
  };

  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main className="mx-auto max-w-2xl px-6 pb-24 pt-10">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        {submitted ? (
          <SuccessScreen name={data.name} />
        ) : (
          <>
            {/* Header */}
            <header className="mt-8 mb-10">
              <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground mb-4">
                <Sparkles className="h-3 w-3" />
                Free to list
              </div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Submit a Hackathon</h1>
              <p className="mt-2 text-muted-foreground text-sm sm:text-base">
                Add your event to the directory and reach thousands of builders.
              </p>
            </header>

            <StepIndicator current={step} />

            {/* Form panel */}
            <div
              className="rounded-2xl border bg-card p-6 sm:p-8"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <h2 className="text-lg font-semibold tracking-tight mb-6">{STEPS[step]}</h2>

              {step === 0 && <StepBasics data={data} onChange={onChange} errors={errors} />}
              {step === 1 && <StepDetails data={data} onChange={onChange} errors={errors} />}
              {step === 2 && <StepDescription data={data} onChange={onChange} errors={errors} />}
              {step === 3 && <StepReview data={data} />}

              {/* Inline errors summary */}
              {errors.length > 0 && (
                <div className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3">
                  {errors.map((e) => (
                    <p key={e} className="text-xs text-destructive">
                      {e}
                    </p>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between gap-4">
                {step > 0 ? (
                  <Button variant="outline" onClick={back} disabled={submitting}>
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                <Button onClick={next} disabled={submitting} className="rounded-full px-6">
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : isLastStep ? (
                    <>
                      <Check className="h-4 w-4" />
                      Submit
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
