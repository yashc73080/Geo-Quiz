import { useState, useEffect } from 'react'
import { realWorldCountriesData } from '../data/worldCountriesGeoJSON'
import { fetchWorldCountriesData } from '../data/worldCountriesGeoJSON'

// Custom hook to manage world countries data
export const useWorldCountriesData = () => {
  const [countryData, setCountryData] = useState(realWorldCountriesData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadRealCountryData = async () => {
      setIsLoading(true)
      setError(null)
      
      try {
        const realData = await fetchWorldCountriesData()
        setCountryData(realData)
        console.log('✅ Successfully loaded real country polygons!')
      } catch (err) {
        console.warn('⚠️ Failed to load real country data, using fallback:', err)
        setError(err)
        // Keep using the original simplified data
      }
      
      setIsLoading(false)
    }

    loadRealCountryData()
  }, [])

  return {
    countryData,
    isLoading,
    error,
    features: countryData.features || []
  }
}
