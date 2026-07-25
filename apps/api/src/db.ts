import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/client"; // Adjust path if needed based on your folder structure
import dotenv from "dotenv";

dotenv.config();

// initialize the db client exactly once
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// export to be used anywhere
export const prisma = new PrismaClient({ adapter });
