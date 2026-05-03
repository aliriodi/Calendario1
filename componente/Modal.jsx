import { useState } from "react";

export default function EscudoModal({ imagenMesActual, mensaje }) {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
      {/* Botón que abre el modal */}
      <button
        type="button"
        onClick={() => setModalAbierto(true)}
        className="hidden lg:block"
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          width: "90px",
          height: "90px",
          zIndex: 15,
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <img
          src={imagenMesActual}
          alt="Escudo"
          style={{
            width: "90px",
            height: "90px",
            objectFit: "contain",
          }}
        />
      </button>

      {/* Modal */}
      {modalAbierto && (
        <div
          onClick={() => setModalAbierto(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              background: "linear-gradient(135deg, rgba(90,51,38,0.95), rgba(122,90,31,0.95), rgba(47,62,42,0.95))",
              border: "1px solid rgba(255,215,0,0.2)",
              color: "white",
              borderRadius: "16px",
              padding: "28px",
              maxWidth: "420px",
              width: "100%",
              boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            {/* Cerrar */}
            <button
              type="button"
              onClick={() => setModalAbierto(false)}
              style={{
                position: "absolute",
                top: "12px",
                right: "14px",
                background: "transparent",
                border: "none",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <h2 style={{ marginBottom: "12px", fontSize: "22px" }}>
              {imagenMesActual.nombre || ""}
            </h2>

            <p style={{ lineHeight: "1.6", fontSize: "16px" }}>
              {mensaje}
            </p>
          </div>
        </div>
      )}
    </>
  );
}