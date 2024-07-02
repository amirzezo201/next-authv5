import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";
interface formerror {
  message: string;
}
const FormError = ({ message }: formerror) => {
  if (!message) return null;
  return (
    <div className="bg-[#ef4444]/15 p-3 rounded-md flex justify-start items-center gap-x-2 text-sm text-[#ef4444]">
      <BsExclamationTriangle className="h-4 w-5" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
