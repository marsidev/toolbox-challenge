import { useEffect, useState } from 'react'

/**
 * Hook to debounce a fast changing value. This is helpful to ensure that expensive operations like API calls are not executed too frequently.
 * @param {string} value - the value to debounce.
 * @param {number} delay - the delay to update the debounced value, in milliseconds. Default is 1000ms.
 * @returns {string} - the debounced value.
 */
export const useDebounce = (value, delay = 1000) => {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounced(value)
    }, delay)

    return () => clearTimeout(timerId)
  }, [value, delay])

  return debounced
}
