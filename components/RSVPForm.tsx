"use client";

import { useState } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_RSVP_ENDPOINT ?? "";

type Step = "lookup" | "form" | "success" | "error";

export default function RSVPForm() {
  const [step, setStep] = useState<Step>("lookup");
  const [nameInput, setNameInput] = useState("");
  const [looking, setLooking] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [party, setParty] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [attending, setAttending] = useState<Record<string, boolean>>({});
  const [dietary, setDietary] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setLooking(true);
    setNotFound(false);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "lookup", name: nameInput.trim() }),
      });
      const data = await res.json();
      if (data.found) {
        setParty(data.party);
        setMembers(data.members);
        const initial: Record<string, boolean> = {};
        data.members.forEach((m: string) => { initial[m] = true; });
        setAttending(initial);
        setStep("form");
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLooking(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const attendingList = members.filter((m) => attending[m]);
    const decliningList = members.filter((m) => !attending[m]);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "rsvp",
          party,
          attending: attendingList,
          declining: decliningList,
          dietary,
          note,
        }),
      });
      const data = await res.json();
      if (data.result === "success") setStep("success");
      else setStep("error");
    } catch {
      setStep("error");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "success") {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">♡</div>
        <p className="text-cream text-3xl font-light italic mb-3" style={{ fontFamily: "var(--font-cormorant)" }}>
          Thank you!
        </p>
        <p className="text-cream/65 font-light text-sm">
          We&apos;ve received your RSVP and can&apos;t wait to celebrate with you.
        </p>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="text-center py-8">
        <p className="text-cream/65 font-light text-sm">
          Something went wrong — please try again or reach out to us directly.
        </p>
        <button onClick={() => setStep("lookup")} className="mt-4 text-cream/50 hover:text-cream text-xs tracking-widest uppercase transition-colors">
          Try again
        </button>
      </div>
    );
  }

  if (step === "lookup") {
    return (
      <form onSubmit={handleLookup} className="space-y-6">
        <div>
          <label className={labelClass}>Your name</label>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => { setNameInput(e.target.value); setNotFound(false); }}
            required
            placeholder="First and last name"
            className={inputClass}
          />
          {notFound && (
            <p className="mt-3 text-cream/50 text-xs font-light leading-relaxed">
              We couldn&apos;t find your name on the guest list. Please double-check the spelling or contact us directly.
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={looking}
          className="w-full py-4 border border-cream/50 text-cream text-xs tracking-[0.25em] uppercase font-medium hover:bg-cream hover:text-forest transition-all duration-300 disabled:opacity-50"
        >
          {looking ? "Looking…" : "Find my invitation"}
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <p className={labelClass}>Your party</p>
        <p className="text-cream text-2xl font-light italic" style={{ fontFamily: "var(--font-cormorant)" }}>
          {party}
        </p>
      </div>

      <fieldset className="space-y-3">
        <legend className={labelClass}>Who&apos;s attending?</legend>
        {members.map((member) => (
          <label
            key={member}
            className={`flex items-center justify-between border px-5 py-4 cursor-pointer transition-all ${
              attending[member]
                ? "border-cream bg-cream/15 text-cream"
                : "border-cream/25 text-cream/50"
            }`}
          >
            <span className="text-sm font-light">{member}</span>
            <div className="flex gap-4 text-xs tracking-wide">
              <span
                onClick={(e) => { e.preventDefault(); setAttending((a) => ({ ...a, [member]: true })); }}
                className={`cursor-pointer transition-colors ${attending[member] ? "text-cream" : "text-cream/30 hover:text-cream/60"}`}
              >
                Attending
              </span>
              <span className="text-cream/20">·</span>
              <span
                onClick={(e) => { e.preventDefault(); setAttending((a) => ({ ...a, [member]: false })); }}
                className={`cursor-pointer transition-colors ${!attending[member] ? "text-cream" : "text-cream/30 hover:text-cream/60"}`}
              >
                Declining
              </span>
            </div>
          </label>
        ))}
      </fieldset>

      {members.some((m) => attending[m]) && (
        <div>
          <label className={labelClass}>Dietary restrictions or allergies</label>
          <input
            type="text"
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
            placeholder="None, vegetarian, vegan, gluten-free…"
            className={inputClass}
          />
        </div>
      )}

      <div>
        <label className={labelClass}>Anything else? (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="A message for Katie & Anna…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 border border-cream/50 text-cream text-xs tracking-[0.25em] uppercase font-medium hover:bg-cream hover:text-forest transition-all duration-300 disabled:opacity-50"
      >
        {submitting ? "Sending…" : "Send RSVP"}
      </button>
    </form>
  );
}

const labelClass = "block text-xs tracking-widest uppercase text-cream/50 font-light mb-2";
const inputClass = "w-full bg-transparent border border-cream/25 px-4 py-3 text-cream placeholder:text-cream/25 text-sm font-light focus:outline-none focus:border-cream/60 transition-colors";
