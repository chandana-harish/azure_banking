import { NextRequest, NextResponse } from "next/server";
import { createSession, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getRequiredEnv } from "@/lib/env";
import { loginSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    const raw =
      contentType.includes("application/json")
        ? await request.json()
        : Object.fromEntries((await request.formData()).entries());
    const input = loginSchema.parse(raw);

    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user || !(await verifyPassword(input.password, user.passwordHash))) {
      throw new Error("Invalid credentials.");
    }

    await createSession({
      sub: user.id,
      role: user.role,
      email: user.email
    });

    return NextResponse.redirect(new URL("/dashboard", getRequiredEnv("APP_URL")), 303);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to login.";
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(message)}`, getRequiredEnv("APP_URL")),
      303
    );
  }
}
