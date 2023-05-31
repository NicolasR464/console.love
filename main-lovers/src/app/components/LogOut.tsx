"use client";
import { signOut } from "next-auth/react";

const logout = () => signOut();

export default function LogOut() {
  return (
    <button onClick={logout} className="btn">
      LOG OUT
    </button>
  );
}
