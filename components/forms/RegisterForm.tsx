"use client";

import { registerSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { RegisterAction } from "@/actions/register";
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
import { useState, useTransition } from "react";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import Link from "next/link";
export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const [Error, setError] = useState<string | undefined>("");
  const [Success, setSuccess] = useState<string | undefined>("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof registerSchema>) {
    startTransition(() => {
      RegisterAction(values)
        .then((data: any) => {
          console.log(data);
          setError(data.error);
          setSuccess(data.success);
        })
        .catch((error) => {
          setError("Error occurred");
          console.error("Registeration Error ", error);
        });
    });
  }
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Register</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Input Name"
                      type="text"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
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
            <FormError message={Error as string} />
            <FormSuccess message={Success as string} />
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="p-0">
          <Link href="/login">Already have an account?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
