import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // TODO: persist to Airtable / Google Sheets / email via Resend
  console.log("[RSVP]", new Date().toISOString(), body);

  return NextResponse.json({ ok: true }, { status: 200 });
}
