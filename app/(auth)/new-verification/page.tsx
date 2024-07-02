export const dynamic = "force-dynamic";

import React from "react";
import NewVerificationForm from "@/components/forms/NewVerificationForm";
const Page = () => {
  return (
    <main className="h-screen flex flex-col justify-center items-center">
      <NewVerificationForm />
    </main>
  );
};

export default Page;
