"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return <button 
  className="inline-flex items-center gap-2  cursor-pointer rounded-2xl bg-[#014C6D] px-5 py-2.5 text-white font-medium shadow-sm hover:opacity-90 transition"
         onClick={() => signOut({ callbackUrl: "/" })}>
            Salir
            </button>;
} 