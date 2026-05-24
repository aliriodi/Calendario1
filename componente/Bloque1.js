"use client";
import React, { useState } from "react";

function Bloque1() {
  const opciones = {
    opcion1: {
      label: "Estilo 1",
      background:
        "https://res.cloudinary.com/dvy9qircy/image/upload/v1773602099/forex/forex_academy_professional_bacgroundNavbar1.jpg",
      image:
        "https://res.cloudinary.com/dvy9qircy/image/upload/v1773603124/forex/forex_academy_professional_ImageAHAVA.png",
      gradient: `
        linear-gradient(120deg,
          rgba(255,80,80,0.35),
          rgba(255,180,0,0.35),
          rgba(0,180,255,0.35),
          rgba(0,200,120,0.35)
        )
      `,
    },

    opcion2: {
      label: "Estilo 2",
      background:
        "https://res.cloudinary.com/dvy9qircy/image/upload/v1779648273/forex/forex_academy_professional_Fondo2CALENDARIO.png",
      image:
        "https://res.cloudinary.com/dvy9qircy/image/upload/v1779649639/forex/forex_academy_professional_ahava2Calenadario3.png",
      gradient: `
        linear-gradient(120deg,
          rgba(10,10,10,0.65),
          rgba(120,80,20,0.45),
          rgba(255,190,80,0.35)
        )
      `,
    },
    
    opcion3: {
      label: "Estilo 3",
      background:
        "https://res.cloudinary.com/dvy9qircy/image/upload/v1779648273/forex/forex_academy_professional_Fondo2CALENDARIO.png",
      image:
        "https://res.cloudinary.com/dvy9qircy/image/upload/v1779649639/forex/forex_academy_professional_ahava2Calenadario3.png",
      gradient: `
        linear-gradient(120deg,
          rgba(0,0,0,0),
          rgba(0,0,0,0),
          rgba(0,0,0,0)
        )
      `,
    }
  };

  const [estiloActivo, setEstiloActivo] = useState("opcion1");

  const data = opciones[estiloActivo];

  return (
    <header
      style={{
        position: "relative",
        width: "100%",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        color: "white",
        overflow: "hidden",
        backgroundImage: `${data.gradient}, url(${data.background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "all 0.5s ease",
      }}
    >
      <div
        className="flex gap-4 absolute top-6 z-20"
      >
        <button
          onClick={() => setEstiloActivo("opcion1")}
          className={`px-5 py-2 rounded-full text-white border ${
            estiloActivo === "opcion1"
              ? "bg-white/30 border-white"
              : "bg-black/30 border-white/40"
          }`}
        >
          Estilo 1
        </button>

        <button
          onClick={() => setEstiloActivo("opcion2")}
          className={`px-5 py-2 rounded-full text-white border ${
            estiloActivo === "opcion2"
              ? "bg-white/30 border-white"
              : "bg-black/30 border-white/40"
          }`}
        >
          Estilo 2
        </button>
        <button
          onClick={() => setEstiloActivo("opcion3")}
          className={`px-5 py-2 rounded-full text-white border ${
            estiloActivo === "opcion3"
              ? "bg-white/30 border-white"
              : "bg-black/30 border-white/40"
          }`}
        >
          Estilo 3
        </button>
      </div>

      <section
        className="flex flex-col pb-2 items-center justify-center text-center"
        style={{
          maxWidth: "1200px",
          padding: "20px",
          zIndex: 2,
        }}
      >
        <div className="w-[420px] h-[160px] flex items-center justify-center mb-6">
  <img
    src={data.image}
    alt="Ahava"
    className="max-w-full max-h-full object-contain"
  />
</div>

        <h1 className="text-white text-6xl font-light mb-4">
          Bienvenid@ al Calendario Bíblico!
        </h1>

        <h1 className="text-white text-3xl font-light pb-4">
          La nueva herramienta para organizar tu año bíblicamente
        </h1>

        <p className="text-white text-3xl font-light pb-30">
          y vivir la cultura del Reino de Yeshúa.
        </p>
      </section>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "150px",
          overflow: "hidden",
        }}
      >
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          style={{ width: "100%", height: "100%" }}
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 
               L500.00,150.00 L0.00,150.00 Z"
            style={{ fill: "#ffffff" }}
          />
        </svg>
      </div>
    </header>
  );
}

export default Bloque1;