import React from 'react'

const MapQualityControls = ({ currentResolution, onResolutionChange, isLoading }) => {
  const resolutions = [
    { key: 'HIGH_RES', label: 'High Detail', description: 'Best quality, most difficult' },
    { key: 'MEDIUM_RES', label: 'Medium Detail', description: 'Good balance' },
    { key: 'ALTERNATIVE', label: 'Alternative Source', description: 'Different data source' }
  ]

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      background: 'rgba(255, 255, 255, 0.95)',
      border: '1px solid #ddd',
      borderRadius: '6px',
      padding: '8px',
      fontSize: '12px',
      zIndex: 1000,
      minWidth: '160px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        fontWeight: 'bold', 
        marginBottom: '6px',
        color: '#333'
      }}>
        Map Quality
      </div>
      
      {resolutions.map((resolution) => (
        <label
          key={resolution.key}
          style={{
            display: 'block',
            margin: '4px 0',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1
          }}
        >
          <input
            type="radio"
            name="resolution"
            value={resolution.key}
            checked={currentResolution === resolution.key}
            onChange={() => !isLoading && onResolutionChange(resolution.key)}
            disabled={isLoading}
            style={{ marginRight: '6px' }}
          />
          <span style={{ fontSize: '11px' }}>
            <div style={{ fontWeight: '500' }}>
              {resolution.label}
            </div>
            <div style={{ color: '#666', fontSize: '10px' }}>
              {resolution.description}
            </div>
          </span>
        </label>
      ))}
      
      {isLoading && (
        <div style={{
          marginTop: '8px',
          padding: '4px',
          background: '#f0f8ff',
          border: '1px solid #cce7ff',
          borderRadius: '3px',
          fontSize: '10px',
          color: '#0066cc'
        }}>
          Loading new quality level...
        </div>
      )}
    </div>
  )
}

export default MapQualityControls
