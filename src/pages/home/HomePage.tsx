import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Calendar, MapPin, Users, Clock } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Select from '../../components/ui/Select'
import ParticipantsPreview from '../../components/tournament/ParticipantsPreview'
import CountdownTimer from '../../components/tournament/CountdownTimer'
import { RegistrationForm, User } from '../../types'

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegistrationForm>()

  const [participants, setParticipants] = useState<User[]>([])

  useEffect(() => {
    const loadParticipants = async () => {
      try {
        const { userApi } = await import('../../services/api')
        const users = await userApi.getAll()
        setParticipants(users)
      } catch (error) {
        console.error('Error cargando participantes:', error)
      }
    }
    loadParticipants()
  }, [])

  const onSubmit = async (data: RegistrationForm) => {
    setIsSubmitting(true)
    try {
      // Call the actual API
      const { userApi } = await import('../../services/api')
      await userApi.register(data)
      // Recargar lista tras registrar
      const users = await userApi.getAll()
      setParticipants(users)
      
      toast.success('¡Registro exitoso! ¡Bienvenido al torneo!')
      reset()
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Error en el registro. Por favor, inténtalo de nuevo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const skillLevelOptions = [
    { value: 'Beginner', label: 'Principiante' },
    { value: 'Intermediate', label: 'Intermedio' },
    { value: 'Advanced', label: 'Avanzado' },
  ]

  const departmentOptions = [
    { value: 'IT', label: 'IT' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Comunicación', label: 'Comunicación' },
    { value: 'Área Deportiva', label: 'Área Deportiva' },
    { value: 'Secretaría', label: 'Secretaría' },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl"
      >
        <div className="relative h-96 md:h-[500px]">
          <img
            src="/images/padel.jpg"
            alt="Padel court"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-6 px-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-2xl">
                Copa FEB Padel 2025
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-lg">
                Cuando el baloncesto descansa, el pádel arranca.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-4"
              >
                <Button
                  size="lg"
                  className="text-white font-bold px-8 py-4 text-lg shadow-2xl"
                  style={{ 
                    background: 'linear-gradient(91deg, #FF9E1B 0%, #C8102E 100%)',
                    opacity: 0.9
                  }}
                  onClick={() => {
                    const formSection = document.getElementById('registration-form');
                    formSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  ¡Inscríbete Ahora!
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Participants Preview and Countdown Timer */}
      <div className="grid lg:grid-cols-2 gap-8">
        <ParticipantsPreview 
          participants={participants} 
          totalCount={participants.length} 
        />
        <CountdownTimer />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Registration Form */}
        <motion.div
          id="registration-form"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="h-fit">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold color-white mb-2">
                  Inscríbete ahora
                </h2>
                <p className="text-white/70">
                  Asegura tu plaza en el torneo
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  label="Nombre"
                  placeholder="Introduce tu nombre"
                  {...register('nombre', { 
                    required: 'El nombre es obligatorio',
                    minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' }
                  })}
                  error={errors.nombre?.message}
                />

                <Input
                  label="Apellido"
                  placeholder="Introduce tu apellido"
                  {...register('apellido', { 
                    required: 'El apellido es obligatorio',
                    minLength: { value: 2, message: 'Debe tener al menos 2 caracteres' }
                  })}
                  error={errors.apellido?.message}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="Introduce tu email"
                  {...register('email', { 
                    required: 'El email es obligatorio',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email no válido'
                    }
                  })}
                  error={errors.email?.message}
                />

                <Select
                  label="Nivel"
                  options={skillLevelOptions}
                  {...register('nivel', { required: 'El nivel es obligatorio' })}
                  error={errors.nivel?.message}
                />

                <Select
                  label="Departamento"
                  options={departmentOptions}
                  {...register('departamento', { required: 'El departamento es obligatorio' })}
                  error={errors.departamento?.message}
                />

                <Button
                  type="submit"
                  loading={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  Inscribirme al Torneo
                </Button>
              </form>
            </div>
          </Card>
        </motion.div>

        {/* Tournament Information */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-6"
        >
          <Card>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">
                Detalles del Torneo
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6" style={{ color: '#FF9E1B' }} />
                  <div>
                    <p className="font-semibold">Fecha y hora</p>
                    <p className="text-white/70">14 de noviembre de 2025 a las 15:00</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-6 h-6" style={{ color: '#FF9E1B' }} />
                  <div>
                    <p className="font-semibold">Ubicación</p>
                    <a 
                      href="https://www.google.com/maps/place/School+Padel+Center/@40.473609,-3.6776546,17.19z/data=!3m1!5s0xd4229470432c509:0x9c6d9869c369e539!4m14!1m7!3m6!1s0xd422894fe0b4ddb:0x14dfad914214c6c1!2sFederaci%C3%B3n+Espa%C3%B1ola+de+Baloncesto+(FEB)!8m2!3d40.4732358!4d-3.6752475!16s%2Fg%2F1q5bnlhgh!3m5!1s0xd42294772ebe947:0xd1fc90f7f803709d!8m2!3d40.476829!4d-3.6752832!16s%2Fg%2F11c1vqkj6g?entry=ttu&g_ep=EgoyMDI1MTAxNC4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-primary-400 transition-colors duration-300 decoration-primary-500/50 hover:decoration-primary-400"
                    >
                      School Padel Center M30, Madrid
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6" style={{ color: '#FF9E1B' }} />
                  <div>
                    <p className="font-semibold">Plazas disponibles</p>
                    <p className="text-white/70">24 participantes (quedan 16)</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6" style={{ color: '#FF9E1B' }} />
                  <div>
                    <p className="font-semibold">Duración</p>
                    <p className="text-white/70">Torneo de día completo</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white mb-4">
                Reglas del torneo
              </h3>
              <p className="text-white/80 text-center py-4">
                Aún por definir
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
