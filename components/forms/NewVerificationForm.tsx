"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { NewVerificationAction } from "@/actions/new-verification";
import FormError from "@/components/form-error";
import FormSucess from "@/components/form-success";
import { LoadingSpinner } from "../ui/LoadingSpinner";
const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error || !token) return;

    NewVerificationAction(token)
      .then((data: any) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <main>
      <div className="flex items-center justify-center w-full">
        {!success && !error && <LoadingSpinner />}
        <FormSucess message={success as string} />
        {!success && <FormError message={error as string} />}
      </div>
    </main>
  );
};

export default NewVerificationForm;
