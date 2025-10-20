import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import Card from '../ui/Card'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    // Tournament date: November 14, 2025 at 15:00 (3:00 PM)
    const tournamentDate = new Date('2025-11-14T15:00:00').getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = tournamentDate - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
        setIsExpired(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsExpired(true)
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 min-w-[80px]">
        <div className="text-3xl font-bold text-white mb-1 transition-all duration-300">
          {value.toString().padStart(2, '0')}
        </div>
        <div className="text-sm text-white/70 uppercase tracking-wide">
          {label}
        </div>
      </div>
    </div>
  )

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card>
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-3 bg-white/10 rounded-full">
                <Clock className="w-8 h-8" style={{ color: '#FF9E1B' }} />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                ¡El torneo ha comenzado!
              </h3>
              <p className="text-white/70">
                El torneo de pádel ya está en marcha. ¡Disfruta de los partidos!
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="h-full">
        <div className="space-y-6 h-full flex flex-col">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex justify-center">
              <div className="p-3 bg-white/10 rounded-full">
                <Clock className="w-8 h-8" style={{ color: '#FF9E1B' }} />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white">
              Cuenta Atrás
            </h3>
            <p className="text-white/70">
              Hasta el inicio del torneo
            </p>
          </div>

          {/* Countdown Display */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TimeUnit key="days" value={timeLeft.days} label="Días" />
            <TimeUnit key="hours" value={timeLeft.hours} label="Horas" />
            <TimeUnit key="minutes" value={timeLeft.minutes} label="Minutos" />
            <TimeUnit key="seconds" value={timeLeft.seconds} label="Segundos" />
          </div>

          {/* Tournament Date */}
          <div className="text-center pt-4 border-t border-white/10 mt-auto">
            <p className="text-white/60 text-sm">
              Fecha del torneo: <span className="font-semibold text-white">14 de Noviembre, 2025</span>
            </p>
            <p className="text-white/60 text-sm">
              Hora de inicio: <span className="font-semibold text-white">15:00</span>
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
