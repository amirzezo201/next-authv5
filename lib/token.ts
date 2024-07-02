import { getExistingVerificationTokenByEmail } from "./verfication-token";
import { v4 as uuidv4 } from "uuid";
import { eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { VerificationToken, ResetPasswordToken } from "@/drizzle/schema";
import { getPasswordTokenByEmail } from "./password-token";
export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getExistingVerificationTokenByEmail(email);
  if (existingToken) {
    await db
      .delete(VerificationToken)
      .where(eq(VerificationToken.id, existingToken.id));
  }
  const verficationTokenData = await db
    .insert(VerificationToken)
    .values({
      id: uuidv4(),
      email,
      token,
      expires,
    })
    .returning();
  return verficationTokenData[0];
};
export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await getPasswordTokenByEmail(email);
  if (existingToken) {
    await db
      .delete(ResetPasswordToken)
      .where(eq(ResetPasswordToken.id, existingToken.id));
  }
  const PasswordTokenData = await db
    .insert(ResetPasswordToken)
    .values({
      id: uuidv4(),
      email,
      token,
      expires,
    })
    .returning();
  return PasswordTokenData[0];
};
