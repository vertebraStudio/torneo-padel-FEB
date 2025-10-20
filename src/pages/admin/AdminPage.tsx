import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { 
  Lock, 
  Users, 
  Trophy, 
  Settings, 
  Plus, 
  Edit, 
  Trash2,
  Eye,
  EyeOff
} from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import { LoginForm, User, Match, TournamentInfo } from '../../types'

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Doe',
    level: 'Intermediate',
    created_at: '2024-12-01T10:00:00Z',
  },
  {
    id: '2',
    email: 'jane@example.com',
    name: 'Jane Smith',
    level: 'Advanced',
    created_at: '2024-12-01T11:00:00Z',
  },
]

const mockTournamentInfo: TournamentInfo = {
  id: '1',
  name: 'Winter Padel Championship 2024',
  date: '2024-12-15T09:00:00Z',
  location: 'Padel Center Madrid, Spain',
  max_participants: 24,
  current_participants: 8,
  rules: 'Double elimination format, best of 3 sets per match, standard padel scoring system.',
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<'users' | 'matches' | 'settings'>('users')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>()

  const onLogin = async (data: LoginForm) => {
    setIsLoading(true)
    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (data.email === 'admin@padel.com' && data.password === 'admin123') {
        setIsAuthenticated(true)
        toast.success('¡Inicio de sesión correcto!')
      } else {
        toast.error('Credenciales inválidas')
      }
    } catch (error) {
      toast.error('Error al iniciar sesión')
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'users', label: 'Participantes', icon: Users },
    { id: 'matches', label: 'Partidos', icon: Trophy },
    { id: 'settings', label: 'Ajustes', icon: Settings },
  ]

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card glow>
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-primary-500/20 rounded-full">
                  <Lock className="w-8 h-8" style={{ color: '#FF9E1B' }} />
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-gradient mb-2">
                  Acceso de administrador
                </h2>
                <p className="text-white/70">
                  Introduce tus credenciales para acceder al panel
                </p>
              </div>

              <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="admin@padel.com"
                  {...register('email', { 
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email no válido'
                    }
                  })}
                  error={errors.email?.message}
                />

                <div className="relative">
                  <Input
                    label="Contraseña"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Introduce tu contraseña"
                    {...register('password', { required: 'La contraseña es obligatoria' })}
                    error={errors.password?.message}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-white/50 hover:text-white/80"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <Button
                  type="submit"
                  loading={isLoading}
                  className="w-full"
                  size="lg"
                >
                  Iniciar sesión
                </Button>
              </form>

              <div className="text-sm text-white/50 text-center">
                Credenciales demo: admin@padel.com / admin123
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">
          Panel de Administración
        </h1>
        <p className="text-xl text-white/80">
          Gestiona participantes, partidos y ajustes del torneo
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </Card>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeTab === 'users' && (
          <Card>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gradient">
                  Participantes registrados ({mockUsers.length})
                </h3>
                <Button variant="secondary" className="flex items-center space-x-2">
                  <Plus size={20} />
                  <span>Añadir participante</span>
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/80">Nombre</th>
                      <th className="text-left py-3 px-4 text-white/80">Email</th>
                      <th className="text-left py-3 px-4 text-white/80">Nivel</th>
                      <th className="text-left py-3 px-4 text-white/80">Registro</th>
                      <th className="text-left py-3 px-4 text-white/80">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockUsers.map((user) => (
                      <tr key={user.id} className="border-b border-white/5">
                        <td className="py-3 px-4 font-medium">{user.name}</td>
                        <td className="py-3 px-4 text-white/70">{user.email}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.level === 'Advanced' 
                              ? 'bg-red-500/20 text-red-400'
                              : user.level === 'Intermediate'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-orange-500/20 text-orange-400'
                          }`}>
                            {user.level}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-white/70">
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-white/50 hover:text-white/80">
                              <Edit size={16} />
                            </button>
                            <button className="p-1 text-white/50 hover:text-red-400">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'matches' && (
          <Card>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gradient">
                  Gestión de partidos
                </h3>
                <Button variant="secondary" className="flex items-center space-x-2">
                  <Plus size={20} />
                  <span>Añadir partido</span>
                </Button>
              </div>

              <div className="text-center py-12 text-white/50">
                <Trophy className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>La gestión de partidos se implementará aquí</p>
                <p className="text-sm">Añadir, editar y actualizar resultados</p>
              </div>
            </div>
          </Card>
        )}

        {activeTab === 'settings' && (
          <Card>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gradient">
                Ajustes del torneo
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    label="Nombre del torneo"
                    defaultValue={mockTournamentInfo.name}
                  />
                  <Input
                    label="Ubicación"
                    defaultValue={mockTournamentInfo.location}
                  />
                  <Input
                    label="Máximo de participantes"
                    type="number"
                    defaultValue={mockTournamentInfo.max_participants}
                  />
                </div>
                
                <div className="space-y-4">
                  <Input
                    label="Fecha y hora"
                    type="datetime-local"
                    defaultValue={new Date(mockTournamentInfo.date).toISOString().slice(0, 16)}
                  />
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Reglas
                    </label>
                    <textarea
                      className="glass-input w-full h-24 resize-none"
                      defaultValue={mockTournamentInfo.rules}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="secondary">Cancelar</Button>
                <Button>Guardar cambios</Button>
              </div>
            </div>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
