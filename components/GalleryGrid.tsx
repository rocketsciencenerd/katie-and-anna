"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

const photos = [
  { src: "/bench.jpg",     alt: "Katie and Anna on a park bench",          aspect: "aspect-[3/2]",  cols: "col-span-2 sm:col-span-2" },
  { src: "/bridge.jpg",    alt: "Katie and Anna on the Brooklyn Bridge",    aspect: "aspect-[3/4]",  cols: "col-span-1" },
  { src: "/landscape.jpg", alt: "Katie and Anna in the mountains",          aspect: "aspect-[4/3]",  cols: "col-span-2 sm:col-span-2" },
  { src: "/garden.jpg",    alt: "Anna in the garden",                       aspect: "aspect-[3/4]",  cols: "col-span-1" },
  { src: "/holiday.jpg",   alt: "Katie and Anna at a holiday event",        aspect: "aspect-[4/3]",  cols: "col-span-2 sm:col-span-2" },
  { src: "/archway.jpg",   alt: "Katie and Anna under a stone archway",     aspect: "aspect-[2/3]",  cols: "col-span-1" },
  { src: "/lake.jpg",      alt: "Katie and Anna by a lake",                 aspect: "aspect-[4/3]",  cols: "col-span-2 sm:col-span-2" },
  { src: "/park.jpg",      alt: "Katie and Anna in the park",               aspect: "aspect-[4/3]",  cols: "col-span-1 sm:col-span-1" },
  { src: "/mountain.png",  alt: "Katie and Anna in the mountains",          aspect: "aspect-[1/2]",  cols: "col-span-1" },
  { src: "/crosswalk.jpg", alt: "Katie and Anna crossing the street",       aspect: "aspect-[16/9]", cols: "col-span-2 sm:col-span-3" },
  { src: "/couple.jpeg",   alt: "Katie and Anna outside City Hall",         aspect: "aspect-[21/9]", cols: "col-span-2 sm:col-span-3", contain: true },
];

export default function GalleryGrid() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  const prev = useCallback(() =>
    setActive((i) => (i === null ? null : (i - 1 + photos.length) % photos.length)), []);

  const next = useCallback(() =>
    setActive((i) => (i === null ? null : (i + 1) % photos.length)), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, prev, next]);

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setActive(i)}
            className={`relative overflow-hidden cursor-zoom-in group ${photo.cols} ${photo.aspect} ${
              photo.contain ? "bg-forest" : ""
            }`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className={`${
                photo.contain ? "object-contain" : "object-cover object-center"
              } group-hover:scale-[1.02] transition-transform duration-700`}
              sizes={
                photo.cols.includes("col-span-3") ? "100vw" :
                photo.cols.includes("col-span-2") ? "(max-width:640px) 100vw, 66vw" :
                "(max-width:640px) 50vw, 33vw"
              }
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bark/95 backdrop-blur-sm"
          onClick={close}
        >
          {/* Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[active].src}
              alt={photos[active].alt}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Close */}
          <button
            onClick={close}
            className="absolute top-5 right-5 text-cream/60 hover:text-cream transition-colors text-2xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream transition-colors p-3"
            aria-label="Previous photo"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/60 hover:text-cream transition-colors p-3"
            aria-label="Next photo"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Counter */}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-cream/40 text-xs tracking-widest font-light">
            {active + 1} / {photos.length}
          </p>
        </div>
      )}
    </>
  );
}
