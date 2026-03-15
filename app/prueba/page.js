'use client'

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

const actividadesMock = [
  {
    id: 1,
    title: 'Culto de oración',
    date: '2026-03-16',
    startTime: '19:00',
    endTime: '20:30',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Reunión de oración congregacional',
    assigned: false,
  },
  {
    id: 2,
    title: 'Ensayo de alabanza',
    date: '2026-03-18',
    startTime: '18:30',
    endTime: '20:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Práctica del ministerio de música',
    assigned: false,
  },
  {
    id: 3,
    title: 'Servicio dominical',
    date: '2026-03-22',
    startTime: '10:00',
    endTime: '12:00',
    createdTimeZone: 'America/Argentina/Buenos_Aires',
    description: 'Reunión principal de la iglesia',
    assigned: false,
  },
  {
    id: 4,
    title: 'Estudio bíblico',
    date: '2026-03-25',
    startTime: '19:00',
    endTime: '20:00',
    createdTimeZone: 'America/Caracas',
    description: 'Tema: fe, disciplina y crecimiento',
    assigned: false,
  },
  {
    id: 5,
    title: 'Reunión de jóvenes',
    date: '2026-03-28',
    startTime: '17:00',
    endTime: '19:00',
    createdTimeZone: 'America/Caracas',
    description: 'Actividad para jóvenes y adolescentes',
    assigned: false,
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
  }, [selectedDay, actividades])

  function previousMonth() {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 })
    setCurrentMonth(format(firstDayPreviousMonth, 'MMM-yyyy'))
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
  }

  return (
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

            <div className="grid grid-cols-7 gap-1 border border-t-0 p-2">
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
                          'bg-yellow-100 text-black',
                        'mx-auto flex h-10 w-10 items-center justify-center rounded-full'
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

          <aside className="rounded-xl border p-4">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Actividades del día
            </h3>

            <p className="mb-4 text-sm text-gray-500">
              {format(selectedDay, "EEEE d 'de' MMMM yyyy", { locale: es })}
            </p>

            {actividadesDelDia.length === 0 ? (
              <p className="text-sm text-gray-500">
                No hay actividades programadas para este día.
              </p>
            ) : (
              <ul className="space-y-3">
                {actividadesDelDia.map((actividad) => (
                  <li key={actividad.id} className="rounded-lg border p-3">
                    <h4 className="font-semibold text-gray-800">
                      {actividad.title}
                    </h4>

                    <p className="text-sm text-gray-600">
                      <b>Hora local:</b> {actividad.localStartTime} - {actividad.localEndTime}
                    </p>

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
            )}
          </aside>
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