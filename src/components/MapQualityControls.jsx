import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const MapQualityControls = ({ currentResolution, onResolutionChange, isLoading }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const resolutions = [
    { key: 'HIGH_RES', label: 'High Detail', description: 'Best quality, most difficult' },
    { key: 'MEDIUM_RES', label: 'Medium Detail', description: 'Good balance, easier' },
    { key: 'ALTERNATIVE', label: 'Alternative Source', description: 'Different data source' }
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          width: '44px',
          height: '44px',
          background: 'rgba(255, 255, 255, 0.95)',
          border: '1px solid #ddd',
          borderRadius: '8px',
          cursor: 'pointer',
          zIndex: 1001,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3px',
          transition: 'all 0.2s ease',
          ':hover': {
            background: 'rgba(255, 255, 255, 1)',
            transform: 'translateY(-1px)'
          }
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 1)'
          e.target.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(255, 255, 255, 0.95)'
          e.target.style.transform = 'translateY(0)'
        }}        aria-label="Toggle map quality controls"
        title="Map Quality Settings"
      >
        {/* Animated Menu/X Icon */}
        <div style={{
          position: 'relative',
          width: '20px',
          height: '20px'
        }}>
          <Menu 
            size={20}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: '#333',
              transition: 'all 0.3s ease',
              opacity: isMenuOpen ? 0 : 1,
              transform: isMenuOpen ? 'rotate(90deg) scale(0.8)' : 'rotate(0deg) scale(1)',
            }}
          />
          <X 
            size={20}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              color: '#333',
              transition: 'all 0.3s ease',
              opacity: isMenuOpen ? 1 : 0,
              transform: isMenuOpen ? 'rotate(0deg) scale(1)' : 'rotate(-90deg) scale(0.8)',
            }}
          />
        </div>
      </button>

      {/* Expandable Menu Panel */}
      {isMenuOpen && (
        <>
          {/* Backdrop to close menu when clicking outside */}
          <div
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
              background: 'transparent'
            }}
          />
          
          {/* Menu Content */}
          <div style={{
            position: 'absolute',
            bottom: '60px',
            left: '10px',
            background: 'rgba(255, 255, 255, 0.98)',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '12px',
            zIndex: 1000,
            minWidth: '180px',
            maxWidth: '220px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            animation: 'slideUp 0.2s ease-out',
            backdropFilter: 'blur(4px)'
          }}>
            <div style={{ 
              fontWeight: 'bold', 
              marginBottom: '8px',
              color: '#333',
              fontSize: '13px',
              borderBottom: '1px solid #eee',
              paddingBottom: '6px'
            }}>
              🗺️ Map Quality Settings
            </div>
            
            {resolutions.map((resolution) => (
              <label
                key={resolution.key}
                style={{
                  display: 'block',
                  margin: '6px 0',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  opacity: isLoading ? 0.6 : 1,
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'background-color 0.2s ease',
                  ':hover': {
                    backgroundColor: 'rgba(74, 144, 226, 0.1)'
                  }
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = 'rgba(74, 144, 226, 0.1)'
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent'
                }}
              >
                <input
                  type="radio"
                  name="resolution"
                  value={resolution.key}
                  checked={currentResolution === resolution.key}
                  onChange={() => !isLoading && onResolutionChange(resolution.key)}
                  disabled={isLoading}
                  style={{ 
                    marginRight: '8px',
                    accentColor: '#4a90e2'
                  }}
                />
                <span style={{ fontSize: '11px' }}>
                  <div style={{ 
                    fontWeight: currentResolution === resolution.key ? '600' : '500',
                    color: currentResolution === resolution.key ? '#4a90e2' : '#333'
                  }}>
                    {resolution.label}
                  </div>
                  <div style={{ 
                    color: '#666', 
                    fontSize: '10px',
                    marginTop: '2px'
                  }}>
                    {resolution.description}
                  </div>
                </span>
              </label>
            ))}
            
            {isLoading && (
              <div style={{
                marginTop: '10px',
                padding: '6px',
                background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f3ff 100%)',
                border: '1px solid #cce7ff',
                borderRadius: '4px',
                fontSize: '10px',
                color: '#0066cc',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  border: '2px solid #cce7ff',
                  borderTop: '2px solid #0066cc',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Loading new quality level...
              </div>
            )}          </div>
        </>
      )}
    </>
  )
}

export default MapQualityControls
