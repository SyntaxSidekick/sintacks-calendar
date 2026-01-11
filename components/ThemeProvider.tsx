'use client'

import { useThemeStore } from '@/store/theme-store'
import { useEffect, useState } from 'react'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [theme, mounted])

  // Prevent flash of wrong theme by not rendering until mounted
  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}
