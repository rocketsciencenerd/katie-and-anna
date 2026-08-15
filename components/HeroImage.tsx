"use client";

import Image from "next/image";
import { useState } from "react";

export default function HeroImage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Image
        src="/couple.jpeg"
        alt="Katie and Anna"
        fill
        priority
        className="object-cover"
        style={{
          objectPosition: "center 55%",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
        sizes="100vw"
        onLoad={() => setLoaded(true)}
      />
      <div className="absolute inset-0 bg-forest/45" />
    </>
  );
}
