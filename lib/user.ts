import { db } from "@/drizzle/db";
import { User } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function getExistingUser(email: string) {
  try {
    const user = await db.query.User.findFirst({
      where: eq(User.email, email),
    });
    return user;
  } catch {
    return null;
  }
}
