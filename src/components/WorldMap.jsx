import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { regions } from '../data/countriesData'
import { useWorldCountriesData } from '../hooks/useWorldCountriesData'

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

const WorldMap = ({ selectedRegion, onCountrySelect, currentCountry, gameState, correctlyGuessedCountries = [] }) => {
  const geoJsonRef = useRef()
  const { countryData, isLoading } = useWorldCountriesData()

  console.log('WorldMap render:', { gameState, selectedRegion, hasOnCountrySelect: !!onCountrySelect })
  // Style function for countries
  const getCountryStyle = (feature) => {
    const isCorrectlyGuessed = correctlyGuessedCountries.some(country => 
      country.properties.NAME === feature.properties.NAME ||
      country.properties.ISO_A3 === feature.properties.ISO_A3
    )
    
    // Filter countries based on selected region
    const regionData = regions[selectedRegion]
    const isInRegion = selectedRegion === 'World' || 
      regionData.countries.includes(feature.properties.NAME) ||
      feature.properties.CONTINENT === selectedRegion ||
      feature.properties.SUBREGION?.includes(selectedRegion)
    
    if (!isInRegion) {
      return {
        fillColor: '#f0f0f0',
        weight: 1,
        opacity: 0.3,
        color: '#ccc',
        fillOpacity: 0.2,
        interactive: false
      }
    }
    
    // Color logic: Green for correctly guessed, blue for unguessed (no special highlight for current target)
    let fillColor = '#3498db' // Default blue
    let borderColor = '#2980b9'
    
    if (isCorrectlyGuessed) {
      fillColor = '#27ae60' // Green for correctly guessed
      borderColor = '#229954'
    }
      return {
      fillColor: fillColor,
      weight: 2,
      opacity: 1,
      color: borderColor,
      dashArray: '',
      fillOpacity: 0.7,
      interactive: gameState === 'playing' && isInRegion,
      cursor: gameState === 'playing' && isInRegion ? 'pointer' : 'default'
    }
  }
  // Handle country interactions
  const onEachCountry = (feature, layer) => {
    const regionData = regions[selectedRegion]
    const isInRegion = selectedRegion === 'World' || 
      regionData.countries.includes(feature.properties.NAME) ||
      feature.properties.CONTINENT === selectedRegion ||
      feature.properties.SUBREGION?.includes(selectedRegion)
      console.log(`Setting up events for ${feature.properties.NAME}`)

    // Always attach events, but check conditions inside the handlers
    layer.on({
      mouseover: (e) => {
        if (!isInRegion || gameState !== 'playing') return
        
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
        console.log(`Clicked on ${feature.properties.NAME}, gameState: ${gameState}, isInRegion: ${isInRegion}`)
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

    // Make layer focusable
    if (layer.getElement) {
      const element = layer.getElement()
      if (element) {
        element.setAttribute('tabindex', '0')
        element.setAttribute('role', 'button')
        element.setAttribute('aria-label', `Select ${feature.properties.NAME}`)
      }
    }
  }

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
            animation: 'spin 1s linear infinite'
          }}></div>
          Loading real country boundaries...
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
      >        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
          maxZoom={10}
          minZoom={2}
        />        <GeoJSON
          ref={geoJsonRef}
          data={countryData}
          style={getCountryStyle}
          onEachFeature={onEachCountry}
          key={`${selectedRegion}-${gameState}-${correctlyGuessedCountries.length}-${isLoading ? 'loading' : 'loaded'}`}
        />
        
        <MapViewController selectedRegion={selectedRegion} />
      </MapContainer>
    </div>
  )
}

export default WorldMap
