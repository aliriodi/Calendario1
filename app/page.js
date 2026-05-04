"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

import Bloque1 from "@/componente/Bloque1"
import Calendario2 from "@/componente/Calendario2.jsx"
import Calendario from "@/componente/Calendario.js"
import Footer from "@/componente/Footer"
import Logout from "@/componente/Logout"
import Login from "@/componente/LoginHome"

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <>
      <Bloque1 />
      { !session && <Login/>}
      {session &&<Calendario /> }
      {/* 🔥 Solo mostrar si hay sesión */}
      {session &&  <div className="bg-white px-4 pb-4 flex justify-start"><Logout /></div>}
      <Footer />

    </>
  );
}
