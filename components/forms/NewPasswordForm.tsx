"use client";

import { newPasswordSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useTransition, useState, useEffect } from "react";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { NewPasswordAction } from "@/actions/new-password";

export function NewPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [Error, setError] = useState<string | undefined>("");
  const [Success, setSuccess] = useState<string | undefined>("");
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const form = useForm<z.infer<typeof newPasswordSchema>>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    setToken(tokenFromUrl || "");
  }, [searchParams]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof newPasswordSchema>) {
    console.log(token);
    setError("");
    setSuccess("");

    startTransition(() => {
      NewPasswordAction(values, token).then((data: any) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Enter a new password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormError message={Error as string} />
            <FormSuccess message={Success as string} />
            <Button type="submit" disabled={isPending}>
              Reset password
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="p-0">
          <Link href="/login">Back to login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
