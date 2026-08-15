"use client";

import { useState, useLayoutEffect } from "react";

const PASSWORD = process.env.NEXT_PUBLIC_SITE_PASSWORD ?? "";
const SESSION_KEY = "ka_auth";

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    setAuthed(sessionStorage.getItem(SESSION_KEY) === "1");
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input === PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
    } else {
      setError(true);
      setInput("");
    }
  }

  return (
    <>
      {/* Always rendered so images preload behind the gate */}
      {children}

      {/* Fixed overlay — hidden by CSS immediately for authed users before React hydrates */}
      {authed !== true && (
        <div data-gate="" className="fixed inset-0 z-[9999] bg-forest flex flex-col items-center justify-center px-6">
          <p
            className="text-cream text-5xl sm:text-6xl font-light italic mb-2"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Katie &amp; Anna
          </p>
          <p className="text-cream/50 text-xs tracking-widest uppercase mb-12">
            August 7, 2027
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 w-full max-w-xs">
            <input
              type="password"
              value={input}
              onChange={(e) => { setInput(e.target.value); setError(false); }}
              placeholder="Password"
              autoFocus
              className="w-full bg-transparent border-b border-cream/30 text-cream placeholder-cream/30 text-center text-sm font-light tracking-widest py-3 outline-none focus:border-cream/60 transition-colors"
            />
            {error && (
              <p className="text-terracotta text-xs tracking-widest uppercase">Incorrect password</p>
            )}
            <button
              type="submit"
              className="mt-2 text-cream/60 hover:text-cream text-xs tracking-widest uppercase transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      )}
    </>
  );
}
