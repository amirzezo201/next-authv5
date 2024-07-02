import * as z from "zod";
export const registerSchema = z.object({
  email: z.string().email({
    message: "Email address is required",
  }),
  password: z.string().min(8, {
    message: "Password should be at least 8 characters",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const loginSchema = z.object({
  email: z.string().email({
    message: "Email address is required",
  }),
  password: z.string().min(8, {
    message: "Password should be at least 8 characters",
  }),
  callbackUrl: z.string().optional(),
});
export const resetSchema = z.object({
  email: z.string().email({
    message: "Email address is required",
  }),
});
export const newPasswordSchema = z
  .object({
    password: z.string().min(6, {
      message: "Minimum 6 characters required!",
    }),
    confirmPassword: z.string().min(6, {
      message: "Minimum 6 characters required!",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // set the path of the error
  });
