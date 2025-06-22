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

const WorldMap = ({ selectedRegion, onCountrySelect, currentCountry, gameState }) => {
  const geoJsonRef = useRef()
  const { countryData, isLoading } = useWorldCountriesData()

  // Style function for countries
  const getCountryStyle = (feature) => {
    const isCurrentCountry = currentCountry && 
      (feature.properties.NAME === currentCountry.properties.NAME ||
       feature.properties.ISO_A3 === currentCountry.properties.ISO_A3)
    
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
    
    return {
      fillColor: isCurrentCountry ? '#e74c3c' : '#3498db',
      weight: 2,
      opacity: 1,
      color: isCurrentCountry ? '#c0392b' : '#2980b9',
      dashArray: '',
      fillOpacity: 0.7,
      interactive: gameState === 'playing'
    }
  }

  // Handle country interactions
  const onEachCountry = (feature, layer) => {
    const regionData = regions[selectedRegion]
    const isInRegion = selectedRegion === 'World' || 
      regionData.countries.includes(feature.properties.NAME) ||
      feature.properties.CONTINENT === selectedRegion ||
      feature.properties.SUBREGION?.includes(selectedRegion)
    
    if (!isInRegion || gameState !== 'playing') {
      return
    }

    layer.on({
      mouseover: (e) => {
        const layer = e.target
        layer.setStyle({
          weight: 3,
          color: '#fff',
          dashArray: '',
          fillOpacity: 0.9
        })
        layer.bringToFront()
        
        // Show tooltip with country name
        layer.bindTooltip(feature.properties.NAME, {
          permanent: false,
          direction: 'center',
          className: 'country-tooltip'
        }).openTooltip()
      },
      mouseout: (e) => {
        const layer = e.target
        layer.setStyle(getCountryStyle(feature))
        layer.closeTooltip()
      },
      click: (e) => {
        if (gameState === 'playing' && onCountrySelect) {
          onCountrySelect(feature)
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
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={10}
          minZoom={2}
        />
        <GeoJSON
          ref={geoJsonRef}
          data={countryData}
          style={getCountryStyle}
          onEachFeature={onEachCountry}
          key={`${selectedRegion}-${gameState}-${currentCountry?.properties.NAME || 'none'}-${isLoading ? 'loading' : 'loaded'}`}
        />
        
        <MapViewController selectedRegion={selectedRegion} />
      </MapContainer>
    </div>
  )
}

export default WorldMap
