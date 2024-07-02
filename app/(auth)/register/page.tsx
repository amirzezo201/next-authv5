import React from "react";
import { RegisterForm } from "@/components/forms/RegisterForm";
const Page = () => {
  return (
    <main className="h-screen w-[600px] mx-auto space-y-4 flex flex-col justify-center items-center">
      <RegisterForm />
    </main>
  );
};

export default Page;
