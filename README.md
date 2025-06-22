# Geography Quiz - Interactive World Map Learning Game

A modern, responsive React.js web application that helps users learn world geography through an interactive map-based quiz game. Built with Vite, React-Leaflet, and Natural Earth geographical data.

![Geography Quiz Screenshot](public/screenshot.png)

## 🌍 Features

### Interactive World Map
- **Zoomable and Pannable Map**: Explore countries with smooth zoom and pan controls
- **Country Highlighting**: Hover effects with country names displayed
- **Touch-Friendly**: Optimized for both desktop and mobile devices
- **Accessible**: Keyboard navigation and screen reader support

### Game Mechanics
- **Random Country Selection**: Countries are randomly selected for each question
- **Visual Feedback**: Immediate green/red highlighting for correct/incorrect answers
- **Score Tracking**: Real-time score and accuracy percentage display
- **Progress Tracking**: Visual progress bar showing completion status

### Region-Based Learning
- **North America**: USA, Canada, Mexico, and more
- **South America**: Brazil, Argentina, Chile, and others
- **Europe**: France, Germany, UK, Italy, Spain, and more
- **Asia**: China, India, Japan, Russia, Indonesia, and others
- **Africa**: Nigeria, Egypt, South Africa, Kenya, and more
- **Oceania**: Australia, New Zealand, Papua New Guinea, Fiji
- **Entire World**: All countries combined for advanced players

### Responsive Design
- **Mobile-First**: Optimized for smartphones and tablets
- **Desktop Enhanced**: Full features on larger screens
- **Cross-Browser**: Compatible with modern browsers
- **High Contrast Support**: Accessibility-focused design

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd geo-quiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to start playing!

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 How to Play

1. **Select a Region**: Choose from the dropdown menu (North America, Europe, Asia, etc.)
2. **Start Quiz**: Click the "Start Quiz" button
3. **Find Countries**: Read the country name at the top and click on it on the map
4. **Get Feedback**: Correct answers turn green, incorrect ones turn red
5. **Track Progress**: Watch your score and completion percentage
6. **Complete the Quiz**: Finish all countries in the selected region

## 🏗️ Project Structure

```
src/
├── components/
│   ├── GeographyQuiz.jsx     # Main game component
│   └── WorldMap.jsx          # Interactive map component
├── data/
│   └── countriesData.js      # Geographic data and region definitions
├── App.jsx                   # Root application component
├── App.css                   # Main application styles
├── index.css                 # Global styles and Leaflet customizations
└── main.jsx                  # Application entry point
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 19**: Modern React with hooks and functional components
- **Vite**: Fast build tool for development and production

### Mapping & Geography
- **Leaflet**: Open-source mapping library
- **React-Leaflet**: React components for Leaflet integration
- **Natural Earth Data**: Public domain geographic boundaries
- **GeoJSON**: Standard for encoding geographic data

### UI & Interaction
- **Lucide React**: Modern icon library
- **CSS3**: Custom responsive styling
- **CSS Grid & Flexbox**: Modern layout techniques

### Development Tools
- **ESLint**: Code linting and formatting
- **Vite HMR**: Hot module replacement for fast development

## 🌐 Data Sources

This application uses **Natural Earth** data, which is:
- **Public Domain**: Free to use without attribution requirements
- **Accurate**: Carefully curated geographic boundaries
- **Updated**: Regularly maintained with current political boundaries
- **Optimized**: Pre-processed for web applications

### Geographic Accuracy
- Country boundaries based on de facto control
- Simplified geometries for fast web rendering
- Standard ISO country codes included
- Regional classifications following UN standards

## 📱 Responsive Design Features

### Mobile Optimization
- Touch-friendly interface with larger touch targets
- Optimized map controls for mobile screens
- Responsive typography and spacing
- Swipe-friendly navigation

### Desktop Enhancement
- Keyboard navigation support
- Hover effects and tooltips
- Larger map area for detailed exploration
- Advanced controls and shortcuts

### Accessibility
- ARIA labels for screen readers
- High contrast mode support
- Keyboard-only navigation
- Reduced motion support for sensitive users

## 🔧 Configuration

### Adding New Countries
Edit `src/data/countriesData.js` to add new countries:

```javascript
{
  "type": "Feature",
  "properties": {
    "NAME": "Country Name",
    "ISO_A3": "ISO3",
    "CONTINENT": "Continent",
    // ... other properties
  },
  "geometry": {
    // GeoJSON geometry
  }
}
```

### Customizing Regions
Modify the `regions` object in `countriesData.js`:

```javascript
"Custom Region": {
  name: "Custom Region Name",
  countries: ["Country1", "Country2"],
  bounds: [[minLng, minLat], [maxLng, maxLat]]
}
```

## 🎨 Styling & Theming

The application uses CSS custom properties for easy theming:

```css
:root {
  --primary-color: #3498db;
  --success-color: #27ae60;
  --error-color: #e74c3c;
  --text-color: #2c3e50;
}
```

## 🚀 Performance Optimizations

- **Lazy Loading**: Components load only when needed
- **Optimized GeoJSON**: Simplified geometries for faster rendering
- **Memoized Components**: React.memo for expensive components
- **Efficient State Management**: Minimal re-renders with proper state structure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Natural Earth**: For providing excellent public domain geographic data
- **OpenStreetMap**: For the base map tiles
- **React-Leaflet Community**: For the excellent mapping components
- **Lucide**: For the beautiful icon set

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information
3. Include your browser version and any error messages

## 🔮 Future Enhancements

- [ ] Difficulty levels (easy, medium, hard)
- [ ] Timed challenges
- [ ] Multiplayer support
- [ ] Capital cities quiz mode
- [ ] Flag recognition game
- [ ] Achievement system
- [ ] Leaderboards
- [ ] Offline mode support
- [ ] Multiple language support

---

**Made with ❤️ for geography enthusiasts worldwide**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
