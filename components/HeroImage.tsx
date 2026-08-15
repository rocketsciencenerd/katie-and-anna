import Image from "next/image";

export default function HeroImage() {
  return (
    <>
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
    </>
  );
}
