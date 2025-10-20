import { supabase } from './supabase'
import { User, Match, TournamentInfo, RegistrationForm } from '../types'

// Mock data for when Supabase is not configured
const mockUsers: User[] = []
const mockMatches: Match[] = []
const mockTournamentInfo: TournamentInfo = {
  id: '1',
  name: 'Winter Padel Championship 2024',
  date: '2024-12-15T09:00:00Z',
  location: 'Padel Center Madrid, Spain',
  max_participants: 24,
  current_participants: 0,
  rules: 'Double elimination format, best of 3 sets per match, standard padel scoring system.',
}

// User API
export const userApi = {
  async register(data: RegistrationForm): Promise<User> {
    if (!supabase) {
      // Mock registration
      const newUser: User = {
        id: Date.now().toString(),
        ...data,
        created_at: new Date().toISOString(),
      }
      mockUsers.push(newUser)
      return newUser
    }

    const { data: user, error } = await supabase
      .from('inscritos_torneo')
      .insert([data])
      .select()
      .single()

    if (error) throw error
    return user
  },

  async getAll(): Promise<User[]> {
    if (!supabase) {
      return mockUsers
    }

    const { data: users, error } = await supabase
      .from('inscritos_torneo')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return users || []
  },

  async delete(id: string): Promise<void> {
    if (!supabase) {
      const index = mockUsers.findIndex(user => user.id === id)
      if (index > -1) {
        mockUsers.splice(index, 1)
      }
      return
    }

    const { error } = await supabase
      .from('inscritos_torneo')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}

// Match API
export const matchApi = {
  async getAll(): Promise<Match[]> {
    if (!supabase) {
      return mockMatches
    }

    const { data: matches, error } = await supabase
      .from('matches')
      .select('*')
      .order('date', { ascending: true })

    if (error) throw error
    return matches || []
  },

  async create(match: Omit<Match, 'id'>): Promise<Match> {
    if (!supabase) {
      const newMatch: Match = {
        id: Date.now().toString(),
        ...match,
      }
      mockMatches.push(newMatch)
      return newMatch
    }

    const { data, error } = await supabase
      .from('matches')
      .insert([match])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, updates: Partial<Match>): Promise<Match> {
    if (!supabase) {
      const index = mockMatches.findIndex(match => match.id === id)
      if (index > -1) {
        mockMatches[index] = { ...mockMatches[index], ...updates }
        return mockMatches[index]
      }
      throw new Error('Match not found')
    }

    const { data, error } = await supabase
      .from('matches')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    if (!supabase) {
      const index = mockMatches.findIndex(match => match.id === id)
      if (index > -1) {
        mockMatches.splice(index, 1)
      }
      return
    }

    const { error } = await supabase
      .from('matches')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}

// Tournament API
export const tournamentApi = {
  async getInfo(): Promise<TournamentInfo> {
    if (!supabase) {
      return mockTournamentInfo
    }

    const { data: info, error } = await supabase
      .from('tournament_info')
      .select('*')
      .single()

    if (error) throw error
    return info
  },

  async updateInfo(updates: Partial<TournamentInfo>): Promise<TournamentInfo> {
    if (!supabase) {
      Object.assign(mockTournamentInfo, updates)
      return mockTournamentInfo
    }

    const { data, error } = await supabase
      .from('tournament_info')
      .update(updates)
      .eq('id', '1')
      .select()
      .single()

    if (error) throw error
    return data
  },
}

// Admin API
export const adminApi = {
  async login(email: string, password: string): Promise<boolean> {
    if (!supabase) {
      // Mock authentication
      return email === 'admin@padel.com' && password === 'admin123'
    }

    const { data: admin, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .single()

    if (error) return false
    
    // In a real app, you'd hash the password and compare
    return admin.password_hash === password
  },
}
