import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Home, Users, Settings } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Inicio', icon: Home },
    { path: '/bracket', label: 'Cuadro', icon: Users },
    { path: '/admin', label: 'Admin', icon: Settings },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 glass-card border-b border-white/10 backdrop-blur-xl"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <img 
              src="/torneo-padel-FEB/images/Feb-logo.svg" 
              alt="FEB Logo" 
              className="w-10 h-10"
            />
            <h1 className="text-2xl font-bold text-white">Copa FEB Padel 2025</h1>
          </motion.div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </motion.div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
