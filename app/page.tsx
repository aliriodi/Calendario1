import Image from "next/image";

import Bloque1 from "@/componente/Bloque1"
import Calendario from "@/componente/Calendario"
import Footer from "@/componente/Footer"

export default function Home() {
  return (
    <>
      <Bloque1 />
      <Calendario />
      <Footer />

    </>
  );
}
