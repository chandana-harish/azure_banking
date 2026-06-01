import { NextRequest, NextResponse } from "next/server";
import { TransactionType } from "@prisma/client";
import { createTransaction } from "@/lib/banking";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { transactionSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
    }

    const input = transactionSchema.parse(await request.json());
    const transaction = await createTransaction(session.sub, TransactionType.DEPOSIT, input.amount, input.description);
    const saved = await prisma.transaction.findUniqueOrThrow({ where: { id: transaction.id } });

    return NextResponse.json({ transaction: saved });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to complete deposit.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
