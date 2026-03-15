import React from 'react'
import Link from "next/link"

function FooterAhava() {
  const fondoFooter =
    'https://res.cloudinary.com/dvy9qircy/image/upload/v1773602099/forex/forex_academy_professional_bacgroundNavbar1.jpg'

  return (
    <footer
    
      style={{
        position: 'relative',
        overflow: 'hidden',
        color: '#fff',
        backgroundImage: `
        linear-gradient(120deg,
            rgba(255,80,80,0.35),
            rgba(255,180,0,0.35),
            rgba(0,180,255,0.35),
            rgba(0,200,120,0.35)
            ),
          url(${fondoFooter})
        `,
       // backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="mx-auto max-w-6xl px-6 py-14"
        style={{
          backdropFilter: 'brightness(0.9)',
        }}
      >
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-3xl font-light">Phone</h3>
            <div
              className="mx-auto mb-4 h-[3px] w-28 rounded-full"
              style={{ backgroundColor: '#EC028D' }}
            />
            <p className="text-lg font-light text-white/90">01-23-8296312</p>
          </div>

          <div>
            <h3 className="mb-3 text-3xl font-light">Email</h3>
            <div
              className="mx-auto mb-4 h-[3px] w-28 rounded-full"
              style={{ backgroundColor: '#9906F4' }}
            />
            <p className="break-words text-lg font-light text-white/90">
              artistasprofeticos@gmail.com
            </p>
          </div>

          <div>
            <Link href="https://redilglobal.org/">
            <h3 className="mb-3 text-3xl font-light">Entrenamiento REDIL</h3>
            </Link>
            <div
              className="mx-auto mb-4 h-[3px] w-80 rounded-full"
              style={{ backgroundColor: '#001AFF' }}
            />
            <p className="text-lg font-light text-white/90">
              Formación y calendario bíblico
            </p>
          </div>
        </div>

        <div className="my-10 h-px w-full bg-white/50" />

        <p className="text-center text-2xl font-light text-white/70">
          © Compañía de Artistas Proféticos | Copyright 2024
        </p>
      </div>
    </footer>
  )
}

export default FooterAhava