"use server";
import { db } from "@/drizzle/db";
import { User, VerificationToken } from "@/drizzle/schema";
import { getExistingUser } from "@/lib/user";
import {
  getExistingVerificationTokenByEmail,
  getExistingVerificationTokenByToken,
} from "@/lib/verfication-token";
import { eq } from "drizzle-orm";

export async function NewVerificationAction(token: string) {
  // Fetch the existing token using the provided token string
  const existingToken = await getExistingVerificationTokenByToken(token);
  // Check if the token exists
  if (!existingToken) {
    return { error: "Verification token not found" };
  }

  // Check if the token has expired
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  // Fetch the existing user using the email from the token
  const existingUser = await getExistingUser(existingToken.email);
  if (!existingUser?.email) {
    return { error: "Email does not exist" };
  }
  await db
    .update(User)
    .set({
      name: "hero",
      email: existingToken.email,
      emailVerified: new Date(),
    })
    .where(eq(User.id, existingUser.id));
  await db
    .delete(VerificationToken)
    .where(eq(VerificationToken.id, existingToken.id));
  return { success: "Email verified!" };
}
