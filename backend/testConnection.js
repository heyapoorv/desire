import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();  // Change 'user' to your actual table
  console.log(users);
}

main()
  .catch((e) => {
    console.error("❌ Error connecting:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
