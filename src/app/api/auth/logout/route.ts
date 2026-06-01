import { NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";
import { getRequiredEnv } from "@/lib/env";

export async function POST() {
  destroySession();
  return NextResponse.redirect(new URL("/login", getRequiredEnv("APP_URL")), 303);
}
