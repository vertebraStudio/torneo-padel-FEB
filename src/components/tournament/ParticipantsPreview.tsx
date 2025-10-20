import { motion } from 'framer-motion'
import { Users, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

interface Participant {
  id: string
  nombre: string | null
  apellido: string | null
  nivel: string | null
  departamento: string | null
  avatar?: string
}

interface ParticipantsPreviewProps {
  participants: Participant[]
  totalCount: number
}

export default function ParticipantsPreview({ participants, totalCount }: ParticipantsPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4
  const maxIndex = Math.max(0, participants.length - itemsPerPage)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'text-red-400'
      case 'Intermediate':
        return 'text-yellow-400'
      default:
        return 'text-green-400'
    }
  }

  const getLevelText = (level: string) => {
    switch (level) {
      case 'Advanced':
        return 'Avanzado'
      case 'Intermediate':
        return 'Intermedio'
      default:
        return 'Principiante'
    }
  }

  const getDepartmentColor = (_department: string) => {
    return 'text-gray-400'
  }

  const getInitials = (nombre: string | null, apellido: string | null) => {
    const firstInitial = nombre ? nombre.charAt(0).toUpperCase() : ''
    const lastInitial = apellido ? apellido.charAt(0).toUpperCase() : ''
    return (firstInitial + lastInitial).slice(0, 2)
  }

  const nextParticipants = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }

  const prevParticipants = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }

  const visibleParticipants = participants.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-card p-6"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Users className="w-6 h-6" style={{ color: '#FF9E1B' }} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Participantes Inscritos
              </h3>
              <p className="text-white/70 text-sm">
                {totalCount} de 24 plazas ocupadas
              </p>
            </div>
          </div>
          
          {participants.length > itemsPerPage && (
            <div className="flex items-center space-x-2">
              <button
                onClick={prevParticipants}
                disabled={currentIndex === 0}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <span className="text-sm text-white/60 px-2">
                {currentIndex + 1}-{Math.min(currentIndex + itemsPerPage, participants.length)} de {participants.length}
              </span>
              <button
                onClick={nextParticipants}
                disabled={currentIndex >= maxIndex}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-white/70">
            <span>Progreso del torneo</span>
            <span>{Math.round((totalCount / 24) * 100)}%</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <motion.div
              className="h-2 rounded-full"
              style={{ background: 'linear-gradient(91deg, #FF9E1B 0%, #C8102E 100%)' }}
              initial={{ width: 0 }}
              animate={{ width: `${(totalCount / 24) * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>

        {/* Participants Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {visibleParticipants.map((participant, index) => (
            <motion.div
              key={participant.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              {/* Avatar */}
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm bg-white"
                style={{ color: '#FF9E1B' }}
              >
                {getInitials(participant.nombre, participant.apellido)}
              </div>
              
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">
                  {participant.nombre} {participant.apellido}
                </p>
                <div className="space-y-1 mt-1">
                  <p className={`text-xs font-medium ${getDepartmentColor(participant.departamento || '')}`}>
                    {participant.departamento}
                  </p>
                  <p className={`text-xs font-medium ${getLevelColor(participant.nivel || '')}`}>
                    {getLevelText(participant.nivel || '')}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {participants.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-12 h-12 text-white/30 mx-auto mb-3" />
            <p className="text-white/60">Aún no hay participantes inscritos</p>
            <p className="text-white/40 text-sm">¡Sé el primero en inscribirte!</p>
          </div>
        )}

      </div>
    </motion.div>
  )
}
