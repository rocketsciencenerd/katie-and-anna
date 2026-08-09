"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function RSVPForm() {
  const [state, setState] = useState<FormState>("idle");
  const [attending, setAttending] = useState<"yes" | "no" | "">("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">♡</div>
        <p
          className="font-serif text-stone text-3xl italic mb-3"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          Thank you!
        </p>
        <p className="text-stone/70 font-light text-sm">
          We&apos;ve received your RSVP and can&apos;t wait to see you.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label className={labelClass}>Full name</label>
        <input
          name="name"
          type="text"
          required
          placeholder="Your name"
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email</label>
        <input
          name="email"
          type="email"
          required
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      {/* Attending */}
      <fieldset>
        <legend className={labelClass}>Will you attend?</legend>
        <div className="flex gap-4 mt-2">
          {(["yes", "no"] as const).map((val) => (
            <label
              key={val}
              className={`flex-1 flex items-center justify-center gap-2 border rounded-sm py-3 cursor-pointer text-sm font-light tracking-wide transition-all ${
                attending === val
                  ? "border-stone bg-stone/20 text-stone"
                  : "border-stone/30 text-stone/60 hover:border-stone/60"
              }`}
            >
              <input
                type="radio"
                name="attending"
                value={val}
                required
                className="sr-only"
                onChange={() => setAttending(val)}
              />
              {val === "yes" ? "Joyfully accepts" : "Regretfully declines"}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Guest count — only shown if attending */}
      {attending === "yes" && (
        <>
          <div>
            <label className={labelClass}>Number of guests (including you)</label>
            <select name="guests" defaultValue="1" className={inputClass}>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>
              Dietary restrictions or allergies
            </label>
            <input
              name="dietary"
              type="text"
              placeholder="None, vegetarian, vegan, gluten-free…"
              className={inputClass}
            />
          </div>
        </>
      )}

      {/* Note */}
      <div>
        <label className={labelClass}>Anything else? (optional)</label>
        <textarea
          name="note"
          rows={3}
          placeholder="A message for Katie & Anna…"
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full py-4 border border-stone text-stone text-xs tracking-[0.25em] uppercase font-medium hover:bg-stone hover:text-wine transition-all duration-300 disabled:opacity-50"
      >
        {state === "loading" ? "Sending…" : "Send RSVP"}
      </button>

      {state === "error" && (
        <p className="text-center text-stone/60 text-sm font-light">
          Something went wrong — please try again or email us directly.
        </p>
      )}
    </form>
  );
}

const labelClass =
  "block text-xs tracking-widest uppercase text-stone/60 font-light mb-2";

const inputClass =
  "w-full bg-transparent border border-stone/30 rounded-sm px-4 py-3 text-stone placeholder:text-stone/30 text-sm font-light focus:outline-none focus:border-stone transition-colors";
