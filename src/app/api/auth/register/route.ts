import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { createSession, hashPassword } from "@/lib/auth";
import { registerCustomer } from "@/lib/banking";
import { getRequiredEnv } from "@/lib/env";
import { registerSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const raw = Object.fromEntries((await request.formData()).entries());
    const input = registerSchema.parse(raw);

    const user = await registerCustomer({
      fullName: input.fullName,
      email: input.email,
      phone: input.phone || undefined,
      passwordHash: await hashPassword(input.password)
    });

    await createSession({
      sub: user.id,
      role: user.role,
      email: user.email
    });

    return NextResponse.redirect(new URL("/dashboard", getRequiredEnv("APP_URL")), 303);
  } catch (error) {
    const message =
      error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"
        ? "An account with that email already exists."
        : error instanceof Error
          ? error.message
          : "Unable to register.";
    return NextResponse.redirect(
      new URL(`/register?error=${encodeURIComponent(message)}`, getRequiredEnv("APP_URL")),
      303
    );
  }
}
