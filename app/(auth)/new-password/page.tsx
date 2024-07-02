import { NewPasswordForm } from "@/components/forms/NewPasswordForm";
import React from "react";

const Page = () => {
  return (
    <main className="h-screen w-[600px] mx-auto space-y-4 flex flex-col justify-center items-center">
      <NewPasswordForm />
    </main>
  );
};

export default Page;
