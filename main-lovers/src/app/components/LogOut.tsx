"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogOut() {
  const router = useRouter();

  const logout = () => {
    signOut();
    router.push("/");
  };

  return (
    <button onClick={logout} className="btn">
      LOG OUT
    </button>
  );
}
