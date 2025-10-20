import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/home/HomePage'
import BracketPage from './pages/bracket/BracketPage'
import AdminPage from './pages/admin/AdminPage'

function App() {
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
        </Routes>
      </motion.main>
    </div>
  )
}

export default App
