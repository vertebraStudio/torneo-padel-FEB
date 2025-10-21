import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/home/HomePage'
import BracketPage from './pages/bracket/BracketPage'
import AdminPage from './pages/admin/AdminPage'

function App() {
  const location = useLocation()

  // Asegurar que siempre se muestre contenido en la ruta raíz
  useEffect(() => {
    if (location.pathname === '/torneo-padel-FEB/' || location.pathname === '/torneo-padel-FEB') {
      window.history.replaceState(null, '', '/torneo-padel-FEB/')
    }
  }, [location])

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bracket" element={<BracketPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
    </div>
  )
}

export default App
