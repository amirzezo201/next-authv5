"use server";
import { db } from "@/drizzle/db";
import { registerSchema } from "@/lib/zod-schema";
import * as z from "zod";
import bcrypt from "bcrypt";
import { getExistingUser } from "@/lib/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "./mail";
import { User } from "@/drizzle/schema";
import { v4 as uuidv4 } from "uuid";
export async function RegisterAction(values: z.infer<typeof registerSchema>) {
  const validateField: any = registerSchema.safeParse(values);
  if (!validateField) {
    return {
      errors: "Invalid Data",
    };
  }
  const { password, name, email } = validateField.data;
  const existingUser = await getExistingUser(email);
  if (existingUser) {
    return { error: "Email Already Exists" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.insert(User).values({
    id: uuidv4(),
    name: name,
    email: email,
    password: hashedPassword,
  });
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return {
    success: "Confirmation email is sent!",
  };
}
