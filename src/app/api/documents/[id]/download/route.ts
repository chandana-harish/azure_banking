import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";
import { generateReadUrl } from "@/lib/blob";
import { requireSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireSession();
  const doc = await prisma.blobDocument.findUnique({
    where: { id: params.id },
    include: {
      customer: {
        include: { user: true }
      }
    }
  });

  if (!doc) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }

  const isOwner = doc.customer.userId === session.sub;
  if (!isOwner && session.role !== UserRole.ADMIN) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const url = await generateReadUrl(doc.containerName, doc.blobPath);
  return NextResponse.redirect(url);
}
