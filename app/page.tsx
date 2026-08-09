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
              src="/katie-and-anna/couple.jpeg"
              alt="Katie and Anna"
              fill
              priority
              className="object-cover object-top"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-forest/55" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 py-24">
            <p className="text-sage-light/80 tracking-[0.35em] uppercase text-xs font-light mb-6">
              Together with their families
            </p>
            <h1
              className="text-cream text-7xl sm:text-8xl md:text-9xl font-light italic leading-none mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Katie&nbsp;&amp;&nbsp;Anna
            </h1>
            <div className="flex items-center gap-4 my-8">
              <div className="w-16 h-px bg-sage" />
              <Leaf />
              <div className="w-16 h-px bg-sage" />
            </div>
            <p
              className="text-cream/90 text-2xl sm:text-3xl font-light tracking-wide"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              August 21, 2027
            </p>
            <p className="text-cream/65 text-sm font-light tracking-widest uppercase mt-2">
              Como Park Conservatory · Saint Paul, MN
            </p>
          </div>

          <a
            href="#story"
            className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-cream/50 hover:text-cream transition-colors"
            aria-label="Scroll down"
          >
            <span className="text-xs tracking-widest uppercase font-light">Scroll</span>
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </section>

        {/* ── Our Story ── */}
        <section id="story" className="py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>Our Story</SectionLabel>
            <h2
              className="text-forest text-5xl sm:text-6xl font-light italic mb-10 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              How it all began
            </h2>

            <div className="grid sm:grid-cols-2 gap-12 items-start">
              <div className="space-y-5 text-bark/75 font-light leading-relaxed text-[15px]">
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
              <div className="space-y-5 text-bark/75 font-light leading-relaxed text-[15px]">
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

            <div className="mt-16 relative aspect-[3/2] overflow-hidden max-w-xl mx-auto">
              <Image
                src="/katie-and-anna/couple.jpeg"
                alt="Katie and Anna outside"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 576px"
              />
            </div>
          </div>
        </section>

        {/* ── The Venue ── */}
        <section id="venue" className="py-28 px-6 bg-mist">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>The Venue</SectionLabel>
            <h2
              className="text-forest text-5xl sm:text-6xl font-light italic mb-4 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Como Park Conservatory
            </h2>
            <p className="text-bark/60 font-light text-sm mb-14 max-w-xl leading-relaxed">
              Built in 1915, the Marjorie McNeely Conservatory is a Victorian
              glass house set within Como Regional Park in Saint Paul. We fell
              in love with this place — and now we&apos;re getting married here.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {gardens.map((g) => (
                <div key={g.name} className="group overflow-hidden border border-stone/60 bg-cream">
                  <div
                    className="h-48 flex items-end p-5"
                    style={{ background: g.gradient }}
                  >
                    <span className="text-xs tracking-widest uppercase font-light text-white/70">
                      {g.label}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3
                      className="text-forest text-2xl font-light italic mb-2"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {g.name}
                    </h3>
                    <p className="text-bark/65 text-sm font-light leading-relaxed">
                      {g.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-bark/40 text-xs tracking-widest uppercase mt-10 font-light">
              <a
                href="https://comozooconservatory.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-fern transition-colors"
              >
                comozooconservatory.org
              </a>
            </p>
          </div>
        </section>

        {/* ── Schedule ── */}
        <section id="schedule" className="py-28 px-6">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>The Day</SectionLabel>
            <h2
              className="text-forest text-5xl sm:text-6xl font-light italic mb-10 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              August 21, 2027
            </h2>

            <div className="divide-y divide-stone/40">
              {schedule.map((event) => (
                <div
                  key={event.title}
                  className="py-8 grid sm:grid-cols-[160px_1fr] gap-2 sm:gap-8"
                >
                  <div className="text-terracotta font-sans text-sm font-medium tracking-widest uppercase">
                    {event.time}
                  </div>
                  <div>
                    <h3
                      className="text-bark text-2xl font-light"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-fern text-xs tracking-widest uppercase font-light mt-0.5">
                      {event.space}
                    </p>
                    {event.note && (
                      <p className="text-bark/50 text-sm font-light mt-2 leading-relaxed">
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
        <section id="travel" className="py-28 px-6 bg-mist">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>Travel</SectionLabel>
            <h2
              className="text-forest text-5xl sm:text-6xl font-light italic mb-4 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Getting here
            </h2>
            <p className="text-bark/60 font-light text-sm mb-12 leading-relaxed">
              Como Park Conservatory is at 1225 Estabrook Drive, Saint Paul, MN 55103.
              Free parking is available on site. More hotel block details coming soon.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {hotels.map((hotel) => (
                <div key={hotel.name} className="border border-stone/60 bg-cream p-7">
                  <div className="inline-block bg-fern/10 text-fern text-xs font-medium tracking-widest uppercase px-3 py-1 mb-4">
                    {hotel.tag}
                  </div>
                  <h3
                    className="text-bark text-2xl font-light mb-1"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {hotel.name}
                  </h3>
                  <p className="text-bark/45 text-xs font-light mb-3">{hotel.address}</p>
                  <p className="text-bark/65 text-sm font-light leading-relaxed">
                    {hotel.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-7 border border-terracotta/30 bg-terracotta/5">
              <h3
                className="text-bark text-2xl font-light mb-2"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                Getting around
              </h3>
              <p className="text-bark/65 text-sm font-light leading-relaxed">
                Como Park is easy to reach by car — free parking at the
                Conservatory. Lyft and Uber are widely available from downtown
                Saint Paul and Minneapolis. We&apos;ll share any shuttle
                arrangements closer to the date.
              </p>
            </div>
          </div>
        </section>

        {/* ── RSVP ── */}
        <section id="rsvp" className="py-28 px-6 bg-forest text-cream">
          <div className="max-w-xl mx-auto">
            <SectionLabel light>RSVP</SectionLabel>
            <h2
              className="text-cream text-5xl sm:text-6xl font-light italic mb-4 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Will you join us?
            </h2>
            <p className="text-cream/60 font-light text-sm mb-12">
              Please RSVP by June 1, 2027.
            </p>
            <RSVPForm />
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="py-12 px-6 text-center bg-bark text-cream/40">
          <p
            className="text-2xl italic text-cream/65 mb-1"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Katie &amp; Anna
          </p>
          <p className="text-xs tracking-widest uppercase">
            August 21, 2027 · Como Park Conservatory · Saint Paul, MN
          </p>
        </footer>
      </main>
    </>
  );
}

function SectionLabel({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-xs tracking-[0.3em] uppercase font-medium mb-4 ${light ? "text-cream/45" : "text-fern"}`}>
      {children}
    </p>
  );
}

function Leaf() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-sage opacity-80">
      <path
        d="M8 1C8 1 2 4 2 9C2 12.314 4.686 15 8 15C11.314 15 14 12.314 14 9C14 4 8 1 8 1Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
      />
      <path d="M8 1L8 15" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
    </svg>
  );
}

const gardens = [
  {
    label: "Ceremony",
    name: "The Sunken Garden",
    gradient: "linear-gradient(135deg, #2a4a2e 0%, #4a7a4e 60%, #8fa68c 100%)",
    description:
      "A vintage glass greenhouse opens onto a raised stone platform facing a Neoclassical water feature, star-shaped chandeliers, and the conservatory's ever-changing seasonal flower display. This is where we say \"I do.\"",
  },
  {
    label: "Cocktail Hour",
    name: "The Enchanted Garden",
    gradient: "linear-gradient(135deg, #3a5a38 0%, #6b8a5a 60%, #c4928a 100%)",
    description:
      "Sweeping vistas of the iconic glass dome open onto lush pollinator gardens planted with native Minnesota wildflowers and butterfly-attracting perennials. Warm August evenings don't get more magical.",
  },
  {
    label: "Explore",
    name: "Japanese Garden",
    gradient: "linear-gradient(135deg, #1e3a3a 0%, #4a7a7a 60%, #8fa6a8 100%)",
    description:
      "The Charlotte Partridge Ordway Japanese Garden — a gift from Saint Paul's sister city of Nagasaki — features a tranquil koi pond, stone pedestrian bridges, cloud-pruned pines, and a waterfall at its heart.",
  },
  {
    label: "Reception Dinner",
    name: "The Covered Porch",
    gradient: "linear-gradient(135deg, #3a3a2a 0%, #7a7a5a 60%, #c4b9a8 100%)",
    description:
      "Floor-to-ceiling windows frame unobstructed views of the illuminated glass dome. By nightfall, the conservatory glows — a spectacular backdrop for dinner, toasts, and dancing.",
  },
];

const schedule = [
  {
    time: "4:00 PM",
    title: "Ceremony",
    space: "Sunken Garden",
    note: "Guests should be seated by 3:45 PM. The Conservatory entrance is on Estabrook Drive.",
  },
  {
    time: "5:00 PM",
    title: "Cocktail Hour",
    space: "Enchanted Garden",
    note: "Drinks and passed bites among the pollinator gardens.",
  },
  {
    time: "6:30 PM",
    title: "Dinner & Toasts",
    space: "Covered Porch",
    note: undefined,
  },
  {
    time: "9:00 PM",
    title: "Dancing",
    space: "Covered Porch",
    note: "Dress code: cocktail attire. The dome will be lit all evening.",
  },
];

const hotels = [
  {
    tag: "~4 miles · Classic",
    name: "The Saint Paul Hotel",
    address: "350 Market St, Saint Paul, MN 55102",
    description:
      "A landmark downtown hotel since 1910 — elegant rooms, walking distance to Rice Park. The gold standard for a Saint Paul stay.",
  },
  {
    tag: "~2 miles · Closest",
    name: "Radisson Hotel Roseville",
    address: "2540 N Cleveland Ave, Roseville, MN 55113",
    description:
      "The nearest full-service hotel to Como Park. Easy drive or short rideshare to the Conservatory — practical and comfortable.",
  },
];
