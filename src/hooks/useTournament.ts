import { useState, useEffect } from 'react'
import { User, Match, TournamentInfo } from '../types'
import { userApi, matchApi, tournamentApi } from '../services/api'

export function useTournament() {
  const [users, setUsers] = useState<User[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [tournamentInfo, setTournamentInfo] = useState<TournamentInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [usersData, matchesData, infoData] = await Promise.all([
        userApi.getAll(),
        matchApi.getAll(),
        tournamentApi.getInfo(),
      ])

      setUsers(usersData)
      setMatches(matchesData)
      setTournamentInfo(infoData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const refreshData = () => {
    loadData()
  }

  return {
    users,
    matches,
    tournamentInfo,
    loading,
    error,
    refreshData,
    setUsers,
    setMatches,
    setTournamentInfo,
  }
}
