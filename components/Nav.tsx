"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#story", label: "Our Story" },
  { href: "#gallery", label: "Gallery" },
  { href: "#schedule", label: "Schedule" },
  { href: "#travel", label: "Travel" },
  { href: "#registry", label: "Registry" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,color,box-shadow] duration-500 will-change-transform ${
        scrolled
          ? "bg-cream/95 shadow-sm text-bark"
          : "bg-transparent text-cream"
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="text-xl italic tracking-wide transition-opacity hover:opacity-60"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          K &amp; A
        </a>

        {/* Desktop links */}
        <ul className="hidden sm:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs tracking-widest uppercase font-light hover:opacity-60 transition-opacity"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`block w-5 h-px transition-all ${scrolled ? "bg-bark" : "bg-cream"} ${
                i === 0 && open ? "rotate-45 translate-y-[7px]" : ""
              } ${i === 1 && open ? "opacity-0" : ""} ${
                i === 2 && open ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          ))}
        </button>
      </nav>

      {open && (
        <div className="sm:hidden bg-cream text-bark border-t border-stone/40 px-6 py-4">
          <ul className="flex flex-col gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-xs tracking-widest uppercase font-light"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
