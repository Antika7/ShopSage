import { useState, useEffect } from 'react'
import { fetchLocation } from '../api/client'

const FALLBACK_LOCATION = { city: 'India', country: 'India', country_code: 'IN' }

export function useLocation() {
  const [location, setLocation] = useState(null)
  const [locationLoading, setLocationLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    fetchLocation()
      .then((data) => {
        if (!cancelled) setLocation(data)
      })
      .catch(() => {
        if (!cancelled) setLocation(FALLBACK_LOCATION)
      })
      .finally(() => {
        if (!cancelled) setLocationLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { location, locationLoading }
}
