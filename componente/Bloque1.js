import React from 'react'

function Bloque1() {

  const Imageback =
  "https://res.cloudinary.com/dvy9qircy/image/upload/v1773602099/forex/forex_academy_professional_bacgroundNavbar1.jpg"

  const ImageAhava =
  "https://res.cloudinary.com/dvy9qircy/image/upload/v1773603124/forex/forex_academy_professional_ImageAHAVA.png"

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

        backgroundImage: `
          linear-gradient(120deg,
          rgba(255,80,80,0.35),
          rgba(255,180,0,0.35),
          rgba(0,180,255,0.35),
          rgba(0,200,120,0.35)
          ),
          url(${Imageback})
        `,
        //backgroundSize: "cover",
       // backgroundPosition: "center"
      }}
    >

      <section
      
        style={{
          maxWidth: "1500px",
          padding: "20px",
          zIndex: 2
        }}
      >

        <img
          src={ImageAhava}
          alt="Ahava"
         className="logo-ahava"
        />

        <h1
          style={{
            fontSize: "clamp(2.5rem,6vw,5rem)",
            fontWeight: "300",
            marginBottom: "10px"
          }}
        >
          Bienvenid@ al Calendario Bíblico!
        </h1>

        <p
          style={{
            fontSize: "clamp(1.2rem,2vw,2rem)",
            opacity: "0.9"
          }}
        >
          La nueva herramienta para organizar tu año bíblicamente
        </p>

        <p
          style={{
            fontSize: "clamp(1.2rem,2vw,2rem)",
            opacity: "0.9"
          }}
        >
          y vivir la cultura del Reino de Yeshúa.
        </p>

      </section>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "150px",
          overflow: "hidden"
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
  )
}

export default Bloque1