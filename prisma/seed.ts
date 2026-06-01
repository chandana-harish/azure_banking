import bcrypt from "bcryptjs";
import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash("Admin12345!", 10);
  const customerPassword = await bcrypt.hash("Customer123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@trustbank.demo" },
    update: { passwordHash: adminPassword, role: UserRole.ADMIN },
    create: {
      email: "admin@trustbank.demo",
      passwordHash: adminPassword,
      role: UserRole.ADMIN
    }
  });

  const customerUser = await prisma.user.upsert({
    where: { email: "customer@trustbank.demo" },
    update: { passwordHash: customerPassword, role: UserRole.CUSTOMER },
    create: {
      email: "customer@trustbank.demo",
      passwordHash: customerPassword,
      role: UserRole.CUSTOMER
    }
  });

  await prisma.customer.upsert({
    where: { userId: customerUser.id },
    update: {},
    create: {
      userId: customerUser.id,
      fullName: "Alicia Morgan",
      customerNo: "CUST-100001",
      phone: "+1-555-0100",
      accounts: {
        create: {
          accountNumber: "1002003001",
          accountType: "Premier Checking",
          currency: "USD",
          availableBalance: 25000.0
        }
      }
    }
  });

  console.log("Seed complete", { admin: admin.email, customer: customerUser.email });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
