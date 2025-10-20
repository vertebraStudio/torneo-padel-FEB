import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  onClick?: () => void
}

export default function Card({ 
  children, 
  className = '', 
  hover = true, 
  glow = false,
  onClick 
}: CardProps) {
  const baseClasses = 'glass-card p-6'
  const hoverClasses = hover ? 'glass-card-hover cursor-pointer' : ''
  const glowClasses = glow ? 'glow-effect' : ''
  
  const classes = `${baseClasses} ${hoverClasses} ${glowClasses} ${className}`

  return (
    <motion.div
      className={classes}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -5 } : {}}
    >
      {children}
    </motion.div>
  )
}
