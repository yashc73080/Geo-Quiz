import React, { useState, useEffect, useCallback, useRef } from 'react'
import { MapPin, Trophy, Target, RotateCcw, Play } from 'lucide-react'
import WorldMap from './WorldMap'
import { regions, getCountriesForRegion } from '../data/countriesData'
import { useWorldCountriesData } from '../hooks/useWorldCountriesData'

const GeographyQuiz = () => {
  const [gameState, setGameState] = useState('menu') // 'menu', 'playing', 'finished'
  const [selectedRegion, setSelectedRegion] = useState('World')
  const [currentCountry, setCurrentCountry] = useState(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [availableCountries, setAvailableCountries] = useState([])
  const [correctlyGuessedCountries, setCorrectlyGuessedCountries] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [gameComplete, setGameComplete] = useState(false)
  const [incorrectAttempts, setIncorrectAttempts] = useState(0)

  // Use ref to maintain current country for click handler
  const currentCountryRef = useRef(null)
  const gameStateRef = useRef('menu')
  const availableCountriesRef = useRef([])

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

  // Use the custom hook to get real country data
  const { features: worldCountriesFeatures, isLoading: countriesLoading } = useWorldCountriesData()

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
    
    // Reset available countries for the selected region
    if (worldCountriesFeatures.length > 0) {
      const countries = getCountriesForRegion(selectedRegion, worldCountriesFeatures)
      
      console.log(`Starting game with ${countries.length} countries for ${selectedRegion}`)
      setAvailableCountries([...countries])
    }
  }, [selectedRegion, worldCountriesFeatures])

  // Initialize available countries based on selected region
  useEffect(() => {
    if (!worldCountriesFeatures.length) return // Wait for data to load
    
    const countries = getCountriesForRegion(selectedRegion, worldCountriesFeatures)
    
    console.log(`Filtered countries for ${selectedRegion}:`, countries.map(c => c.properties.name || c.properties.NAME))
    setAvailableCountries([...countries])
  }, [selectedRegion, worldCountriesFeatures])

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
  }, [gameState, availableCountries, currentCountry, selectRandomCountry])

  // Handle region change
  const handleRegionChange = (region) => {
    setSelectedRegion(region)
    if (gameState === 'playing') {
      setGameState('menu')
      setCurrentCountry(null)
      setCorrectlyGuessedCountries([]) // Reset correctly guessed when changing region
    }
  }

  // Calculate progress percentage
  const getProgress = () => {
    if (!worldCountriesFeatures.length) return 0
    
    const totalCountries = getCountriesForRegion(selectedRegion, worldCountriesFeatures).length
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
    <div className="geography-quiz">
      {/* Header */}
      <header className="quiz-header">
        <div className="header-content">
          <h1 className="app-title">GeoQuest</h1>
          
          <div className="game-info">
            <div className="game-controls">
              <select 
                className="region-selector"
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
                aria-label="Select region for geography quiz"
              >
                {Object.keys(regions).map(region => (
                  <option key={region} value={region}>
                    {regions[region].name}
                  </option>
                ))}
              </select>
              
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
            
            {gameState === 'playing' && (
              <div className="score-display" role="status" aria-live="polite">
                <div className="score-item">
                  <Trophy size={16} aria-hidden="true" />
                  <span aria-label={`Score: ${score} out of ${totalQuestions}`}>
                    Score: {score}/{totalQuestions}
                  </span>
                </div>
                <div className="score-item">
                  <Target size={16} aria-hidden="true" />
                  <span aria-label={`Accuracy: ${Math.round((score / Math.max(totalQuestions, 1)) * 100)} percent`}>
                    {Math.round((score / Math.max(totalQuestions, 1)) * 100)}% Accuracy
                  </span>
                </div>
                <div className="score-item">
                  <div className="progress-container" role="progressbar" aria-valuenow={getProgress()} aria-valuemin="0" aria-valuemax="100">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${getProgress()}%` }}
                      aria-hidden="true"
                    ></div>
                    <div className="progress-text">
                      {Math.round(getProgress())}% Complete
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Current Question */}
      {gameState === 'playing' && currentCountry && (
        <div className="current-question" role="main">
          <p className="question-text">
            <MapPin size={24} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} aria-hidden="true" />
            Find: <strong>{currentCountry.properties.NAME || currentCountry.properties.name}</strong>
          </p>
        </div>
      )}

      {/* Map Container */}
      <div className="map-container">
        <WorldMap 
          selectedRegion={selectedRegion}
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
            </p>
            <p className="message-content">
              <strong>Region:</strong> {regions[selectedRegion].name}
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
            <h2 className="message-title">Quiz Complete!</h2>
            <p className="message-content">
              Congratulations! You've completed the {regions[selectedRegion].name} quiz.
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
          <div className={`feedback-message feedback-${feedback.type}`} role="alert" aria-live="assertive">
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default GeographyQuiz;