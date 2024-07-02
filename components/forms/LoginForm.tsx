"use client";

import { loginSchema, registerSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { LoginAction } from "@/actions/login";
import { useTransition, useState } from "react";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import Link from "next/link";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [Error, setError] = useState<string | undefined>("");
  const [Success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(() => {
      LoginAction(values)
        .then((data: any) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch((error: any) => {
          setError("Error occurred");
          console.error("Registeration Error ", error);
        });
    });
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      type="email"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Password</FormLabel>
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
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="justify-between">
        <div className="space-x-1 flex items-center">
          <p> Dont have an account?</p>
          <Button variant="link" className="p-0">
            <Link href="/register">Register</Link>
          </Button>
        </div>
        <Button variant="link" className="p-0">
          <Link href="/reset-password">Forget Your Password?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
