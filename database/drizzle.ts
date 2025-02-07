import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import config from "@/lib/config";

// config({ path: ".env" }); // or .env.local
console.log("database url", process.env.DATABASE_URL!);
const db_url = process.env.NEXT_PUBLIC_DATABASE_URL!;
const sql = neon(db_url!);
console.log("sql", sql);
export const db = drizzle({ client: sql });
