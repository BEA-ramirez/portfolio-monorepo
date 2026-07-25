import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminEmail = "beaerinangelramirez@gmail.com";
  const plainTextPassword = "BEAnana123";

  console.log(`Seeding database: checking for ${adminEmail}...`);

  // hash password with bcrypt with 10 salt rounds
  const hashedPassword = await bcrypt.hash(plainTextPassword, 10);

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
    },
  });

  console.log("Success! Admin user created with ID:", user.id);
}

main()
  .catch((e) => {
    console.error("Error seeding database", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect(); // always disconnect from the db when the script finishes
  });
