"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { loginSchema } from "@/lib/zod-schema";
import { getExistingUser } from "@/lib/user";
import { signIn } from "@/auth";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "./mail";
export async function LoginAction(values: z.infer<typeof loginSchema>) {
  const validateField: any = loginSchema.safeParse(values);
  if (!validateField) {
    return {
      error: "Invalid Fields",
    };
  }
  const { email, password } = validateField.data;
  const existingUser = await getExistingUser(email);
  if (!existingUser) {
    return {
      error: "Email not found please register",
    };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email as string
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email Sent!" };
  }
  const passwordMatch = await bcrypt.compare(
    password,
    existingUser.password as string
  );
  if (!passwordMatch) {
    return { error: "Invalid Credentials!" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: "/home",
    });
    return { success: "Login Sucess!" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong!" };
  }
}
