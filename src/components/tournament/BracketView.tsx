import { motion } from 'framer-motion'
import { Match } from '../../types'
import MatchCard from './MatchCard'

interface BracketViewProps {
  matches: Match[]
  onMatchClick?: (match: Match) => void
}

export default function BracketView({ matches, onMatchClick }: BracketViewProps) {
  const rounds = ['quarterfinals', 'semifinals', 'final'] as const
  
  const getMatchesByRound = (round: string) => {
    return matches.filter(match => match.round === round)
  }

  return (
    <div className="space-y-8">
      {rounds.map((round, roundIndex) => {
        const roundMatches = getMatchesByRound(round)
        
        if (roundMatches.length === 0) return null

        return (
          <motion.div
            key={round}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: roundIndex * 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-gradient capitalize">
              {round.replace('_', ' ')}
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {roundMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => onMatchClick?.(match)}
                />
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
