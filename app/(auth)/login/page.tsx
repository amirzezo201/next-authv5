import { LoginForm } from "@/components/forms/LoginForm";
import React from "react";

const Page = () => {
  return (
    <main className="h-screen w-[600px] mx-auto space-y-4 flex flex-col justify-center items-center">
      <LoginForm />
    </main>
  );
};

export default Page;
