import Image from "next/image";
import Nav from "@/components/Nav";
import RSVPForm from "@/components/RSVPForm";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ── */}
        <section
          id="home"
          className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src="/couple.jpeg"
              alt="Katie and Anna"
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-bark/50" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 py-24">
            <p className="text-stone/80 tracking-[0.3em] uppercase text-xs font-light mb-6">
              Together with their families
            </p>
            <h1
              className="font-serif text-stone text-7xl sm:text-8xl md:text-9xl font-light italic leading-none mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Katie&nbsp;&amp;&nbsp;Anna
            </h1>
            <div className="w-24 h-px bg-amber mx-auto my-8" />
            <p
              className="font-serif text-stone/90 text-2xl sm:text-3xl font-light tracking-wide"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              October 2026
            </p>
            <p className="text-stone/70 text-sm font-light tracking-widest uppercase mt-2">
              Location TBD
            </p>
          </div>

          <a
            href="#story"
            className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-stone/60 hover:text-stone transition-colors"
            aria-label="Scroll down"
          >
            <span className="text-xs tracking-widest uppercase font-light">
              Scroll
            </span>
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </section>

        {/* ── Our Story ── */}
        <section id="story" className="py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>Our Story</SectionLabel>
            <h2
              className="font-serif text-wine text-5xl sm:text-6xl font-light italic mb-10 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              How it all began
            </h2>

            <div className="grid sm:grid-cols-2 gap-12 items-start">
              <div className="space-y-5 text-bark/80 font-light leading-relaxed text-[15px]">
                <p>
                  Some love stories begin with grand gestures. Ours started
                  somewhere quieter — a conversation that stretched too long,
                  in the best possible way, and neither of us wanted to be the
                  one to end it first.
                </p>
                <p>
                  We&apos;ve spent the years since building a life that feels
                  like home: slow mornings, ambitious plans, bad jokes, and an
                  embarrassing number of opinions about coffee.
                </p>
              </div>
              <div className="space-y-5 text-bark/80 font-light leading-relaxed text-[15px]">
                <p>
                  When the question was finally asked — in the most perfectly
                  imperfect way — the answer was obvious before it was even
                  finished. Of course. Always.
                </p>
                <p>
                  Now we&apos;re asking you to be there when we make it
                  official, and to help us celebrate the beginning of whatever
                  comes next.
                </p>
              </div>
            </div>

            <div className="mt-16 relative aspect-[3/2] rounded-sm overflow-hidden max-w-xl mx-auto">
              <Image
                src="/couple.jpeg"
                alt="Katie and Anna outside"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 576px"
              />
            </div>
          </div>
        </section>

        {/* ── Schedule ── */}
        <section id="schedule" className="py-28 px-6 bg-stone/50">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>The Day</SectionLabel>
            <h2
              className="font-serif text-wine text-5xl sm:text-6xl font-light italic mb-10 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Schedule of events
            </h2>

            <div className="divide-y divide-stone-dark">
              {schedule.map((event) => (
                <div
                  key={event.title}
                  className="py-8 grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-8"
                >
                  <div className="text-amber font-sans text-sm font-medium tracking-widest uppercase">
                    {event.time}
                  </div>
                  <div>
                    <h3
                      className="font-serif text-bark text-2xl font-light"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-bark/60 text-sm font-light mt-1">
                      {event.location}
                    </p>
                    {event.note && (
                      <p className="text-bark/50 text-sm font-light mt-2 italic">
                        {event.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Travel & Hotels ── */}
        <section id="travel" className="py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>Travel</SectionLabel>
            <h2
              className="font-serif text-wine text-5xl sm:text-6xl font-light italic mb-4 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Getting here
            </h2>
            <p className="text-bark/60 font-light text-sm mb-12">
              More details coming soon — we&apos;ll update this as plans are
              finalized.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {hotels.map((hotel) => (
                <div
                  key={hotel.name}
                  className="border border-stone-dark bg-cream p-7 rounded-sm"
                >
                  <div className="inline-block bg-olive/10 text-olive text-xs font-medium tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                    {hotel.tag}
                  </div>
                  <h3
                    className="font-serif text-bark text-2xl font-light mb-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {hotel.name}
                  </h3>
                  <p className="text-bark/50 text-xs font-light mb-3">
                    {hotel.address}
                  </p>
                  <p className="text-bark/70 text-sm font-light leading-relaxed">
                    {hotel.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-7 border border-amber/40 bg-amber/5 rounded-sm">
              <h3
                className="font-serif text-bark text-2xl font-light mb-2"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Getting around
              </h3>
              <p className="text-bark/70 text-sm font-light leading-relaxed">
                The venue and recommended hotels are within easy reach of each
                other. Rideshare (Lyft / Uber) is the easiest option. We&apos;ll
                share shuttle details closer to the date if arranged.
              </p>
            </div>
          </div>
        </section>

        {/* ── RSVP ── */}
        <section id="rsvp" className="py-28 px-6 bg-wine text-stone">
          <div className="max-w-xl mx-auto">
            <SectionLabel light>RSVP</SectionLabel>
            <h2
              className="font-serif text-stone text-5xl sm:text-6xl font-light italic mb-4 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Will you join us?
            </h2>
            <p className="text-stone/70 font-light text-sm mb-12">
              Please RSVP by September 1, 2026.
            </p>
            <RSVPForm />
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="py-12 px-6 text-center bg-bark text-stone/40">
          <p
            className="font-serif text-2xl italic text-stone/70 mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Katie &amp; Anna
          </p>
          <p className="text-xs tracking-widest uppercase">October 2026</p>
        </footer>
      </main>
    </>
  );
}

function SectionLabel({
  children,
  light,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p
      className={`text-xs tracking-[0.3em] uppercase font-medium mb-4 ${
        light ? "text-stone/50" : "text-olive"
      }`}
    >
      {children}
    </p>
  );
}

const schedule = [
  {
    time: "4:00 PM",
    title: "Ceremony",
    location: "Venue TBD",
    note: "Guests should be seated by 3:45 PM.",
  },
  {
    time: "5:00 PM",
    title: "Cocktail Hour",
    location: "Venue Grounds",
    note: "Drinks, light bites, and good company.",
  },
  {
    time: "6:30 PM",
    title: "Dinner & Reception",
    location: "Main Hall",
    note: undefined,
  },
  {
    time: "10:00 PM",
    title: "Dancing & Late Night",
    location: "Main Hall",
    note: "Dress code: cocktail attire.",
  },
];

const hotels = [
  {
    tag: "Block rate",
    name: "Hotel TBD",
    address: "Address TBD",
    description:
      "We've reserved a block of rooms at a discounted rate. Use code TBD when booking. Block expires September 1, 2026.",
  },
  {
    tag: "Nearby",
    name: "Alternative TBD",
    address: "Address TBD",
    description:
      "Another great option close to the venue. Book directly through their website for the best rate.",
  },
];
