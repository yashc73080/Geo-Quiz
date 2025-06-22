import React, { useState, useEffect, useCallback } from 'react'
import { MapPin, Trophy, Target, RotateCcw, Play } from 'lucide-react'
import WorldMap from './WorldMap'
import { regions } from '../data/countriesData'
import { useWorldCountriesData } from '../hooks/useWorldCountriesData'

const GeographyQuiz = () => {
  const [gameState, setGameState] = useState('menu') // 'menu', 'playing', 'finished'
  const [selectedRegion, setSelectedRegion] = useState('World')
  const [currentCountry, setCurrentCountry] = useState(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [availableCountries, setAvailableCountries] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [gameComplete, setGameComplete] = useState(false)

  // Use the custom hook to get real country data
  const { features: worldCountriesFeatures, isLoading: countriesLoading } = useWorldCountriesData()
  // Initialize available countries based on selected region
  useEffect(() => {
    if (!worldCountriesFeatures.length) return // Wait for data to load
    
    const regionData = regions[selectedRegion]
    let countries = []
    
    if (selectedRegion === 'World') {
      countries = worldCountriesFeatures
    } else {
      countries = worldCountriesFeatures.filter(feature => 
        regionData.countries.includes(feature.properties.NAME) ||
        feature.properties.CONTINENT === selectedRegion ||
        feature.properties.SUBREGION?.includes(selectedRegion)
      )
    }
    
    setAvailableCountries([...countries])
  }, [selectedRegion, worldCountriesFeatures])

  // Select a random country for the current question
  const selectRandomCountry = useCallback(() => {
    if (availableCountries.length === 0) {
      setGameComplete(true)
      setGameState('finished')
      return
    }
    
    const randomIndex = Math.floor(Math.random() * availableCountries.length)
    const selectedCountry = availableCountries[randomIndex]
    setCurrentCountry(selectedCountry)
    
    // Remove the selected country from available countries
    setAvailableCountries(prev => prev.filter((_, index) => index !== randomIndex))
  }, [availableCountries])
  // Start a new game
  const startGame = () => {
    if (!worldCountriesFeatures.length) {
      console.warn('Cannot start game: country data not loaded yet')
      return
    }
    
    setGameState('playing')
    setScore(0)
    setTotalQuestions(0)
    setGameComplete(false)
    setFeedback(null)
    
    // Reset available countries
    const regionData = regions[selectedRegion]
    let countries = []
    
    if (selectedRegion === 'World') {
      countries = worldCountriesFeatures
    } else {
      countries = worldCountriesFeatures.filter(feature => 
        regionData.countries.includes(feature.properties.NAME) ||
        feature.properties.CONTINENT === selectedRegion ||
        feature.properties.SUBREGION?.includes(selectedRegion)
      )
    }
    
    setAvailableCountries([...countries])
  }

  // Handle country selection from map
  const handleCountrySelect = (selectedFeature) => {
    if (!currentCountry || gameState !== 'playing') return

    setTotalQuestions(prev => prev + 1)
    
    const isCorrect = selectedFeature.properties.NAME === currentCountry.properties.NAME ||
                     selectedFeature.properties.ISO_A3 === currentCountry.properties.ISO_A3

    if (isCorrect) {
      setScore(prev => prev + 1)
      setFeedback({
        type: 'correct',
        message: `Correct! That's ${currentCountry.properties.NAME}!`
      })
      
      // Select next country after a short delay
      setTimeout(() => {
        setFeedback(null)
        selectRandomCountry()
      }, 1500)
    } else {
      setFeedback({
        type: 'incorrect',
        message: `Incorrect. Try again! You selected ${selectedFeature.properties.NAME}`
      })
      
      // Clear feedback after delay but don't move to next question
      setTimeout(() => {
        setFeedback(null)
      }, 2000)
    }
  }

  // Start the first question when game begins
  useEffect(() => {
    if (gameState === 'playing' && availableCountries.length > 0 && !currentCountry) {
      selectRandomCountry()
    }
  }, [gameState, availableCountries, currentCountry, selectRandomCountry])

  // Handle region change
  const handleRegionChange = (region) => {
    setSelectedRegion(region)
    if (gameState === 'playing') {
      setGameState('menu')
      setCurrentCountry(null)
    }
  }
  // Calculate progress percentage
  const getProgress = () => {
    if (!worldCountriesFeatures.length) return 0
    
    const regionData = regions[selectedRegion]
    let totalCountries = 0
    
    if (selectedRegion === 'World') {
      totalCountries = worldCountriesFeatures.length
    } else {
      totalCountries = worldCountriesFeatures.filter(feature => 
        regionData.countries.includes(feature.properties.NAME) ||
        feature.properties.CONTINENT === selectedRegion ||
        feature.properties.SUBREGION?.includes(selectedRegion)
      ).length
    }
    
    const completed = totalCountries - availableCountries.length
    return totalCountries > 0 ? (completed / totalCountries) * 100 : 0
  }

  return (
    <div className="geography-quiz">
      {/* Header */}
      <header className="quiz-header">
        <div className="header-content">
          <h1 className="app-title">Geography Quiz</h1>
          
          <div className="game-info">
            <div className="game-controls">
              <select 
                className="region-selector"
                value={selectedRegion}
                onChange={(e) => handleRegionChange(e.target.value)}
                aria-label="Select region"
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
                  aria-label="Return to menu"
                >
                  <RotateCcw size={16} />
                  Menu
                </button>
              )}
            </div>
            
            {gameState === 'playing' && (
              <div className="score-display">
                <div className="score-item">
                  <Trophy size={16} />
                  Score: {score}/{totalQuestions}
                </div>
                <div className="score-item">
                  <Target size={16} />
                  {Math.round((score / Math.max(totalQuestions, 1)) * 100)}% Accuracy
                </div>
                <div className="score-item">
                  <div className="progress-container">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${getProgress()}%` }}
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
        <div className="current-question">
          <p className="question-text">
            <MapPin size={24} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />
            Find: <strong>{currentCountry.properties.NAME}</strong>
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
        />

        {/* Game State Messages */}
        {gameState === 'menu' && (
          <div className="game-message">
            <h2 className="message-title">Welcome to Geography Quiz!</h2>
            <p className="message-content">
              Test your geography knowledge by finding countries on the world map. 
              Select a region below and start your quiz!
            </p>
            <p className="message-content">
              <strong>Region:</strong> {regions[selectedRegion].name}
            </p>            <div className="action-buttons">              <button 
                className="btn btn-primary" 
                onClick={startGame}
                disabled={countriesLoading || !worldCountriesFeatures.length}
              >
                <Play size={20} />
                {countriesLoading ? 'Loading Countries...' : 'Start Quiz'}
              </button>
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="game-message">
            <h2 className="message-title">Quiz Complete!</h2>
            <p className="message-content">
              Congratulations! You've completed the {regions[selectedRegion].name} quiz.
            </p>
            <p className="message-content">
              <strong>Final Score:</strong> {score} out of {totalQuestions} ({Math.round((score / Math.max(totalQuestions, 1)) * 100)}%)
            </p>
            <div className="action-buttons">
              <button className="btn btn-success" onClick={startGame}>
                <RotateCcw size={20} />
                Play Again
              </button>
              <button className="btn btn-secondary" onClick={() => setGameState('menu')}>
                Back to Menu
              </button>
            </div>
          </div>
        )}

        {/* Feedback Messages */}
        {feedback && (
          <div className={`feedback-message feedback-${feedback.type}`}>
            {feedback.message}
          </div>
        )}
      </div>
    </div>
  )
}

export default GeographyQuiz
