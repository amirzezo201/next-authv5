import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { VerificationToken } from "@/drizzle/schema";
export const getExistingVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.query.VerificationToken.findFirst({
      where: eq(VerificationToken.email, email),
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
export const getExistingVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.query.VerificationToken.findFirst({
      where: eq(VerificationToken.token, token),
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
