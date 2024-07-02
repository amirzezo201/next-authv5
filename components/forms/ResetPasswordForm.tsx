"use client";

import { resetSchema } from "@/lib/zod-schema";
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
import { useTransition, useState } from "react";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { ResetPasswordAction } from "@/actions/reset-password";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import Link from "next/link";

export function ResetPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [Error, setError] = useState<string | undefined>("");
  const [Success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof resetSchema>) {
    startTransition(() => {
      ResetPasswordAction(values)
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
        <CardTitle>Forgot your password?</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
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

            <FormError message={Error as string} />
            <FormSuccess message={Success as string} />
            <Button type="submit" disabled={isPending}>
              Send Reset Email
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
