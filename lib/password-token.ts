import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { ResetPasswordToken } from "@/drizzle/schema";
export const getPasswordTokenByEmail = async (email: string) => {
  try {
    const PasswordToken = await db.query.ResetPasswordToken.findFirst({
      where: eq(ResetPasswordToken.email, email),
    });
    return PasswordToken;
  } catch (error) {
    return null;
  }
};
export const getPasswordTokenByToken = async (token: string) => {
  console.log(token, "They are here =======>");

  try {
    const PasswordToken = await db.query.ResetPasswordToken.findFirst({
      where: eq(ResetPasswordToken.token, token),
    });
    console.log(token, "They are here =======>", PasswordToken, "why");

    return PasswordToken;
  } catch (error) {
    return null;
  }
};
