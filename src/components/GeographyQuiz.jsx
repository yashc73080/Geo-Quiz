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
  const [guessedIds, setGuessedIds] = useState([]) // ISO_A3 codes guessed correctly
  const [feedback, setFeedback] = useState(null)
  const [lastWrongId, setLastWrongId] = useState(null) // last clicked wrong id
  const [gameComplete, setGameComplete] = useState(false)

  // Change region and reset the game state
  const handleRegionChange = (region) => {
    setSelectedRegion(region)
    setGameState('menu')
    setCurrentCountry(null)
    setAvailableCountries([])
    setGuessedIds([])
    setLastWrongId(null)
    setScore(0)
    setTotalQuestions(0)
    setFeedback(null)
  }

  // Use the custom hook to get real country data
  const { features: worldCountriesFeatures, isLoading: countriesLoading } = useWorldCountriesData()

  // Select a new random country from the pool
  const selectRandomCountry = useCallback(() => {
    if (availableCountries.length === 0) {
      setGameComplete(true)
      setGameState('finished')
      return
    }
    const idx = Math.floor(Math.random() * availableCountries.length)
    const next = availableCountries[idx]
    setCurrentCountry(next)
    setAvailableCountries(prev => prev.filter((_, i) => i !== idx))
  }, [availableCountries])

  // Start or reset the game
  const startGame = () => {
    if (!worldCountriesFeatures.length) return
    // Filter by region
    const regionData = regions[selectedRegion]
    const pool = worldCountriesFeatures.filter(f =>
      selectedRegion === 'World' ||
      regionData.countries.includes(f.properties.NAME) ||
      f.properties.CONTINENT === selectedRegion ||
      f.properties.SUBREGION?.includes(selectedRegion)
    )
    if (!pool.length) {
      setGameComplete(true)
      setGameState('finished')
      return
    }
    // Initialize
    setAvailableCountries(pool)
    setGuessedIds([])
    setLastWrongId(null)
    setScore(0)
    setTotalQuestions(0)
    setFeedback(null)
    setGameComplete(false)
    setGameState('playing')
    // First question
    // Use next tick
    setTimeout(selectRandomCountry, 0)
  }

  // Handle country selection from map
  const handleCountrySelect = (feature) => {
    if (gameState !== 'playing' || !currentCountry) return
    const selectedId = feature.properties.ISO_A3
    const correctId = currentCountry.properties.ISO_A3
    setTotalQuestions(prev => prev + 1)
    if (selectedId === correctId) {
      // Correct guess
      setScore(prev => prev + 1)
      setGuessedIds(prev => [...prev, correctId])
      setFeedback({ type: 'correct', message: 'Correct!' })
      setTimeout(() => {
        setFeedback(null)
        selectRandomCountry()
      }, 1000)
    } else {
      // Wrong guess
      setLastWrongId(selectedId)
      setFeedback({ type: 'incorrect', message: 'Incorrect. Try again.' })
      setTimeout(() => {
        setLastWrongId(null)
        setFeedback(null)
      }, 1000)
    }
  }

  // Reset currentCountry when changing region or menu
  useEffect(() => {
    if (gameState !== 'playing') {
      setCurrentCountry(null)
    }
  }, [gameState, selectedRegion])

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
      <div className="map-container">        <WorldMap
          selectedRegion={selectedRegion}
          onCountrySelect={handleCountrySelect}
          gameState={gameState}
          guessedIds={guessedIds}
          lastSelectedId={lastWrongId}
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
