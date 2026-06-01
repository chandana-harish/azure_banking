import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "bank-document-evidence-system",
    time: new Date().toISOString()
  });
}
