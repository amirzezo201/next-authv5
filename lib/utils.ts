import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
