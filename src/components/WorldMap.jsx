import React, { useEffect } from 'react'
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

const WorldMap = ({ selectedRegion, onCountrySelect, gameState, guessedIds = [], lastSelectedId }) => {
   const { countryData, isLoading } = useWorldCountriesData()

   // Style function for countries based on props
   const getCountryStyle = (feature) => {
     const id = feature.properties.ISO_A3
     const regionData = regions[selectedRegion]
     const inRegion = selectedRegion === 'World' ||
       regionData.countries.includes(feature.properties.NAME) ||
       feature.properties.CONTINENT === selectedRegion ||
       feature.properties.SUBREGION?.includes(selectedRegion)

     if (!inRegion) {
       return { fillColor: '#f0f0f0', weight: 1, opacity: 0.3, color: '#ccc', fillOpacity: 0.2, interactive: false }
     }

     // Wrong guess highlight
    if (id === lastSelectedId) {
      return { fillColor: '#e74c3c', color: '#c0392b', weight: 3, fillOpacity: 0.9 }
    }

    // Correctly guessed countries
    if (guessedIds.includes(id)) {
      return { fillColor: '#27ae60', color: '#229954', weight: 2, fillOpacity: 0.7 }
    }

     // Default style for others
     return { fillColor: '#3498db', color: '#2980b9', weight: 2, fillOpacity: 0.7, interactive: gameState === 'playing' && inRegion, cursor: gameState === 'playing' && inRegion ? 'pointer' : 'default' }
   }

   // Handle country interactions
   const onEachCountry = (feature, layer) => {
     const regionData = regions[selectedRegion]
     const inRegion = selectedRegion === 'World' ||
       regionData.countries.includes(feature.properties.NAME) ||
       feature.properties.CONTINENT === selectedRegion ||
       feature.properties.SUBREGION?.includes(selectedRegion)

     layer.on({
       mouseover: (e) => {
         if (!inRegion || gameState !== 'playing') return
         e.target.setStyle({ weight: 3, color: '#fff', fillOpacity: 0.9 })
       },
       mouseout: (e) => {
         if (!inRegion || gameState !== 'playing') return
         e.target.setStyle(getCountryStyle(feature))
       },
       click: () => {
         if (inRegion && gameState === 'playing' && onCountrySelect) {
           onCountrySelect(feature)
         }
       }
     })

     // Accessibility
     layer.on('keydown', (e) => {
       if ((e.originalEvent.key === 'Enter' || e.originalEvent.key === ' ') && gameState === 'playing') {
         e.preventDefault()
         onCountrySelect(feature)
       }
     })

     // Make focusable
     const el = layer.getElement && layer.getElement()
     if (el) {
       el.setAttribute('tabindex', '0')
       el.setAttribute('role', 'button')
       el.setAttribute('aria-label', `Select ${feature.properties.NAME}`)
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
         data={countryData}
         style={getCountryStyle}
         onEachFeature={onEachCountry}
        key={`${selectedRegion}-${gameState}-${guessedIds.length}-${lastSelectedId || 'none'}`}
      />
        
        <MapViewController selectedRegion={selectedRegion} />
      </MapContainer>
    </div>
  )
}

export default WorldMap
