import Image from "next/image";
import Nav from "@/components/Nav";
import RSVPForm from "@/components/RSVPForm";
import GalleryGrid from "@/components/GalleryGrid";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* ── Hero ── */}
        <section
          id="home"
          className="relative bg-forest flex flex-col"
          style={{ minHeight: "100svh" }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/couple.jpeg"
              alt="Katie and Anna"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "center 55%" }}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-forest/45" />
          </div>

          <div
            className="relative z-10 flex flex-col items-end justify-start text-right px-8 sm:px-14 pt-28 pb-16"
            style={{ minHeight: "100svh" }}
          >
            <h1
              className="text-cream text-7xl sm:text-8xl md:text-9xl font-light italic leading-none mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Katie&nbsp;&amp;&nbsp;Anna
            </h1>
            <div className="flex items-center gap-4 my-6">
              <div className="w-16 h-px bg-sage" />
              <Leaf />
            </div>
            <p
              className="text-cream/90 text-2xl sm:text-3xl font-light tracking-wide"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              August 7, 2027
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
                  somewhere quieter — Anna asked Katie for her number in their
                  first year at Johns Hopkins to &quot;start a group chat&quot; ;)
                </p>
                <p>
                  What followed were nights out at The Crown and long
                  conversations at Leon&apos;s, and the slow, certain feeling
                  that neither of us wanted to be anywhere else.
                </p>
              </div>
              <div className="space-y-5 text-bark/75 font-light leading-relaxed text-[15px]">
                <p>
                  We&apos;ve spent the six years since building a life that
                  feels like home: five apartments, four cities, adventures
                  across the world and
                  wherever comes next.
                </p>
                <p>
                  Now we&apos;re asking you to be there when we make it
                  official, and to help us celebrate the beginning of this next chapter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section id="gallery" className="pb-28 px-6">
          <div className="max-w-5xl mx-auto">
            <SectionLabel>Gallery</SectionLabel>
            <GalleryGrid />
          </div>
        </section>

        {/* ── Schedule ── */}
        <section id="schedule" className="py-28 px-6 bg-mist">
          <div className="max-w-3xl mx-auto">
            <SectionLabel>The Day</SectionLabel>
            <h2
              className="text-forest text-5xl sm:text-6xl font-light italic mb-10 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              August 7, 2027
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
        <section id="travel" className="py-28 px-6">
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
              Free parking is available on site. Hotel recommendations coming soon.
            </p>

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

        {/* ── Registry ── */}
        <section id="registry" className="py-28 px-6 bg-mist">
          <div className="max-w-2xl mx-auto text-center">
            <SectionLabel>Registry</SectionLabel>
            <h2
              className="text-forest text-5xl sm:text-6xl font-light italic mb-8 leading-tight"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              Your presence is our gift
            </h2>
            <p className="text-bark/70 font-light leading-relaxed text-[15px] mb-6">
              Truly — having you there with us is all we could ask for. Please
              don&apos;t feel any obligation beyond showing up and celebrating
              with us.
            </p>
            <p className="text-bark/70 font-light leading-relaxed text-[15px]">
              That said, if you&apos;d like to contribute something, we
              gratefully accept donations toward our wedding and travel costs.
            </p>
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
            August 7, 2027 · Como Park Conservatory · Saint Paul, MN
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

const schedule = [
  {
    time: "4:00 PM",
    title: "Ceremony",
    space: "Enchanted Garden",
    note: "Guests should be seated by 3:45 PM. The Conservatory entrance is on Estabrook Drive.",
  },
  {
    time: "5:00 PM",
    title: "Cocktail Hour",
    space: "Sunken Garden",
    note: "Drinks and passed bites beneath the glass greenhouse and star chandeliers.",
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
