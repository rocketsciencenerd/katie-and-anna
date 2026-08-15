"use client";

import { useState } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_RSVP_ENDPOINT ?? "";

type Step = "lookup" | "already" | "form" | "success" | "error";

interface ExistingRSVP {
  rsvpDate: string;
  attending: string;
  declining: string;
  email: string;
  dietary: string;
  note: string;
}

export default function RSVPForm() {
  const [step, setStep] = useState<Step>("lookup");
  const [nameInput, setNameInput] = useState("");
  const [looking, setLooking] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [lookupError, setLookupError] = useState(false);
  const [party, setParty] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [existing, setExisting] = useState<ExistingRSVP | null>(null);
  const [attending, setAttending] = useState<Record<string, boolean>>({});
  const [email, setEmail] = useState("");
  const [dietary, setDietary] = useState("");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    setLooking(true);
    setNotFound(false);
    setLookupError(false);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({ type: "lookup", name: nameInput.trim().replace(/\s+/g, " ") }),
      });
      const data = await res.json();
      if (data.result !== "found") {
        setNotFound(true);
        return;
      }
      setParty(data.party);
      setMembers(data.members);
      if (data.alreadyRsvped) {
        setExisting({
          rsvpDate: data.rsvpDate,
          attending: data.attending,
          declining: data.declining,
          email: data.email,
          dietary: data.dietary,
          note: data.note,
        });
        setStep("already");
      } else {
        const initial: Record<string, boolean> = {};
        data.members.forEach((m: string) => { initial[m] = true; });
        setAttending(initial);
        setStep("form");
      }
    } catch {
      setLookupError(true);
    } finally {
      setLooking(false);
    }
  }

  function handleUpdate() {
    const initial: Record<string, boolean> = {};
    members.forEach((m) => {
      initial[m] = existing?.attending.split(", ").includes(m) ?? true;
    });
    setAttending(initial);
    setEmail(existing?.email ?? "");
    setDietary(existing?.dietary ?? "");
    setNote(existing?.note ?? "");
    setStep("form");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    const attendingList = members.filter((m) => attending[m]);
    const decliningList = members.filter((m) => !attending[m]);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          type: "rsvp",
          party,
          attending: attendingList,
          declining: decliningList,
          email,
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
        <div className="flex items-center justify-center mb-4">
          {/* Heart outline */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-cream/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.25}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
          </svg>
        </div>
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

  if (step === "already" && existing) {
    const formattedDate = new Date(existing.rsvpDate).toLocaleDateString("en-US", {
      month: "long", day: "numeric", year: "numeric",
    });
    return (
      <div className="space-y-6">
        <div className="border border-cream/20 bg-cream/5 px-6 py-5">
          <p className="text-cream/50 text-xs tracking-widest uppercase font-light mb-1">RSVP received</p>
          <p className="text-cream text-2xl font-light italic mb-4" style={{ fontFamily: "var(--font-cormorant)" }}>
            {party}
          </p>
          <div className="space-y-2 text-sm font-light">
            {existing.attending && (
              <p className="text-cream/75">
                <span className="text-cream/40 tracking-widest uppercase text-xs mr-3">Attending</span>
                {existing.attending}
              </p>
            )}
            {existing.declining && (
              <p className="text-cream/75">
                <span className="text-cream/40 tracking-widest uppercase text-xs mr-3">Declining</span>
                {existing.declining}
              </p>
            )}
            {existing.dietary && (
              <p className="text-cream/75">
                <span className="text-cream/40 tracking-widest uppercase text-xs mr-3">Dietary</span>
                {existing.dietary}
              </p>
            )}
            {existing.note && (
              <p className="text-cream/75">
                <span className="text-cream/40 tracking-widest uppercase text-xs mr-3">Note</span>
                {existing.note}
              </p>
            )}
          </div>
          <p className="text-cream/30 text-xs font-light mt-4">Submitted {formattedDate}</p>
        </div>
        <button
          onClick={handleUpdate}
          className="w-full py-4 border border-cream/50 text-cream text-xs tracking-[0.25em] uppercase font-medium hover:bg-cream hover:text-forest transition-all duration-300"
        >
          Update my RSVP
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
          {lookupError && (
            <p className="mt-3 text-terracotta text-xs font-light leading-relaxed">
              Something went wrong connecting to the server. Please try again in a moment.
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

      <div>
        <label className={labelClass}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className={inputClass}
        />
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
