import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Using mock data.')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types
export interface Database {
  public: {
    Tables: {
      inscritos_torneo: {
        Row: {
          id: string
          nombre: string | null
          apellido: string | null
          email: string | null
          nivel: string | null
          departamento: string | null
          created_at: string
        }
        Insert: {
          id?: string
          nombre?: string | null
          apellido?: string | null
          email?: string | null
          nivel?: string | null
          departamento?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          nombre?: string | null
          apellido?: string | null
          email?: string | null
          nivel?: string | null
          departamento?: string | null
          created_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          round: 'quarterfinals' | 'semifinals' | 'final'
          team1_id: string
          team2_id: string
          team1_score: number
          team2_score: number
          status: 'pending' | 'in_progress' | 'completed'
          date: string
          created_at: string
        }
        Insert: {
          id?: string
          round: 'quarterfinals' | 'semifinals' | 'final'
          team1_id: string
          team2_id: string
          team1_score?: number
          team2_score?: number
          status?: 'pending' | 'in_progress' | 'completed'
          date: string
          created_at?: string
        }
        Update: {
          id?: string
          round?: 'quarterfinals' | 'semifinals' | 'final'
          team1_id?: string
          team2_id?: string
          team1_score?: number
          team2_score?: number
          status?: 'pending' | 'in_progress' | 'completed'
          date?: string
          created_at?: string
        }
      }
      tournament_info: {
        Row: {
          id: string
          name: string
          date: string
          location: string
          max_participants: number
          current_participants: number
          rules: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          date: string
          location: string
          max_participants: number
          current_participants?: number
          rules: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          date?: string
          location?: string
          max_participants?: number
          current_participants?: number
          rules?: string
          created_at?: string
        }
      }
      admins: {
        Row: {
          id: string
          email: string
          password_hash: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          created_at?: string
        }
      }
    }
  }
}
