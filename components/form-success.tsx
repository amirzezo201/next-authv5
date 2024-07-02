import React from "react";
import { BsCheck2Circle } from "react-icons/bs";
interface formsuccess {
  message: string;
}
const FormSuccess = ({ message }: formsuccess) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex justify-start items-center gap-x-2 text-sm text-emerald-500">
      <BsCheck2Circle className="h-4 w-5" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;
