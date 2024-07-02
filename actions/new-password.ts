import { db } from "@/drizzle/db";
import { ResetPasswordToken, User } from "@/drizzle/schema";
import { getPasswordTokenByToken } from "@/lib/password-token";
import { getExistingUser } from "@/lib/user";
import { newPasswordSchema } from "@/lib/zod-schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import * as z from "zod";
export async function NewPasswordAction(
  values: z.infer<typeof newPasswordSchema>,
  token: string | null
) {
  if (!token) {
    return { error: "Missing token!" };
  }
  const validateField: any = newPasswordSchema.safeParse(values);
  if (!validateField) {
    return {
      error: "Invalid Fields",
    };
  }
  const { password } = validateField.data;
  const existingToken = await getPasswordTokenByToken(token);
  console.log("Data", existingToken);
  if (!existingToken) {
    return { error: "Password token not found" };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }
  const existingUser = await getExistingUser(existingToken.email);
  if (!existingUser?.email) {
    return { error: "Email does not exist" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db
    .update(User)
    .set({
      password: hashedPassword,
    })
    .where(eq(User.id, existingUser.id));
  await db
    .delete(ResetPasswordToken)
    .where(eq(ResetPasswordToken.id, existingToken.id));
  return { success: "Password is successfully Updated" };
}
