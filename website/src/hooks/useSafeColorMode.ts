import { useColorMode } from '@docusaurus/theme-common'

/**
 * Safely gets the color mode with fallback for environments where
 * Docusaurus context is not available (e.g., SSR, testing)
 *
 * This hook should be used with BrowserOnly wrapper to ensure
 * Docusaurus context is available when the hook runs.
 */
export function useSafeColorMode(): string {
  try {
    const { colorMode } = useColorMode()
    return colorMode
  } catch (error) {
    // Fallback to light mode if useColorMode is not available
    console.warn('useColorMode not available, falling back to light mode')
    return 'light'
  }
}
