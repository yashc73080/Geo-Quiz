import React, { useState, useEffect, useCallback, useRef } from 'react'
import { MapPin, Trophy, Target, RotateCcw, Play, ChevronDown, Settings } from 'lucide-react'
import WorldMap from './WorldMap'
import { regions, getCountriesForRegion } from '../data/countriesData'
import { useWorldCountriesData } from '../hooks/useWorldCountriesData'

const GeographyQuiz = () => {
  const [gameState, setGameState] = useState('menu') // 'menu', 'playing', 'finished'
  const [selectedRegions, setSelectedRegions] = useState(['World'])
  const [currentCountry, setCurrentCountry] = useState(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [availableCountries, setAvailableCountries] = useState([])
  const [correctlyGuessedCountries, setCorrectlyGuessedCountries] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [gameComplete, setGameComplete] = useState(false)
  const [incorrectAttempts, setIncorrectAttempts] = useState(0)
  const [isRegionDropdownOpen, setIsRegionDropdownOpen] = useState(false)
  // Use ref to maintain current country for click handler
  const currentCountryRef = useRef(null)
  const gameStateRef = useRef('menu')
  const availableCountriesRef = useRef([])
  const regionDropdownRef = useRef(null)

  // Update refs when state changes
  useEffect(() => {
    currentCountryRef.current = currentCountry
  }, [currentCountry])

  useEffect(() => {
    gameStateRef.current = gameState
  }, [gameState])
  useEffect(() => {
    availableCountriesRef.current = availableCountries
  }, [availableCountries])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (regionDropdownRef.current && !regionDropdownRef.current.contains(event.target)) {
        setIsRegionDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  // Use the custom hook to get real country data
  const { features: worldCountriesFeatures, isLoading: countriesLoading } = useWorldCountriesData()

  // Helper function to get countries for multiple regions
  const getCountriesForMultipleRegions = useCallback((regionNames, allCountries) => {
    if (regionNames.includes('World')) {
      return allCountries
    }
    
    const allRegionCountries = new Set()
    
    regionNames.forEach(regionName => {
      const regionCountries = getCountriesForRegion(regionName, allCountries)
      regionCountries.forEach(country => {
        const countryId = country.properties.ISO_A3 || country.properties.name || country.properties.NAME
        allRegionCountries.add(JSON.stringify(country))
      })
    })
    
    return Array.from(allRegionCountries).map(countryStr => JSON.parse(countryStr))
  }, [])
  // Start game function
  const startGame = useCallback(() => {
    setGameState('playing')
    setScore(0)
    setTotalQuestions(0)
    setCurrentCountry(null)
    setCorrectlyGuessedCountries([])
    setFeedback(null)
    setGameComplete(false)
    setIncorrectAttempts(0)
    
    // Reset available countries for the selected regions
    if (worldCountriesFeatures.length > 0) {
      const countries = getCountriesForMultipleRegions(selectedRegions, worldCountriesFeatures)
      
      console.log(`Starting game with ${countries.length} countries for ${selectedRegions.join(', ')}`)
      setAvailableCountries([...countries])
    }
  }, [selectedRegions, worldCountriesFeatures])
  // Initialize available countries based on selected regions
  useEffect(() => {
    if (!worldCountriesFeatures.length) return // Wait for data to load
    
    const countries = getCountriesForMultipleRegions(selectedRegions, worldCountriesFeatures)
    
    console.log(`Filtered countries for ${selectedRegions.join(', ')}:`, countries.map(c => c.properties.name || c.properties.NAME))
    setAvailableCountries([...countries])
  }, [selectedRegions, worldCountriesFeatures, getCountriesForMultipleRegions])

  // Select a random country for the current question
  const selectRandomCountry = useCallback(() => {
    console.log('selectRandomCountry called, availableCountries length:', availableCountries.length)
    
    if (availableCountries.length === 0) {
      console.log('No more countries available - finishing game')
      setGameComplete(true)
      setGameState('finished')
      return
    }
    
    const randomIndex = Math.floor(Math.random() * availableCountries.length)
    const selectedCountry = availableCountries[randomIndex]
    
    console.log('Setting currentCountry to:', selectedCountry.properties.NAME || selectedCountry.properties.name)
    setCurrentCountry(selectedCountry)
    setIncorrectAttempts(0) // Reset incorrect attempts for new question
  }, [availableCountries])

  // Function to remove a country from the available pool and select next
  const removeCountryAndSelectNext = useCallback((countryToRemove) => {
    setAvailableCountries(prev => {
      const countryNameToRemove = countryToRemove.properties.NAME || countryToRemove.properties.name
      const filteredCountries = prev.filter(country => {
        const countryName = country.properties.NAME || country.properties.name
        return countryName !== countryNameToRemove
      })
      
      console.log(`Removed ${countryNameToRemove} from pool. Remaining: ${filteredCountries.length}`)
      
      // Select next country from the updated pool after a delay
      setTimeout(() => {
        setFeedback(null)
        if (filteredCountries.length === 0) {
          console.log('No more countries - finishing game')
          setGameComplete(true)
          setGameState('finished')
        } else {
          const randomIndex = Math.floor(Math.random() * filteredCountries.length)
          const nextCountry = filteredCountries[randomIndex]
          console.log('Setting next country to:', nextCountry.properties.NAME || nextCountry.properties.name)
          setCurrentCountry(nextCountry)
          setIncorrectAttempts(0)
        }
      }, 1500)
      
      return filteredCountries
    })
  }, [])

  // Handle country selection from map - using refs to avoid stale closure
  const handleCountrySelect = useCallback((selectedFeature) => {
    console.log('handleCountrySelect called with:', selectedFeature.properties.NAME || selectedFeature.properties.name)
    console.log('Current state - currentCountry from ref:', currentCountryRef.current?.properties?.NAME || currentCountryRef.current?.properties?.name, 'gameState from ref:', gameStateRef.current)
    
    if (!currentCountryRef.current || gameStateRef.current !== 'playing') {
      console.log('Ignoring click - no current country or not playing', { 
        currentCountry: !!currentCountryRef.current, 
        currentCountryName: currentCountryRef.current?.properties?.NAME,
        gameState: gameStateRef.current 
      })
      return
    }

    setTotalQuestions(prev => prev + 1)
    console.log('Selected:', selectedFeature.properties.NAME || selectedFeature.properties.name, selectedFeature.properties.ISO_A3)
    console.log('Target:', currentCountryRef.current.properties.NAME || currentCountryRef.current.properties.name, currentCountryRef.current.properties.ISO_A3)
    
    // Fix the comparison logic - handle both uppercase and lowercase property names
    const selectedName = selectedFeature.properties.NAME || selectedFeature.properties.name
    const selectedISO = selectedFeature.properties.ISO_A3
    const targetName = currentCountryRef.current.properties.NAME || currentCountryRef.current.properties.name
    const targetISO = currentCountryRef.current.properties.ISO_A3
    
    const isCorrectByName = selectedName === targetName
    // Only compare ISO codes if both are non-empty and valid
    const isCorrectByISO = selectedISO && targetISO && selectedISO !== '' && targetISO !== '' && selectedISO === targetISO
    const isCorrect = isCorrectByName || isCorrectByISO
    
    console.log('Comparison details:', {
      selectedName,
      selectedISO,
      targetName,
      targetISO,
      isCorrectByName,
      isCorrectByISO,
      finalResult: isCorrect
    })

    if (isCorrect) {
      setScore(prev => prev + 1)
      setCorrectlyGuessedCountries(prev => [...prev, currentCountryRef.current])
      setIncorrectAttempts(0) // Reset incorrect attempts
      
      setFeedback({
        type: 'correct',
        message: `Correct! That's ${targetName}!`
      })
      
      // Remove country and select next in one atomic operation
      removeCountryAndSelectNext(currentCountryRef.current)
      
    } else {
      // Increment incorrect attempts
      setIncorrectAttempts(prev => {
        const newAttempts = prev + 1
        console.log('Incorrect attempts:', newAttempts)
        return newAttempts
      })
      
      setFeedback({
        type: 'incorrect',
        message: `Incorrect. That's ${selectedName}.`,
        selectedCountry: selectedFeature // Pass the selected country for visual feedback
      })
      
      // Clear feedback after delay but don't move to next question
      setTimeout(() => {
        setFeedback(null)
      }, 2000)
    }
  }, [removeCountryAndSelectNext])

  // Start the first question when game begins
  useEffect(() => {
    console.log('useEffect for starting question:', { gameState, availableCountriesLength: availableCountries.length, hasCurrentCountry: !!currentCountry })
    
    if (gameState === 'playing' && availableCountries.length > 0 && !currentCountry) {
      console.log('Starting first question')
      selectRandomCountry()
    }
  }, [gameState, availableCountries, currentCountry, selectRandomCountry])  // Handle region change
  const handleRegionChange = (region, checked) => {
    setSelectedRegions(prev => {
      let newSelectedRegions
      
      if (region === 'World') {
        // If World is selected, clear all other selections
        newSelectedRegions = checked ? ['World'] : []
      } else {
        // If another region is selected/deselected
        if (checked) {
          // Remove 'World' if it was selected and add the new region
          newSelectedRegions = prev.filter(r => r !== 'World').concat(region)
        } else {
          // Remove the region
          newSelectedRegions = prev.filter(r => r !== region)
        }
      }
      
      // If no regions are selected, default to World
      if (newSelectedRegions.length === 0) {
        newSelectedRegions = ['World']
      }
      
      return newSelectedRegions
    })
    
    if (gameState === 'playing') {
      // If playing, reset the current country and correctly guessed countries
      // but don't go back to menu - just restart with new regions
      setCurrentCountry(null)
      setCorrectlyGuessedCountries([])
      setScore(0)
      setTotalQuestions(0)
      setIncorrectAttempts(0)
      setFeedback(null)
    }
    
    // Optional: Close dropdown after a short delay when making selections
    // Uncomment the next two lines if you want auto-close behavior
    // setTimeout(() => {
    //   setIsRegionDropdownOpen(false)
    // }, 1000)
  }
  // Calculate progress percentage
  const getProgress = () => {
    if (!worldCountriesFeatures.length) return 0
    
    const totalCountries = getCountriesForMultipleRegions(selectedRegions, worldCountriesFeatures).length
    const completed = totalCountries - availableCountries.length
    return totalCountries > 0 ? (completed / totalCountries) * 100 : 0
  }

  // Add this useEffect to debug feedback changes
  useEffect(() => {
    console.log('Feedback state changed:', feedback)
  }, [feedback])

  // Add this useEffect to debug currentCountry changes
  useEffect(() => {
    console.log('Current country changed:', currentCountry?.properties?.NAME || currentCountry?.properties?.name)
  }, [currentCountry])

  return (
    <div className="geography-quiz">      {/* Header */}
      <header className="quiz-header">
        <div className="header-content">
          <h1 className="app-title">GeoQuest</h1>
          
          <div className="game-info">
            <div className="game-controls">
              {gameState === 'playing' && (
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setGameState('menu')
                    setCurrentCountry(null)
                  }}
                  aria-label="Return to main menu"
                >
                  <RotateCcw size={16} />
                  Menu
                </button>
              )}
            </div>
            
            {gameState === 'playing' && (              <div className="score-display" role="status" aria-live="polite">
                <div className="score-item">
                  <Trophy size={18} color="#FFD700" fill="#FFF" aria-hidden="true" />
                  <span aria-label={`Score: ${score} out of ${totalQuestions}`}>
                    Score: {score}/{totalQuestions}
                  </span>
                </div>                <div className="score-item">
                  <Target size={16} color="#3498db" aria-hidden="true" />
                  <span aria-label={`Accuracy: ${Math.round((score / Math.max(totalQuestions, 1)) * 100)} percent`}>
                    {Math.round((score / Math.max(totalQuestions, 1)) * 100)}% Accuracy
                  </span>
                </div><div className="score-item">
                  <div className="progress-container" role="progressbar" aria-valuenow={getProgress()} aria-valuemin="0" aria-valuemax="100">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${getProgress()}%` }}
                      aria-hidden="true"
                    ></div>
                  </div>
                  <span className="progress-text">
                    {Math.round(getProgress())}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>      {/* Current Question */}
      {gameState === 'playing' && currentCountry && (
        <div className="current-question" role="main">
          <p className="question-text">
            <MapPin size={24} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />
            Find: <strong>{currentCountry.properties.NAME || currentCountry.properties.name}</strong>
          </p>
          {incorrectAttempts >= 3 && (
            <p className="hint-text" style={{
              fontSize: '1rem',
              marginTop: '0.5rem',
              opacity: 0.9,
              fontWeight: 400
            }}>
              💡 The target country is highlighted in yellow on the map
            </p>
          )}
        </div>
      )}      {/* Map Container */}
      <div className="map-container">
        {/* Region Selector - Show on menu and playing screens */}
        {(gameState === 'menu' || gameState === 'playing') && (
          <div className="menu-region-selector" ref={regionDropdownRef}>
            <button 
              className="region-dropdown-toggle"
              onClick={() => setIsRegionDropdownOpen(!isRegionDropdownOpen)}
              aria-expanded={isRegionDropdownOpen}
              aria-label="Select regions for geography quiz"
            >
              <Settings size={16} aria-hidden="true" />
              <span className="dropdown-text">
                Regions ({selectedRegions.length})
              </span>
              <ChevronDown 
                size={16} 
                className={`dropdown-arrow ${isRegionDropdownOpen ? 'open' : ''}`} 
                aria-hidden="true" 
              />
            </button>
            
            {isRegionDropdownOpen && (
              <div className="region-checkboxes-dropdown">
                <h3 className="region-title">Select Regions:</h3>
                {Object.keys(regions).map(region => (
                  <label key={region} className="region-checkbox-label">
                    <input
                      type="checkbox"
                      className="region-checkbox"
                      checked={selectedRegions.includes(region)}
                      onChange={(e) => handleRegionChange(region, e.target.checked)}
                      aria-label={`Include ${regions[region].name} in quiz`}
                    />
                    <span className="checkbox-text">{regions[region].name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}

        <WorldMap
          selectedRegions={selectedRegions}
          onCountrySelect={handleCountrySelect}
          currentCountry={currentCountry}
          gameState={gameState}
          correctlyGuessedCountries={correctlyGuessedCountries}
          feedback={feedback}
          incorrectAttempts={incorrectAttempts}
        />

        {/* Game State Messages */}
        {gameState === 'menu' && (
          <div className="game-message" role="main">
            <h2 className="message-title">Welcome to GeoQuest!</h2>
            <p className="message-content">
              Test your geography knowledge by finding countries on the world map. 
              Select a region below and start your quiz!
            </p>            <p className="message-content">
              <strong>Selected Regions:</strong> {selectedRegions.map(region => regions[region].name).join(', ')}
            </p>
            <div className="action-buttons">
              <button 
                className="btn btn-primary" 
                onClick={startGame}
                disabled={countriesLoading || !worldCountriesFeatures.length}
                aria-label="Start geography quiz"
              >
                <Play size={20} aria-hidden="true" />
                {countriesLoading ? 'Loading Countries...' : 'Start Quiz'}
              </button>
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="game-message" role="main">
            <h2 className="message-title">Quiz Complete!</h2>            <p className="message-content">
              Congratulations! You've completed the quiz for {selectedRegions.map(region => regions[region].name).join(', ')}.
            </p>
            <p className="message-content">
              <strong>Final Score:</strong> {score} out of {totalQuestions} ({Math.round((score / Math.max(totalQuestions, 1)) * 100)}%)
            </p>
            <div className="action-buttons">
              <button 
                className="btn btn-success" 
                onClick={startGame}
                aria-label="Start new geography quiz"
              >
                <RotateCcw size={20} aria-hidden="true" />
                Play Again
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setGameState('menu')}
                aria-label="Return to main menu"
              >
                Back to Menu
              </button>
            </div>
          </div>
        )}

        {/* Feedback Messages */}
        {feedback && (
          <div className={`feedback-message feedback-${feedback.type} feedback-top-right`} role="alert" aria-live="assertive">
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default GeographyQuiz;