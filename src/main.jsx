import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  Check,
  MapPin,
  Search,
  ShieldCheck,
  Star,
} from "lucide-react";
import "./styles.css";

const brand = {
  logo: "/swivl-logo-transparent.png",
};

const imagery = {
  hero: "/swivl-actual-hero-lounge.jpeg",
  privateOffice: "/swivl-actual-private-office.jpeg",
  meetingRoom: "/swivl-actual-meeting-room.jpeg",
  lounge: "/swivl-actual-window-lounge.jpeg",
  reception: "/swivl-actual-branded-entry.jpeg",
  detail: "/swivl-actual-city-lounge.jpeg",
};

const finderSuggestions = [
  "Need a private office in Laval for 3 people",
  "Looking for a business address in Montreal",
  "Need a meeting room tomorrow",
  "Coworking near Queen Mary",
];

const recommendations = {
  private: {
    eyebrow: "Best fit",
    title: "Versa Private Office — Laval",
    subtitle: "A private base for professionals and small teams who need credibility, quiet, and room to grow.",
    image: imagery.privateOffice,
    details: ["From $1,100/mo", "Soundproof private offices", "Conference room access", "Flexible terms"],
    meta: ["2-6 people", "Laval", "Available now"],
  },
  virtual: {
    eyebrow: "Business presence",
    title: "Virtual Office — Montreal",
    subtitle: "A professional address and meeting-ready presence without committing to permanent square footage.",
    image: imagery.reception,
    details: ["Mail handling", "Professional address", "Meeting room access", "Flexible membership"],
    meta: ["Address", "Montreal", "Low commitment"],
  },
  meeting: {
    eyebrow: "Client-ready",
    title: "Executive Meeting Room — Jean-Talon",
    subtitle: "A polished room for presentations, interviews, working sessions, and decisions that need privacy.",
    image: imagery.meetingRoom,
    details: ["Book tomorrow", "Video-ready", "Visitor support", "Quiet arrival"],
    meta: ["4-12 guests", "Jean-Talon", "On demand"],
  },
  coworking: {
    eyebrow: "Flexible access",
    title: "Workspace Access — Queen Mary",
    subtitle: "A composed workday alternative for professionals who need convenience without a long office commitment.",
    image: imagery.lounge,
    details: ["Quiet access", "Useful location", "Meeting upgrades", "Professional setting"],
    meta: ["Hybrid work", "Queen Mary", "Flexible"],
  },
};

const stayCards = [
  {
    title: "Private offices that feel like your own",
    image: imagery.privateOffice,
    lines: ["Credible arrival for clients", "Quiet rooms for focused work", "Space your team can settle into"],
  },
  {
    title: "Flexible terms without traditional lease friction",
    image: imagery.meetingRoom,
    lines: ["Adjust as headcount changes", "Furnished and ready sooner", "Professional without the rigidity"],
  },
  {
    title: "Convenience built into every location",
    image: imagery.lounge,
    lines: ["Montreal and Laval practicality", "Parking and transit considered", "Meeting support close at hand"],
  },
];

const galleryMoments = [
  {
    title: "Shared lounges",
    note: "Hospitality-minded space with room to reset.",
    image: imagery.detail,
  },
  {
    title: "Meeting rooms",
    note: "Client-ready focus when the room matters.",
    image: imagery.meetingRoom,
  },
  {
    title: "Branded arrival",
    note: "A professional first impression from the door.",
    image: imagery.reception,
  },
];

const proofLogos = ["Northline Law", "Crown Finance", "Metro Advisory", "Atelier Realty", "Signal Tech"];

const competitorNarratives = [
  {
    title: "More than just a desk.",
    body: "WeWork's phone booths and shared tables just scratch the surface. Swivl offers acoustically treated private offices, client-ready meeting rooms, and spaces you can actually confidently bring an investor to.",
    image: imagery.privateOffice,
    alt: "Premium private office with calm architectural finishes",
  },
  {
    title: "Agility that enables growth.",
    body: "Regus looks professional to start, but the lease friction and rigidity make it anything but easy. With Swivl, anyone can secure premium space on flexible terms. No long-term lock-ins required.",
  },
  {
    title: "Local context, not generic inventory.",
    body: "Workspace decisions are operational decisions. Swivl pairs Montreal and Laval convenience with spaces that feel established enough for clients and flexible enough for teams in motion.",
    image: imagery.meetingRoom,
    alt: "Client-ready meeting room with warm daylight",
  },
];

function getRecommendation(query) {
  const value = query.toLowerCase();
  if (value.includes("address") || value.includes("virtual")) return "virtual";
  if (value.includes("meeting") || value.includes("room") || value.includes("tomorrow")) return "meeting";
  if (value.includes("cowork") || value.includes("queen mary") || value.includes("desk")) return "coworking";
  return "private";
}

function App() {
  const [query, setQuery] = useState(finderSuggestions[0]);
  const [activeSuggestion, setActiveSuggestion] = useState(finderSuggestions[0]);
  const recommendation = useMemo(() => recommendations[getRecommendation(query)], [query]);

  function selectSuggestion(value) {
    setQuery(value);
    setActiveSuggestion(value);
  }

  return (
    <main className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A]">
      <Header />
      <Hero
        query={query}
        recommendation={recommendation}
        activeSuggestion={activeSuggestion}
        onQueryChange={(value) => {
          setQuery(value);
          setActiveSuggestion("");
        }}
        onSuggestion={selectSuggestion}
      />
      <WhyStay />
      <CompetitorStory />
      <ImageStory />
      <FooterCta />
    </main>
  );
}

function Header() {
  const links = [
    ["Locations", "#locations"],
    ["Private Offices", "#private-offices"],
    ["Meeting Rooms", "#meeting-rooms"],
    ["Virtual Office", "#virtual-office"],
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-[#F9F8F6]/84 backdrop-blur-xl">
      <div className="mx-auto grid min-h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 sm:px-8">
        <a aria-label="Swivl home" href="#" className="inline-flex h-12 w-20 items-center sm:w-28">
          <img src={brand.logo} alt="Swivl" className="h-auto w-full object-contain mix-blend-multiply" />
        </a>
        <nav className="hidden justify-self-center gap-8 text-sm text-[#4A4A4A] lg:flex">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="transition hover:text-[#1A1A1A]">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 justify-self-end">
          <a href="#finder" className="inline-flex h-11 items-center gap-2 rounded-full bg-[#356A94] px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#295572] sm:px-5">
            Find Your Workspace
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ query, recommendation, activeSuggestion, onQueryChange, onSuggestion }) {
  return (
    <section className="pb-20">
      <figure className="relative left-1/2 min-h-[42rem] w-screen -translate-x-1/2 overflow-hidden bg-[#1A1A1A] shadow-sm sm:min-h-[48rem] lg:min-h-[53rem]">
        <img src={imagery.hero} alt="Swivl shared workspace lounge" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,18,20,0.84)_0%,rgba(14,18,20,0.62)_42%,rgba(14,18,20,0.25)_72%,rgba(14,18,20,0.3)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/68 via-transparent to-[#111111]/10" />
        <figcaption className="relative mx-auto flex min-h-[42rem] max-w-7xl flex-col justify-end px-5 pb-24 pt-14 text-white sm:min-h-[48rem] sm:px-8 sm:pb-32 lg:min-h-[53rem] lg:pb-40">
          <div className="max-w-[54rem]">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/24 bg-white/14 px-4 py-2 text-sm text-white/92 shadow-sm backdrop-blur-md">
              <ShieldCheck size={15} className="text-white" />
              Premium workspace for serious professionals
            </div>
            <h1 className="heading mt-7 text-5xl font-bold leading-[0.95] tracking-[-0.065em] text-white [text-wrap:balance] sm:text-7xl lg:text-[6.35rem]">
              Flexible workspace without the compromise.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/84 sm:text-xl">
              Premium private offices, meeting rooms, and virtual memberships for professionals who need flexibility, privacy, and a place they can actually grow into.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <GoogleRating />
            <div className="flex flex-wrap gap-3 text-sm text-white/92">
              <span className="rounded-full border border-white/25 bg-white/16 px-4 py-2 backdrop-blur">4 Montreal-area locations</span>
              <span className="rounded-full border border-white/25 bg-white/16 px-4 py-2 backdrop-blur">Privacy and flexible terms</span>
            </div>
          </div>
        </figcaption>
      </figure>

      <div className="mx-auto -mt-16 max-w-7xl px-5 sm:-mt-24 sm:px-8">
        <WorkspaceFinder
          query={query}
          recommendation={recommendation}
          activeSuggestion={activeSuggestion}
          onQueryChange={onQueryChange}
          onSuggestion={onSuggestion}
        />
      </div>
    </section>
  );
}

function GoogleRating() {
  return (
    <div className="flex w-fit items-center gap-3 rounded-2xl border border-white/28 bg-[#F9F8F6]/94 px-4 py-3 text-[#1A1A1A] shadow-lg backdrop-blur-md">
      <span aria-hidden="true" className="heading text-lg font-bold tracking-[-0.06em]">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#DB4437]">o</span>
        <span className="text-[#F4B400]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#0F9D58]">l</span>
        <span className="text-[#DB4437]">e</span>
      </span>
      <span className="h-8 w-px bg-gray-200" />
      <span>
        <span className="flex items-center gap-1 text-[#C67D43]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} size={13} className="fill-current" />
          ))}
        </span>
        <span className="mt-1 block text-xs font-medium text-[#4A4A4A]">5.0-rated workspace experience</span>
      </span>
    </div>
  );
}

function WorkspaceFinder({ query, recommendation, activeSuggestion, onQueryChange, onSuggestion }) {
  return (
    <section id="finder" className="rounded-[1.75rem] border border-white/70 bg-[#F9F8F6]/96 p-4 shadow-[0_28px_90px_rgba(26,26,26,0.14)] backdrop-blur sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.04fr_0.96fr]">
        <div className="p-2 sm:p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#356A94]">Workspace finder</p>
          <h2 className="heading mt-3 text-2xl font-bold tracking-[-0.05em] sm:text-3xl">Tell Swivl what your work needs.</h2>
          <label className="mt-5 flex min-h-20 items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 shadow-sm focus-within:border-[#356A94]/40 sm:px-5">
            <Search size={22} className="shrink-0 text-[#356A94]" />
            <input
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Need a private office in Laval for 3 people"
              className="h-20 min-w-0 flex-1 bg-transparent text-base text-[#1A1A1A] outline-none placeholder:text-[#4A4A4A]/55 sm:text-lg"
            />
          </label>
          <div className="mt-3 flex flex-wrap gap-2">
            {finderSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => onSuggestion(suggestion)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  activeSuggestion === suggestion
                    ? "bg-[#356A94] text-white shadow-sm"
                    : "border border-gray-200 bg-white text-[#4A4A4A] hover:text-[#1A1A1A]"
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        <RecommendationCard recommendation={recommendation} />
      </div>
    </section>
  );
}

function RecommendationCard({ recommendation }) {
  return (
    <article key={recommendation.title} className="animate-rise overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex h-full flex-col justify-between p-6 sm:p-7">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-[#356A94]/10 px-3 py-1 text-xs font-semibold text-[#356A94]">
              {recommendation.eyebrow}
            </span>
            <div className="flex flex-wrap gap-2">
              {recommendation.meta.map((item) => (
                <span key={item} className="rounded-full bg-[#356A94]/8 px-2.5 py-1 text-xs font-medium text-[#4A4A4A]">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <h3 className="heading mt-7 text-2xl font-bold tracking-[-0.045em] sm:text-3xl">{recommendation.title}</h3>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#4A4A4A] sm:text-base sm:leading-7">{recommendation.subtitle}</p>
          <div className="mt-6 grid gap-3 border-y border-gray-200/80 py-5 text-sm text-[#4A4A4A] sm:grid-cols-2">
            {recommendation.details.map((detail) => (
              <span key={detail} className="inline-flex items-center gap-2">
                <BenefitMark />
                {detail}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <button className="inline-flex h-10 items-center gap-2 rounded-full bg-[#356A94] px-4 text-sm font-semibold text-white">
            View option
            <ArrowRight size={14} />
          </button>
          <button className="h-10 rounded-full border border-gray-200 px-4 text-sm font-semibold">Book a tour</button>
        </div>
      </div>
    </article>
  );
}

function WhyStay() {
  return (
    <section id="private-offices" className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#356A94]">Why professionals stay</p>
          <h2 className="heading mt-4 text-4xl font-bold tracking-[-0.055em] sm:text-6xl">Workspaces people can keep growing into.</h2>
        </div>
        <div className="mt-11 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {stayCards.map((card, index) => (
            <article
              key={card.title}
              id={index === 1 ? "meeting-rooms" : index === 2 ? "virtual-office" : undefined}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img src={card.image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              </div>
              <div className="p-7 sm:p-8">
                <h3 className="heading text-2xl font-bold tracking-[-0.04em]">{card.title}</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-[#4A4A4A]">
                  {card.lines.map((line) => (
                    <li key={line} className="flex gap-3">
                      <BenefitMark />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompetitorStory() {
  return (
    <section className="bg-[#F4F5F7] px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#356A94]">Swivl compared</p>
            <h2 className="heading mt-5 max-w-3xl text-5xl font-bold leading-[0.96] tracking-[-0.07em] text-[#1A1A1A] sm:text-6xl">
              The credibility of Regus. The agility of WeWork.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-gray-600">
              If you’re reading this, you’ve probably outgrown the chaotic energy of typical coworking, but you don't want to be locked into a rigid corporate lease. Swivl scales with your professionalism.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#finder" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#356A94] px-6 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#295572] hover:shadow-md">
                Find your workspace
                <ArrowRight size={16} />
              </a>
              <button className="h-12 rounded-full border border-gray-300 bg-white px-6 text-sm font-semibold text-[#1A1A1A] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                Book a tour
              </button>
            </div>
          </div>
          <LeaseGraphic />
        </div>

        <ProofStrip />
        <NarrativeBlocks />
        <NoWorkarounds />
      </div>
    </section>
  );
}

function LeaseGraphic() {
  return (
    <div className="relative min-h-[28rem] rounded-[2rem] border border-white/80 bg-white/40 p-5 shadow-inner sm:p-8">
      <div className="absolute inset-x-8 top-20 rounded-2xl border border-gray-200 bg-gray-100 p-6 text-gray-400 shadow-sm sm:inset-x-14">
        <div className="flex items-center justify-between gap-3">
          <p className="heading text-xl font-bold tracking-[-0.04em]">Traditional 3-Year Commercial Lease</p>
          <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold">Locked terms</span>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <GhostBar />
          <GhostBar />
          <GhostBar />
        </div>
      </div>
      <div className="relative mt-44 rounded-2xl border border-white bg-white p-6 shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_100px_rgba(25,35,45,0.22)] sm:mt-40 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#356A94]">Available workspace</p>
            <h3 className="heading mt-2 text-3xl font-bold tracking-[-0.055em]">Swivl Private Office</h3>
          </div>
          <span className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">Available Today</span>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <MetricPill label="Terms" value="Flexible" />
          <MetricPill label="Privacy" value="Soundproof" />
          <MetricPill label="Move-in" value="Ready" />
        </div>
        <div className="mt-7 flex items-center justify-between rounded-2xl bg-[#F4F5F7] p-4 text-sm text-gray-600">
          <span>Professional space, less friction.</span>
          <ArrowRight size={16} className="text-[#356A94]" />
        </div>
      </div>
    </div>
  );
}

function GhostBar() {
  return (
    <span className="h-12 rounded-xl bg-white/70" />
  );
}

function MetricPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-[#F4F5F7] p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">{label}</p>
      <p className="heading mt-2 text-lg font-bold tracking-[-0.035em] text-[#1A1A1A]">{value}</p>
    </div>
  );
}

function ProofStrip() {
  return (
    <div className="py-24 text-center">
      <p className="text-sm font-medium text-gray-500">Trusted by professionals who graduated from standard coworking.</p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
        {proofLogos.map((logo) => (
          <span key={logo} className="heading text-xl font-bold tracking-[-0.04em] text-gray-400 opacity-60 grayscale">
            {logo}
          </span>
        ))}
      </div>
    </div>
  );
}

function NarrativeBlocks() {
  return (
    <div className="space-y-24">
      {competitorNarratives.map((item, index) => (
        <article key={item.title} className={`grid gap-10 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#356A94]">Why Swivl</p>
            <h3 className="heading mt-4 text-4xl font-bold tracking-[-0.06em] text-[#1A1A1A] sm:text-5xl">{item.title}</h3>
            <p className="mt-5 text-lg leading-8 text-gray-600">{item.body}</p>
          </div>
          {index === 1 ? <MembershipCard /> : <NarrativeImage item={item} />}
        </article>
      ))}
    </div>
  );
}

function NarrativeImage({ item }) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
      <img src={item.image} alt={item.alt} className="aspect-[4/3] w-full rounded-[1.15rem] object-cover" />
    </figure>
  );
}

function MembershipCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition duration-500 hover:-translate-y-1 hover:shadow-2xl sm:p-7">
      <div className="rounded-2xl bg-[#F4F5F7] p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#356A94]">Membership terms</p>
            <p className="heading mt-2 text-2xl font-bold tracking-[-0.045em]">Private office plan</p>
          </div>
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm">
            <span className="rounded-full bg-[#356A94] px-4 py-2 text-sm font-semibold text-white">Monthly</span>
            <span className="px-4 py-2 text-sm font-semibold text-gray-400">3 years</span>
          </div>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <MetricPill label="Start" value="This month" />
          <MetricPill label="Scale" value="As needed" />
          <MetricPill label="Fees" value="Transparent" />
        </div>
      </div>
    </div>
  );
}

function NoWorkarounds() {
  const cards = [
    ["Transparent Pricing", "Know the starting point before the tour."],
    ["Local Owner-Operated Support", "People close to the spaces and the market."],
    ["Instant Move-In", "Furnished offices ready for real work."],
  ];

  return (
    <section className="pt-24 text-center">
      <h3 className="heading mx-auto max-w-4xl text-4xl font-bold tracking-[-0.06em] text-[#1A1A1A] sm:text-5xl">
        Say goodbye to hidden fees and corporate rigidity.
      </h3>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {cards.map(([title, body]) => (
          <article key={title} className="rounded-2xl border border-gray-200 bg-white p-7 text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <h4 className="heading text-2xl font-bold tracking-[-0.045em]">{title}</h4>
            <p className="mt-3 text-base leading-7 text-gray-600">{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ImageStory() {
  return (
    <section id="locations" className="px-5 pb-20 sm:px-8 sm:pb-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 grid gap-4 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <h2 className="heading text-4xl font-bold tracking-[-0.055em] sm:text-5xl">Space that feels composed in person.</h2>
          <p className="max-w-xl text-base leading-7 text-[#4A4A4A]">
            The spaces matter: calm offices, polished rooms, and hospitality-minded details that help professional work feel natural.
          </p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr_0.82fr]">
          {galleryMoments.map((moment, index) => (
            <figure key={moment.title} className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-[#1A1A1A] shadow-sm ${index === 0 ? "min-h-[32rem]" : "min-h-[24rem]"}`}>
              <img src={moment.image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/10 to-transparent" />
              <figcaption className="absolute bottom-0 p-6 text-white sm:p-7">
                <p className="heading text-2xl font-bold tracking-[-0.04em]">{moment.title}</p>
                <p className="mt-2 text-sm text-white/78">{moment.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterCta() {
  return (
    <section className="px-5 pb-16 sm:px-8 sm:pb-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 rounded-[2rem] bg-[#1A1A1A] px-7 py-9 text-white shadow-sm sm:px-10 sm:py-11 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-white/60">Swivl flexible workspace</p>
          <h2 className="heading mt-2 text-3xl font-bold tracking-[-0.05em] sm:text-4xl">Find the workspace that fits how your business works.</h2>
        </div>
        <a href="#finder" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-[#1A1A1A]">
          Start with the finder
          <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}

function BenefitMark() {
  return (
    <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#356A94]/10 text-[#356A94]">
      <Check size={10} strokeWidth={2.5} />
    </span>
  );
}

const root = globalThis.__swivlRoot ?? createRoot(document.getElementById("root"));
globalThis.__swivlRoot = root;
root.render(<App />);
