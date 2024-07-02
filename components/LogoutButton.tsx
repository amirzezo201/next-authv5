"use client";
import { logout } from "@/actions/logout";

interface LogoutButtonProps {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };

  return (
    <span
      onClick={onClick}
      className="text-white bg-black px-6 py-3 rounded cursor-pointer"
    >
      Logout
    </span>
  );
};
