# Copilot Instructions for Geography Quiz Application

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

This is a React.js geography learning web application with the following key features:

## Project Architecture
- **Framework**: React.js with Vite for fast development
- **Mapping**: Leaflet and React-Leaflet for interactive maps
- **Data**: Natural Earth GeoJSON data for country boundaries
- **Styling**: CSS modules with responsive design
- **State Management**: React hooks and context for game state

## Key Components
- `GeographyQuiz`: Main application component
- `WorldMap`: Interactive map component using Leaflet
- `GameControls`: Region selection and game controls
- `ScoreBoard`: Display current score and progress
- `CountrySelector`: Game logic for country selection

## Coding Guidelines
- Use functional components with React hooks
- Implement responsive design for mobile and desktop
- Follow accessibility best practices
- Use semantic HTML and proper ARIA labels
- Optimize performance for map rendering and interactions
- Handle touch and mouse events for cross-platform compatibility

## Data Sources
- Natural Earth data for country boundaries (public domain)
- GeoJSON format for web optimization
- Regional filtering for focused gameplay

## Game Mechanics
- Random country selection by region
- Visual feedback for correct/incorrect answers
- Score tracking and progress indicators
- Multiple difficulty levels and region focus
