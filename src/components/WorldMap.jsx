import React, { useEffect, useRef, useState, useCallback } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { regions, getCountriesForRegion } from '../data/countriesData'
import { getContinent } from '../data/worldCountriesGeoJSON'
import { useWorldCountriesDataWithResolution } from '../hooks/useWorldCountriesDataWithResolution'
import MapQualityControls from './MapQualityControls'

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Component to handle map view changes
const MapViewController = ({ selectedRegion }) => {
  const map = useMap()
  
  useEffect(() => {
    const regionData = regions[selectedRegion]
    if (regionData && regionData.bounds) {
      const bounds = L.latLngBounds(
        [regionData.bounds[0][1], regionData.bounds[0][0]], // southwest
        [regionData.bounds[1][1], regionData.bounds[1][0]]  // northeast
      )
      map.fitBounds(bounds, { padding: [20, 20] })
    }
  }, [selectedRegion, map])
  
  return null
}

const WorldMap = ({ selectedRegion, onCountrySelect, currentCountry, gameState, correctlyGuessedCountries = [], feedback, incorrectAttempts = 0 }) => {
  const geoJsonRef = useRef()
  const [incorrectCountry, setIncorrectCountry] = useState(null)
  // Use enhanced hook with dynamic resolution changing
  const { 
    countryData, 
    isLoading, 
    currentResolution, 
    loadedResolution, 
    changeResolution 
  } = useWorldCountriesDataWithResolution()

  // Clear incorrect country highlight when feedback changes
  useEffect(() => {
    if (!feedback || feedback.type !== 'incorrect') {
      setIncorrectCountry(null)
    }
  }, [feedback])

  // Style function for countries
  const getCountryStyle = useCallback((feature) => {
    const countryName = feature.properties.name || feature.properties.NAME
    
    // Check if country is in the selected region using the continent mapping
    let isInRegion = false
    if (selectedRegion === 'World') {
      isInRegion = true
    } else {
      const regionData = regions[selectedRegion]
      if (regionData && regionData.continent) {
        const continent = getContinent(countryName)
        isInRegion = continent === regionData.continent
      }
    }
    
    const isCorrectlyGuessed = correctlyGuessedCountries.some(
      country => {
        const guessedName = country.properties.name || country.properties.NAME
        return guessedName === countryName
      }
    )

    const isIncorrectlySelected = incorrectCountry && 
      (incorrectCountry.properties.name || incorrectCountry.properties.NAME) === countryName

    // Check if this is the target country and should be highlighted as a hint
    const currentCountryName = currentCountry?.properties?.name || currentCountry?.properties?.NAME
    const isTargetCountryHint = currentCountryName === countryName &&
      incorrectAttempts >= 3 &&
      gameState === 'playing'
    
    if (isIncorrectlySelected) {
      return {
        fillColor: '#e74c3c',
        weight: 3,
        opacity: 1,
        color: '#c0392b',
        dashArray: '',
        fillOpacity: 0.8
      }
    }

    if (isTargetCountryHint) {
      return {
        fillColor: '#f1c40f', // Gold/yellow color for hint
        weight: 3,
        opacity: 1,
        color: '#f39c12',
        dashArray: '',
        fillOpacity: 0.9
      }
    }
    
    if (isCorrectlyGuessed) {
      return {
        fillColor: '#27ae60',
        weight: 2,
        opacity: 1,
        color: '#1e8449',
        dashArray: '',
        fillOpacity: 0.8
      }
    }
    
    if (!isInRegion) {
      return {
        fillColor: '#95a5a6',
        weight: 1,
        opacity: 0.5,
        color: '#7f8c8d',
        dashArray: '3',
        fillOpacity: 0.3
      }
    }
    
    return {
      fillColor: '#3498db',
      weight: 2,
      opacity: 1,
      color: '#2980b9',
      dashArray: '',
      fillOpacity: 0.7
    }
  }, [selectedRegion, correctlyGuessedCountries, incorrectCountry, currentCountry, incorrectAttempts, gameState])

  // Handle country interactions - wrapped in useCallback to prevent recreation
  const onEachCountry = useCallback((feature, layer) => {
    const countryName = feature.properties.name || feature.properties.NAME
    
    // Check if country is in the selected region using the continent mapping
    let isInRegion = false
    if (selectedRegion === 'World') {
      isInRegion = true
    } else {
      const regionData = regions[selectedRegion]
      if (regionData && regionData.continent) {
        const continent = getContinent(countryName)
        isInRegion = continent === regionData.continent
      }
    }
      
    // Always attach events, but check conditions inside the handlers
    layer.on({
      mouseover: (e) => {
        if (!isInRegion || gameState !== 'playing') return
        
        // Don't apply hover effects if this country is currently showing as incorrect
        const isIncorrectlySelected = incorrectCountry && 
          (incorrectCountry.properties.name || incorrectCountry.properties.NAME) === countryName

        // Don't apply hover effects if this is the target country being hinted
        const currentCountryName = currentCountry?.properties?.name || currentCountry?.properties?.NAME
        const isTargetCountryHint = currentCountryName === countryName &&
          incorrectAttempts >= 3
        
        if (isIncorrectlySelected || isTargetCountryHint) return
        
        const layer = e.target
        layer.setStyle({
          weight: 3,
          color: '#fff',
          dashArray: '',
          fillOpacity: 0.9
        })
        layer.bringToFront()
      },
      mouseout: (e) => {
        if (!isInRegion || gameState !== 'playing') return
        
        const layer = e.target
        layer.setStyle(getCountryStyle(feature))
      },
      click: (e) => {
        console.log(`Clicked on ${countryName}, gameState: ${gameState}, isInRegion: ${isInRegion}`)
        if (isInRegion && gameState === 'playing' && onCountrySelect) {
          console.log('Calling onCountrySelect')
          onCountrySelect(feature)
        } else {
          console.log('Click ignored - conditions not met')
        }
      }
    })

    // Add keyboard accessibility
    layer.on('keydown', (e) => {
      if ((e.originalEvent.key === 'Enter' || e.originalEvent.key === ' ') && 
          gameState === 'playing' && onCountrySelect) {
        e.preventDefault()
        onCountrySelect(feature)
      }
    })

    // Make layer focusable for accessibility
    if (layer.getElement) {
      const element = layer.getElement()
      if (element) {
        element.setAttribute('tabindex', '0')
        element.setAttribute('role', 'button')
        element.setAttribute('aria-label', `Select ${countryName}`)
      }
    }
  }, [selectedRegion, gameState, onCountrySelect, getCountryStyle, incorrectCountry, currentCountry, incorrectAttempts])

  // Effect to handle incorrect country highlighting
  useEffect(() => {
    if (feedback?.type === 'incorrect' && feedback.selectedCountry) {
      setIncorrectCountry(feedback.selectedCountry)
      
      // Clear the incorrect highlight after the feedback clears
      const timer = setTimeout(() => {
        setIncorrectCountry(null)
      }, 2000)
      
      return () => clearTimeout(timer)
    } else {
      setIncorrectCountry(null)
    }
  }, [feedback])

  // Get initial map bounds
  const getInitialBounds = () => {
    const regionData = regions[selectedRegion]
    if (regionData && regionData.bounds) {
      return [
        [regionData.bounds[0][1], regionData.bounds[0][0]], // southwest
        [regionData.bounds[1][1], regionData.bounds[1][0]]  // northeast
      ]
    }
    return [[-90, -180], [90, 180]] // World bounds
  }
  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {/* Map Quality Controls */}
      <MapQualityControls
        currentResolution={currentResolution}
        onResolutionChange={changeResolution}
        isLoading={isLoading}
      />
      
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            border: '2px solid #ffffff30',
            borderTop: '2px solid #ffffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'          }}></div>
          Loading high-resolution boundaries...
        </div>
      )}
      
      {/* Display current resolution indicator */}
      {!isLoading && loadedResolution && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '3px',
          fontSize: '10px',
          zIndex: 1000,
          opacity: 0.8
        }}>
          Active: {loadedResolution.replace('_', ' ')}
        </div>
      )}
      <MapContainer
        bounds={getInitialBounds()}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        touchZoom={true}
        boxZoom={false}
        keyboard={true}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          maxZoom={10}
          minZoom={2}
        />        <GeoJSON
          ref={geoJsonRef}
          data={countryData}
          style={getCountryStyle}
          onEachFeature={onEachCountry}
          // Improved rendering options for better polygon definition
          precision={6} // Higher precision for better accuracy
          smoothFactor={0.5} // Lower smoothing for more detailed edges
          tolerance={0} // No tolerance for maximum detail
          key={`${selectedRegion}-${gameState}-${correctlyGuessedCountries.length}-${incorrectAttempts}-${currentResolution}-${loadedResolution}-${isLoading ? 'loading' : 'loaded'}`}
        />
        
        <MapViewController selectedRegion={selectedRegion} />
      </MapContainer>
    </div>
  )
}

export default WorldMap