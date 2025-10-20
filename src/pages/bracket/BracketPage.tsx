import { motion } from 'framer-motion'
import Card from '../../components/ui/Card'

export default function BracketPage() {
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
          Cuadro del Torneo
        </h1>
        <p className="text-xl text-white/80">
          El cuadro aún no está disponible. Se publicará cuando comience el torneo.
        </p>
      </motion.div>

      {/* Placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card>
          <div className="py-16 text-center space-y-3">
            <p className="text-2xl font-semibold text-white">Próximamente</p>
            <p className="text-white/70">Aquí verás el cuadro con todos los emparejamientos y resultados.</p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
