'use client'

import CalendarHead from '@/componente/Head'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { es } from 'date-fns/locale'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isToday,
  parse,
  startOfMonth,
  startOfToday,
  startOfWeek,
} from 'date-fns'
import { useMemo, useState } from 'react'
import {
  HebrewCalendar,
  HDate,
  Location,
  flags,
} from '@hebcal/core'

const hebcalLocation = Location.lookup('Buenos Aires')

function getHebrewInfo(date) {
  const hdate = new HDate(date)

  const events = HebrewCalendar.calendar({
    start: date,
    end: date,
    isHebrewYear: false,
    sedrot: true,
    omer: true,
    candlelighting: false,
    location: hebcalLocation,
  })

  const cleanEvents = events.map((event) => {
    const eventFlags = event.getFlags()

    return {
      title: event.render('en'),
      hebrew: event.render('he'),
      flags: eventFlags,
      isParsha: Boolean(eventFlags & flags.PARSHA_HASHAVUA),
      isRoshChodesh: Boolean(eventFlags & flags.ROSH_CHODESH),
      isHoliday: Boolean(eventFlags & flags.CHAG),
    }
  })

  return {
    hebrewDate: hdate.render('en'),
    hebrewDateHebrew: hdate.render('he'),
    events: cleanEvents,
    isShabbat: date.getDay() === 6,
  }
}
const biblicalWeekDays = [
    'Día 1',
    'Día 2',
    'Día 3',
    'Día 4',
    'Día 5',
    'Día 6',
    'Shabbat',
  ]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

function buildCalendarWeeks(monthDate) {
    const start = startOfWeek(startOfMonth(monthDate), { weekStartsOn: 0 })
    const end = endOfWeek(endOfMonth(monthDate), { weekStartsOn: 0 })
  
    const allDays = eachDayOfInterval({ start, end })
    const weeks = []
  
    for (let i = 0; i < allDays.length; i += 7) {
      weeks.push(allDays.slice(i, i + 7))
    }
  
    return weeks
  }
  
  const Imagenes = {
    Enero: {
      image:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg',
      escudo:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg',
    },
    Febrero: {
      image:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg',
      escudo:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg',
    },
    Marzo: {
      image:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg',
      escudo:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg',
    },
    Abril: {
      image:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg',
      escudo:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773605714/forex/forex_academy_professional_abrilescudo.png',
    },
    Mayo: {
      image:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg',
      escudo:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg',
    },
    Junio: {
      image:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg',
      escudo:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg',
    },
    Julio: {
      image:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg',
      escudo:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg',
    },
    Agosto: {
      image:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg',
      escudo:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg',
    },
    Septiembre: {
      image:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg',
      escudo:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg',
    },
    Octubre: {
      image:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg',
      escudo:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg',
    },
    Noviembre: {
      image:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg',
      escudo:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773600263/forex/forex_academy_professional_EneroCALENDARIO1.jpg',
    },
    Diciembre: {
      image:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg',
      escudo:
        'https://res.cloudinary.com/dvy9qircy/image/upload/v1773598977/forex/forex_academy_professional_AbrilCALENDARIO1.jpg',
    },
  }
  
  const actividadesMock = [
    {
      id: 1,
      title: 'Shavuot',
      date: '2026-05-22',
      description: 'Fiesta bíblica - Shavuot',
    },
    {
      id: 2,
      title: 'Shavuot',
      date: '2026-05-23',
      description: 'Fiesta bíblica - Shavuot',
    },
  ]
  
  const lunasNegrasMock = [
    {
      id: 'luna-negra-2026-05-26',
      date: '2026-05-26',
      title: 'Luna negra / luna nueva',
    },
  ]

  export default function CalendarioBiblicoShabbat() {
    const today = startOfToday()
    const [selectedDay, setSelectedDay] = useState(today)
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
  
    const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
  
    const nombreMesActual = capitalize(
      format(firstDayCurrentMonth, 'MMMM', { locale: es })
    )
  
    const imagenMesActual = Imagenes[nombreMesActual] || Imagenes.Enero
  
    const weeks = useMemo(() => {
      return buildCalendarWeeks(firstDayCurrentMonth)
    }, [firstDayCurrentMonth])
  
    const selectedDayKey = format(selectedDay, 'yyyy-MM-dd')
  
    const actividadesDelDia = actividadesMock.filter(
      (actividad) => actividad.date === selectedDayKey
    )
  
    const lunaNegraDelDia = lunasNegrasMock.find(
      (luna) => luna.date === selectedDayKey
    )
  
    const selectedHebrewInfo = getHebrewInfo(selectedDay)
  
    function previousMonth() {
      const previous = add(firstDayCurrentMonth, { months: -1 })
      setCurrentMonth(format(previous, 'MMM-yyyy'))
    }
  
    function nextMonth() {
      const next = add(firstDayCurrentMonth, { months: 1 })
      setCurrentMonth(format(next, 'MMM-yyyy'))
    }
  
    return (
      <div>
        <CalendarHead />
  
        <div className="min-h-screen bg-white p-4">
          <div className="mx-auto max-w-7xl rounded-xl bg-white p-4 shadow">
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={previousMonth}
                className="rounded bg-black p-2 text-white hover:bg-gray-600"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
  
              <h1 className="text-xl font-bold text-gray-900">
                {capitalize(
                  format(firstDayCurrentMonth, 'MMMM yyyy', { locale: es })
                )}
              </h1>
  
              <button
                type="button"
                onClick={nextMonth}
                className="rounded bg-black p-2 text-white hover:bg-gray-600"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
  
            <div className="grid gap-6 lg:grid-cols-[3fr_1fr]">
              <div className="overflow-x-auto rounded-lg border border-yellow-400">
                <div
                  className="relative min-w-[950px] overflow-hidden rounded-lg"
                  style={{
                    backgroundImage: `url(${imagenMesActual.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-white/65" />
  
                  <div className="relative z-10 grid grid-cols-[95px_repeat(7,1fr)]">
                    <div className="border border-yellow-400 bg-yellow-300 p-2 text-center text-xs font-bold">
                      {nombreMesActual}
                    </div>
  
                    {biblicalWeekDays.map((label) => (
                      <div
                        key={label}
                        className={classNames(
                          'border border-yellow-400 bg-sky-100 p-2 text-center font-serif text-lg font-bold italic text-blue-900',
                          label === 'Shabbat' && 'bg-yellow-300 text-green-700'
                        )}
                      >
                        {label}
                      </div>
                    ))}
  
                    {false && <div className="border border-yellow-400 bg-yellow-300 p-2 text-center text-xs font-bold text-green-700">
                      Descanso
                    </div>}
  
                    {weeks.map((week, weekIndex) => (
                      <CalendarWeekRow
                        key={weekIndex}
                        week={week}
                        weekIndex={weekIndex}
                        selectedDay={selectedDay}
                        setSelectedDay={setSelectedDay}
                        currentMonthDate={firstDayCurrentMonth}
                      />
                    ))}
                  </div>
                </div>
              </div>
  
              <aside className="relative rounded-xl border p-4">
                <h2 className="mb-2 text-lg font-bold text-gray-800">
                  Detalle del día
                </h2>
  
                <p className="text-sm font-semibold text-gray-700">
                  {format(selectedDay, "EEEE d 'de' MMMM yyyy", { locale: es })}
                </p>
  
                <p className="mt-1 text-sm text-blue-700">
                  {selectedHebrewInfo.hebrewDate}
                </p>
  
              {  false && <p className="text-sm text-gray-500">
                  {selectedHebrewInfo.hebrewDateHebrew}
                </p>}
  
                {selectedHebrewInfo.isShabbat && false&&(
                  <div className="mt-3 rounded bg-yellow-300 p-2 text-sm font-bold text-black">
                    Shabbat / Día de descanso
                  </div>
                )}
  
                {lunaNegraDelDia && (
                  <div className="mt-3 flex items-center gap-2 rounded border p-2 text-sm">
                    <span className="h-4 w-4 rounded-full bg-black" />
                    {lunaNegraDelDia.title}
                  </div>
                )}
  
                <div className="mt-4 space-y-2">
                  {selectedHebrewInfo.events.map((event) => (
                    <div
                      key={`${event.title}-${event.hebrew}`}
                      className="rounded border p-2 text-sm"
                    >
                      <p className="font-semibold text-gray-800">
                        {event.title}
                      </p>
                     { false && <p className="text-xs text-gray-500">{event.hebrew}</p>}
                    </div>
                  ))}
                </div>
  
                <div className="mt-4 space-y-2">
                  {actividadesDelDia.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No hay actividades programadas.
                    </p>
                  ) : (
                    actividadesDelDia.map((actividad) => (
                      <div key={actividad.id} className="rounded border p-2">
                        <p className="font-semibold">{actividad.title}</p>
                        <p className="text-sm text-gray-500">
                          {actividad.description}
                        </p>
                      </div>
                    ))
                  )}
                </div>
  
                <img
                  src={imagenMesActual.escudo}
                  alt="Escudo"
                  className="absolute bottom-3 right-3 h-20 w-20 object-contain opacity-80"
                />
              </aside>
            </div>
          </div>
        </div>
      </div>
    )
  }
  function CalendarWeekRow({
    week,
    weekIndex,
    selectedDay,
    setSelectedDay,
    currentMonthDate,
  }) {
    return (
      <>
        <div className="flex min-h-[95px] items-center justify-center border border-yellow-400 bg-sky-100 p-1 text-center font-serif text-sm font-bold italic text-blue-900">
          Semana
          <br />
          {weekIndex + 1}
        </div>
  
        {week.map((day) => (
          <CalendarDayCell
            key={day.toISOString()}
            day={day}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            currentMonthDate={currentMonthDate}
          />
        ))}
  
        <div className="flex min-h-[95px] items-center justify-center border border-yellow-400 bg-yellow-200 p-1 text-center text-xs font-bold text-black">
          DÍA DE
          <br />
          DESCANSO
        </div>
      </>
    )
  }
  
  function CalendarDayCell({
    day,
    selectedDay,
    setSelectedDay,
    currentMonthDate,
  }) {
    const dayKey = format(day, 'yyyy-MM-dd')
    const hebrewInfo = getHebrewInfo(day)
  
    const isCurrentMonth =
      format(day, 'yyyy-MM') === format(currentMonthDate, 'yyyy-MM')
  
    const isSelected = isSameDay(day, selectedDay)
  
    const actividadesDelDia = actividadesMock.filter(
      (actividad) => actividad.date === dayKey
    )
  
    const lunaNegra = lunasNegrasMock.find((luna) => luna.date === dayKey)
  
    const parsha = hebrewInfo.events.find((event) => event.isParsha)
    const roshChodesh = hebrewInfo.events.find((event) => event.isRoshChodesh)
    const holiday = hebrewInfo.events.find((event) => event.isHoliday)
  
    return (
      <button
        type="button"
        onClick={() => setSelectedDay(day)}
        className={classNames(
          'relative min-h-[95px] border border-yellow-400 p-1 text-left transition hover:bg-yellow-100',
          isSelected && 'bg-yellow-200',
          !isCurrentMonth && 'opacity-40',
          hebrewInfo.isShabbat && 'bg-yellow-50'
        )}
      >
        <div className="flex items-start justify-between">
          <span
            className={classNames(
              'flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold',
              isSelected && 'bg-black text-white',
              isToday(day) && !isSelected && 'bg-blue-700 text-white'
            )}
          >
            {format(day, 'd')}
          </span>
  
          <span className="text-[10px] font-semibold text-blue-900">
            {hebrewInfo.hebrewDate.split(' ').slice(0, 2).join(' ')}
          </span>
        </div>
  
        {hebrewInfo.isShabbat && (
          <div className="mt-1 rounded bg-yellow-300 px-1 py-0.5 text-center text-[10px] font-bold text-black">
            SHABBAT
          </div>
        )}
  
        {parsha && (
          <div className="mt-1 truncate text-[10px] font-semibold text-purple-700">
            {parsha.title}
          </div>
        )}
  
        {roshChodesh && (
          <div className="mt-1 truncate text-[10px] font-semibold text-blue-700">
            {roshChodesh.title}
          </div>
        )}
  
        {holiday && (
          <div className="mt-1 truncate text-[10px] font-bold text-red-700">
            {holiday.title}
          </div>
        )}
  
        {actividadesDelDia.map((actividad) => (
          <div
            key={actividad.id}
            className="mt-1 truncate rounded bg-yellow-300 px-1 text-[10px] font-bold text-black"
          >
            {actividad.title}
          </div>
        ))}
  
        {lunaNegra && (
          <span
            title={lunaNegra.title}
            className="absolute bottom-2 left-2 h-4 w-4 rounded-full bg-black"
          />
        )}
      </button>
    )
  }