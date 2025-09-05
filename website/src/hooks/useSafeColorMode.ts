import { useEffect, useState } from 'react'

// Custom hook to safely detect color mode
export function useSafeColorMode(): 'light' | 'dark' {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return

    // Try to get color mode from localStorage first
    const storedMode = localStorage.getItem('theme')
    if (storedMode === 'dark' || storedMode === 'light') {
      setColorMode(storedMode)
      return
    }

    // Fallback to system preference
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setColorMode('dark')
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      setColorMode(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return colorMode
}
