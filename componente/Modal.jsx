import { useState } from "react";

export default function EscudoModal({ imagenMesActual, mensaje, data }) {
  const [modalAbierto, setModalAbierto] = useState(false);
  function getHexFromTailwindBg(twColor) {
    const match = twColor?.match(/\[#(.+?)\]/)
    return match ? `#${match[1]}` : "#8B0000"
  }
  const colorMes = getHexFromTailwindBg(data?.color)
  return (
    <>
      <button
  type="button"
  onClick={() => setModalAbierto(true)}
  className="hidden lg:flex absolute bottom-[10px] left-[10px] z-20 flex-col items-center justify-center cursor-pointer border-0 bg-transparent p-0"
>
  <img
    src={imagenMesActual}
    alt="Escudo"
    className="h-[90px] w-[90px] object-contain drop-shadow-xl"
  />

  <p className="mt-1 text-center text-xs font-semibold text-black">
    {data?.Tribu}
  </p>
</button>

      {modalAbierto && (
        <div
          onClick={() => setModalAbierto(false)}
          className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-10"
        >
          {/* <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-2xl border border-white/15 bg-gradient-to-br from-black/90 via-black/80 to-black/70 p-7 text-white shadow-2xl"
          > */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-2xl p-7 text-white shadow-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,0,0,0.94), rgba(0,0,0,0.78))",
            
              border: `2px solid ${colorMes}`,
            
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.10),
                0 25px 80px rgba(0,0,0,0.65),
                0 0 30px ${colorMes}AA
              `,
            }}
           
            // style={{
            //   background:
            //     "linear-gradient(135deg, rgba(0,0,0,0.94), rgba(0,0,0,0.78))",
            
            //   border: `2px solid ${colorMes}`,
            
            //   boxShadow: `
            //     0 0 0 1px rgba(255,255,255,0.10),
            //     0 25px 80px rgba(0,0,0,0.65),
            //     0 0 30px ${colorMes}55
            //   `,
            // }}
           
            // style={{
            //   background:
            //     "linear-gradient(135deg, rgba(0,0,0,0.94), rgba(0,0,0,0.78))",
            //   border: `2px solid ${colorMes}`,
            //   boxShadow: `0 0 0 1px rgba(255,255,255,0.12), 0 25px 80px rgba(0,0,0,0.65), 0 0 40px ${colorMes}66`,
            // }}
          >
            <div
              className="absolute left-0 top-0 h-2 w-full rounded-t-2xl"
              style={{ background: colorMes }}
            />
            <button
              type="button"
              onClick={() => setModalAbierto(false)}
              className="absolute right-4 top-3 text-3xl text-white hover:opacity-70"
            >
              ×
            </button>

            <div className="mb-6 flex items-center gap-4">
              <img
                src={imagenMesActual}
                alt="Escudo"
                className="h-20 w-20 object-contain"
              />

              <div>
                <h2 className="text-2xl font-bold">
                  {data?.Mes || "Detalle del mes"}
                </h2>

                {/* {mensaje && (
                  <p className="mt-1 text-sm text-white/80">
                    {mensaje}
                  </p>
                )} */}
              </div>
            </div>

            {data?.modal && (
              <div className="space-y-7 text-sm">
                <section
                  className="rounded-xl border bg-white/10 p-5"
                  style={{ borderColor: `${colorMes}80` }}
                >
                  {/* <section className="rounded-xl border border-white/10 bg-white/10 p-5"> */}
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-yellow-200">
                    Acontecimientos bíblicos clave
                  </h3>

                  <div className="space-y-2">
                    {data.modal.acontecimientos?.map((item, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-[110px_1fr] gap-4 border-b border-white/10 pb-2 last:border-b-0"
                      >
                        <span className="font-bold text-yellow-200">
                          {item.referencia}
                        </span>

                        <p className="leading-relaxed text-white/90">
                          {item.texto}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section
                  className="rounded-xl border bg-white/10 p-5"
                  style={{ borderColor: `${colorMes}80` }}
                >
                {/* <section className="rounded-xl border border-white/10 bg-white/10 p-5"> */}
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-yellow-200">
                    Características de la tribu
                  </h3>

                  <ul className="space-y-2">
                    {data.modal.caracteristicas?.map((item, index) => (
                      <li key={index} className="leading-relaxed text-white/90">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section
                  className="rounded-xl bg-black/35 p-5"
                  style={{ borderLeft: `5px solid ${colorMes}` }}
                >
                  {/* <section className="rounded-xl border-l-4 border-yellow-300 bg-black/35 p-5"> */}
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wide text-yellow-200">
                    Instrucción profética
                  </h3>

                  <p className="leading-relaxed text-white/95">
                    {data.modal.instruccion}
                  </p>
                </section>

                <section>
                  <h3 className="mb-4 text-xs font-bold uppercase tracking-wide text-yellow-200">
                    Versículos clave
                  </h3>
                  {/* <section
                  className="rounded-xl border bg-white/10 p-5"
                  style={{ borderColor: `${colorMes}80` }}
                > */}
                  <div className="space-y-3">
                    {data.modal.versiculos?.map((item, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-white/10 bg-white/10 p-4"
                        style={{ borderColor: `${colorMes}80` }}
                      >
                        <p className="italic leading-relaxed text-white/90">
                          "{item.texto}"
                        </p>

                        <p className="mt-3 text-right font-bold text-yellow-200">
                          {item.referencia}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}