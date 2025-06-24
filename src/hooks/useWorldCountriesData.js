import { useState, useEffect } from 'react'
import { realWorldCountriesData } from '../data/worldCountriesGeoJSON'
import { getContinent, getRegionUN, getSubregion } from '../data/worldCountriesGeoJSON'

// High-resolution GeoJSON sources for better country boundaries
const GEO_DATA_SOURCES = {
  // Very high resolution - best detail but larger file size (previously ALTERNATIVE)
  HIGH_RES: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson',
  
  // Medium resolution - good balance of detail and performance (previously HIGH_RES)
  MEDIUM_RES: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_admin_0_countries.geojson',
  
  // Low resolution - simpler map for easier gameplay (previously MEDIUM_RES)
  LOW_RES: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
  
  // Fallback source (current one)
  FALLBACK: 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
}

// Cache for storing loaded data
const dataCache = new Map()

// Custom hook to manage world countries data with improved resolution
export const useWorldCountriesData = (resolution = 'MEDIUM_RES') => {
  const [countryData, setCountryData] = useState(realWorldCountriesData)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadedResolution, setLoadedResolution] = useState('FALLBACK')

  const fetchHighResolutionData = async (sourceUrl, sourceName) => {
    // Check cache first
    const cacheKey = `${sourceName}_${sourceUrl}`
    if (dataCache.has(cacheKey)) {
      console.log(`📦 Loading ${sourceName} data from cache`)
      return dataCache.get(cacheKey)
    }

    console.log(`🌍 Fetching ${sourceName} country data from:`, sourceUrl)
    
    const response = await fetch(sourceUrl)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch from ${sourceName}`)
    }
    
    const data = await response.json()
    
    // Transform and enhance the data
    const transformedData = {
      type: "FeatureCollection",
      features: data.features.map(feature => {
        // Normalize property names across different data sources
        const props = feature.properties
        const countryName = props.NAME || props.name || props.NAME_EN || props.ADMIN || props.NAME_LONG
        
        return {
          type: "Feature",
          properties: {
            name: countryName,
            NAME: countryName,
            NAME_LONG: props.NAME_LONG || countryName,
            ABBREV: props.ABBREV || props.NAME_SHORT || countryName,
            ISO_A2: props.ISO_A2 || props.iso_a2 || "",
            ISO_A3: props.ISO_A3 || props.iso_a3 || "",
            CONTINENT: getContinent(countryName),
            REGION_UN: getRegionUN(countryName),
            SUBREGION: getSubregion(countryName),
            // Preserve original properties for debugging
            _original: props
          },
          geometry: feature.geometry
        }
      }).filter(feature => {
        // Filter out invalid geometries
        return feature.geometry && 
               feature.geometry.coordinates && 
               feature.geometry.coordinates.length > 0 &&
               feature.properties.name
      })
    }
    
    // Cache the processed data
    dataCache.set(cacheKey, transformedData)
    console.log(`✅ Successfully loaded and cached ${transformedData.features.length} countries from ${sourceName}`)
    
    return transformedData
  }

  useEffect(() => {
    const loadHighResolutionCountryData = async () => {
      setIsLoading(true)
      setError(null)
        const sources = [
        { url: GEO_DATA_SOURCES[resolution], name: resolution },
        { url: GEO_DATA_SOURCES.LOW_RES, name: 'LOW_RES' },
        { url: GEO_DATA_SOURCES.FALLBACK, name: 'FALLBACK' }
      ]

      // Try each source in order until one succeeds
      for (const source of sources) {
        try {
          console.log(`🔄 Attempting to load ${source.name} resolution data...`)
          const data = await fetchHighResolutionData(source.url, source.name)
          
          setCountryData(data)
          setLoadedResolution(source.name)
          setError(null)
          console.log(`✅ Successfully loaded ${source.name} resolution country polygons!`)
          console.log(`📊 Total countries loaded: ${data.features.length}`)
          
          // Log some sample countries for debugging
          const sampleCountries = data.features.slice(0, 3).map(f => f.properties.name)
          console.log(`🏳️ Sample countries: ${sampleCountries.join(', ')}`)
          
          setIsLoading(false)
          return // Success - exit the loop
          
        } catch (err) {
          console.warn(`⚠️ Failed to load ${source.name} data:`, err.message)
          setError(err)
          // Continue to next source
        }
      }
      
      // If all sources failed, stick with the fallback data
      console.warn('🚨 All data sources failed, using built-in fallback data')
      setLoadedResolution('BUILT_IN_FALLBACK')
      setIsLoading(false)
    }

    loadHighResolutionCountryData()
  }, [resolution])
  return {
    countryData,
    isLoading,
    error,
    features: countryData.features || [],
    loadedResolution,
    // Utility functions for debugging and monitoring
    getCacheSize: () => dataCache.size,
    clearCache: () => {
      dataCache.clear()
      console.log('🗑️ Data cache cleared')
    }
  }
}
