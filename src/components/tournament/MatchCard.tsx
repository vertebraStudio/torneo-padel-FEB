import { motion } from 'framer-motion'
import { Clock, Trophy, Users } from 'lucide-react'
import { Match } from '../../types'

interface MatchCardProps {
  match: Match
  onClick?: () => void
}

export default function MatchCard({ match, onClick }: MatchCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-orange-400'
      case 'in_progress':
        return 'text-yellow-400'
      default:
        return 'text-white/60'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <Trophy className="w-4 h-4" />
      case 'in_progress':
        return <Clock className="w-4 h-4" />
      default:
        return <Users className="w-4 h-4" />
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card p-4 cursor-pointer glass-card-hover"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold uppercase tracking-wide" style={{ color: '#FF9E1B' }}>
            {match.round}
          </span>
          <div className={`flex items-center space-x-1 ${getStatusColor(match.status)}`}>
            {getStatusIcon(match.status)}
            <span className="text-sm capitalize">{match.status}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">{match.team1_name || 'Team 1'}</span>
            {match.status === 'completed' && (
              <span className="text-lg font-bold" style={{ color: '#FF9E1B' }}>
                {match.team1_score}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-medium">{match.team2_name || 'Team 2'}</span>
            {match.status === 'completed' && (
              <span className="text-lg font-bold" style={{ color: '#FF9E1B' }}>
                {match.team2_score}
              </span>
            )}
          </div>
        </div>

        {match.status !== 'pending' && (
          <div className="text-sm text-white/60">
            {new Date(match.date).toLocaleDateString()} at{' '}
            {new Date(match.date).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        )}
      </div>
    </motion.div>
  )
}
