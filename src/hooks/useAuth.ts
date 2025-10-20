import { useState, useEffect } from 'react'
import { adminApi } from '../services/api'

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated (from localStorage or session)
    const authStatus = localStorage.getItem('admin_auth')
    setIsAuthenticated(authStatus === 'true')
    setLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true)
      const success = await adminApi.login(email, password)
      
      if (success) {
        setIsAuthenticated(true)
        localStorage.setItem('admin_auth', 'true')
      }
      
      return success
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('admin_auth')
  }

  return {
    isAuthenticated,
    loading,
    login,
    logout,
  }
}
