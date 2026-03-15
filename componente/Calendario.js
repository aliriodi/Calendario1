'use client'
import CalendarHead from '@/componente/Head'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { es } from 'date-fns/locale'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from 'date-fns'
import { fromZonedTime, formatInTimeZone } from 'date-fns-tz'
import { useMemo, useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const Imagenes = {
  Enero: {image:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg", escudo:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg"},
  Febrero: {image:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg",escudo:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg"},
  Marzo: {image:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg",escudo:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg"},
  Abril: {image:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg",escudo:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773605714/forex/forex_academy_professional_abrilescudo.png"},
  Mayo: {image:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg",escudo:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg"},
  Junio: {image:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg",escudo:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg"},
  Julio: {image:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg",escudo:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg"},
  Agosto: {image:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg",escudo:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg"},
  Septiembre:{image:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg",escudo:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg"},
  Octubre: {image:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg",escudo:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg"},
  Noviembre: {image:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg",escudo:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg"},
  Diciembre: {image:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg", escudo:"https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg"}
}
const actividadesMock = [
  // Pésaj
  {
    id: 1,
    title: 'Pésaj',
    date: '2026-04-01',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Pésaj',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Pésaj',
    date: '2026-04-02',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Pésaj',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Pésaj',
    date: '2026-04-03',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Pésaj',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Pésaj',
    date: '2026-04-04',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Pésaj',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Pésaj',
    date: '2026-04-05',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Pésaj',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Pésaj',
    date: '2026-04-06',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Pésaj',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'Pésaj',
    date: '2026-04-07',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Pésaj',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'Pésaj',
    date: '2026-04-08',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Pésaj',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 9,
    title: 'Pésaj',
    date: '2026-04-09',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Pésaj',
    image: 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1200&auto=format&fit=crop',
  },

  // Shavuot
  {
    id: 10,
    title: 'Shavuot',
    date: '2026-05-22',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Shavuot',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 11,
    title: 'Shavuot',
    date: '2026-05-23',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Shavuot',
    image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200&auto=format&fit=crop',
  },

  // Rosh Hashaná
  {
    id: 12,
    title: 'Rosh Hashaná',
    date: '2026-09-12',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Rosh Hashaná',
    image: 'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 13,
    title: 'Rosh Hashaná',
    date: '2026-09-13',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Rosh Hashaná',
    image: 'https://images.unsplash.com/photo-1473186505569-9c61870c11f9?q=80&w=1200&auto=format&fit=crop',
  },

  // Yom Kipur
  {
    id: 14,
    title: 'Yom Kipur',
    date: '2026-09-21',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Yom Kipur',
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=1200&auto=format&fit=crop',
  },

  // Sucot
  {
    id: 15,
    title: 'Sucot',
    date: '2026-09-26',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Sucot',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 16,
    title: 'Sucot',
    date: '2026-09-27',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Sucot',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 17,
    title: 'Sucot',
    date: '2026-09-28',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Sucot',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 18,
    title: 'Sucot',
    date: '2026-09-29',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Sucot',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 19,
    title: 'Sucot',
    date: '2026-09-30',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Sucot',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 20,
    title: 'Sucot',
    date: '2026-10-01',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Sucot',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: 21,
    title: 'Sucot',
    date: '2026-10-02',
    startTime: '19:00',
    endTime: '21:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Fiesta bíblica - Sucot',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  },
]

function buildUtcDate(date, time, timeZone) {
  return fromZonedTime(`${date}T${time}:00`, timeZone)
}

function normalizeActividad(actividad, userTimeZone) {
  const startUtc = buildUtcDate(
    actividad.date,
    actividad.startTime,
    actividad.createdTimeZone
  )

  const endUtc = buildUtcDate(
    actividad.date,
    actividad.endTime,
    actividad.createdTimeZone
  )

  return {
    ...actividad,
    startUtc,
    endUtc,
    localDateKey: formatInTimeZone(startUtc, userTimeZone, 'yyyy-MM-dd'),
    localDateLabel: formatInTimeZone(
      startUtc,
      userTimeZone,
      "EEEE d 'de' MMMM yyyy",
      { locale: es }
    ),
    localStartTime: formatInTimeZone(startUtc, userTimeZone, 'h:mm a', {
      locale: es,
    }),
    localEndTime: formatInTimeZone(endUtc, userTimeZone, 'h:mm a', {
      locale: es,
    }),
    originalStartTime: formatInTimeZone(
      startUtc,
      actividad.createdTimeZone,
      'h:mm a',
      { locale: es }
    ),
    originalEndTime: formatInTimeZone(
      endUtc,
      actividad.createdTimeZone,
      'h:mm a',
      { locale: es }
    ),
  }
}

export default function ScheduleDemo() {
  const today = startOfToday()
  const [selectedDay, setSelectedDay] = useState(today)
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

  const nombreMesActual =
  format(firstDayCurrentMonth, 'MMMM', { locale: es })
    .charAt(0)
    .toUpperCase() +
  format(firstDayCurrentMonth, 'MMMM', { locale: es }).slice(1)

const imagenMesActual = Imagenes[nombreMesActual]

  const userTimeZone =
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'

  const actividades = useMemo(() => {
    return actividadesMock.map((actividad) =>
      normalizeActividad(actividad, userTimeZone)
    )
  }, [userTimeZone])
  
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  })

  const actividadesDelDia = useMemo(() => {
    const selectedDayKey = format(selectedDay, 'yyyy-MM-dd')
    return actividades.filter(
      (actividad) => actividad.localDateKey === selectedDayKey
    )
  }, [selectedDay, actividades, ])

  function previousMonth() {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  return (
    <div>
      <CalendarHead />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="mx-auto max-w-6xl rounded-xl bg-white p-6 shadow">
          <h1 className="pb-4 mb-2 text-2xl font-bold text-gray-800">
            Calendario de actividades
          </h1>
          {/* 
        <p className="mb-1 text-sm text-gray-500">
          Zona horaria actual del navegador: <b>{userTimeZone}</b>
        </p>
        <p className="mb-6 text-sm text-gray-500">
          Las actividades se corrigen desde su zona de creación antes de renderizar.
        </p> */}

          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={previousMonth}
                  className="rounded bg-black p-2 text-white hover:bg-gray-500 cursor-pointer transition"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>

                <h2 className="text-lg font-semibold text-gray-800">
                  {format(firstDayCurrentMonth, 'MMMM yyyy', { locale: es })
                    .charAt(0)
                    .toUpperCase() +
                    format(firstDayCurrentMonth, 'MMMM yyyy', { locale: es }).slice(1)}
                </h2>

                <button
                  type="button"
                  onClick={nextMonth}
                  className="rounded bg-black p-2 text-white hover:bg-gray-500 cursor-pointer transition"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 rounded-t-lg bg-black text-center text-sm font-semibold text-white">
                <div className="py-2">Dom</div>
                <div className="py-2">Lun</div>
                <div className="py-2">Mar</div>
                <div className="py-2">Mié</div>
                <div className="py-2">Jue</div>
                <div className="py-2">Vie</div>
                <div className="py-2">Sáb</div>
              </div>

           
              <div className="relative border border-t-0 overflow-hidden rounded-b-lg">
  {/* Fondo decorativo */}
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: `url(${imagenMesActual["image"]})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.62,
    }}
  />

  {/* Capa aclaradora */}
  <div className="absolute inset-0 bg-white/55 pointer-events-none" />

  {/* Contenido real */}
  <div className="relative z-10 grid grid-cols-7 gap-1 p-2">
    {days.map((day, dayIdx) => {
      const dayKey = format(day, 'yyyy-MM-dd')

      const tieneActividad = actividades.some(
        (actividad) => actividad.localDateKey === dayKey
      )

      return (
        <div
          key={day.toString()}
          className={classNames(
            dayIdx === 0 && colStartClasses[getDay(day)],
            'py-1.5'
          )}
        >
          <button
            type="button"
            onClick={() => setSelectedDay(day)}
            className={classNames(
              isSameDay(day, selectedDay)
                ? 'bg-black text-white'
                : 'text-gray-800 hover:bg-gray-200',
              !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
              isToday(day) && !isSameDay(day, selectedDay) && 'font-bold',
              tieneActividad &&
                !isSameDay(day, selectedDay) &&
                'bg-yellow-300 text-black',
              'mx-auto flex h-10 w-10 items-center justify-center rounded-full cursor-pointer transition'
            )}
          >
            <time dateTime={format(day, 'yyyy-MM-dd')}>
              {format(day, 'd')}
            </time>
          </button>
        </div>
      )
    })}
  </div>
</div>
            </div>

            <aside className="relative rounded-xl border p-4">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Actividades del día
              </h3>

              <p className="mb-4 text-sm text-gray-500">
                {format(selectedDay, "EEEE d 'de' MMMM yyyy", { locale: es })}
              </p>

              {actividadesDelDia.length === 0 ? (
                <div>
                <p className="text-sm text-gray-500">
                  No hay actividades programadas para este día.
                </p>
               
                </div>
              ) : (
                <ul className="space-y-3">
                  {actividadesDelDia.map((actividad) => (
                    <li key={actividad.id} className="rounded-lg border p-3">
                      <h4 className="font-semibold text-gray-800">
                        {actividad.title}
                      </h4>

                      {/* <p className="text-sm text-gray-600">
                      <b>Hora local:</b> {actividad.localStartTime} - {actividad.localEndTime}
                    </p> */}

                      <p className="mt-1 text-sm text-gray-500">
                        {actividad.description}
                      </p>

                      {/* <p className="mt-2 text-xs text-gray-400">
                      Creada en <b>{actividad.createdTimeZone}</b>:
                      {' '}
                      {actividad.originalStartTime} - {actividad.originalEndTime}
                    </p> */}
                    </li>
                  ))}
                  
                </ul>
              )}<img
              src={imagenMesActual.escudo}
              alt="Escudo de Judá"
              style={{
                position: 'absolute',
                bottom: '10px',
                //right: '10px',
                left: '10px',
                width: '90px',
                height: '90px',
                objectFit: 'contain',
                zIndex: 15,
              }}
            />
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
]