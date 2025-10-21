export interface User {
  id: string;
  email: string | null;
  nombre: string | null;
  apellido: string | null;
  nivel: string | null;
  departamento: string | null;
  created_at: string;
  // Additional properties for admin interface
  name?: string;
  level?: string;
}

export interface Match {
  id: string;
  round: 'quarterfinals' | 'semifinals' | 'final';
  team1_id: string;
  team2_id: string;
  team1_score: number;
  team2_score: number;
  status: 'pending' | 'in_progress' | 'completed';
  date: string;
  team1_name?: string;
  team2_name?: string;
}

export interface TournamentInfo {
  id: string;
  name: string;
  date: string;
  location: string;
  max_participants: number;
  current_participants: number;
  rules: string;
}

export interface Admin {
  id: string;
  email: string;
  password_hash: string;
}

export interface RegistrationForm {
  nombre: string;
  apellido: string;
  email: string;
  nivel: 'Beginner' | 'Intermediate' | 'Advanced';
  departamento: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
