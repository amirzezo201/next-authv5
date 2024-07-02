import { getExistingUser } from "@/lib/user";
import { resetSchema } from "@/lib/zod-schema";
import * as z from "zod";
import { generateResetPasswordToken } from "@/lib/token";
import { sendResetEmail } from "./mail";
export async function ResetPasswordAction(values: z.infer<typeof resetSchema>) {
  const validateField: any = resetSchema.safeParse(values);
  if (!validateField) {
    return {
      error: "Invalid Fields",
    };
  }
  const existingUser = await getExistingUser(values.email);
  if (!existingUser?.email) {
    return { error: "Email Doesnt Exist" };
  }
  const ResetToken = await generateResetPasswordToken(values.email);
  await sendResetEmail(ResetToken.email, ResetToken.token);
  return {
    success: "Reset Password Email is sent successfully!",
  };
}
