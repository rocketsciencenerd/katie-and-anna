import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You · Katie & Anna",
};

export default function ThankYou() {
  return (
    <main className="min-h-screen bg-forest flex flex-col items-center justify-center px-6 text-center">
      <p
        className="text-cream text-6xl sm:text-7xl font-light italic mb-6 leading-tight"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Thank you.
      </p>

      <div className="w-12 h-px bg-sage mx-auto mb-8" />

      <p className="text-cream/75 font-light text-[15px] leading-relaxed max-w-sm mb-3">
        Your generosity means so much to us. We&apos;re so grateful to have you in our lives, and we can&apos;t wait to celebrate with you.
      </p>

      <p className="text-cream/50 font-light text-sm mb-12">
        With love, Katie &amp; Anna
      </p>

      <Link
        href="/"
        className="text-cream/40 hover:text-cream text-xs tracking-widest uppercase transition-colors"
      >
        Back to our site
      </Link>
    </main>
  );
}
