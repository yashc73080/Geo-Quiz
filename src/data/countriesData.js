// Import the continent mapping from worldCountriesGeoJSON
import { getContinent } from './worldCountriesGeoJSON'

// Region definitions using the continent mapping from worldCountriesGeoJSON
export const regions = {
  "North America": {
    name: "North America",
    continent: "North America",
    bounds: [[-168.0, 15.0], [-52.0, 83.0]]
  },
  "South America": {
    name: "South America", 
    continent: "South America",
    bounds: [[-81.0, -56.0], [-34.0, 13.0]]
  },
  "Europe": {
    name: "Europe",
    continent: "Europe",
    bounds: [[-10.0, 35.0], [40.0, 71.0]]
  },
  "Asia": {
    name: "Asia",
    continent: "Asia",
    bounds: [[26.0, -11.0], [180.0, 81.0]]
  },
  "Africa": {
    name: "Africa",
    continent: "Africa",
    bounds: [[-18.0, -35.0], [52.0, 37.0]]
  },
  "Oceania": {
    name: "Oceania",
    continent: "Oceania",
    bounds: [[112.0, -47.0], [180.0, -10.0]]
  },
  "World": {
    name: "Entire World",
    continent: null, // Will include all countries
    bounds: [[-180.0, -90.0], [180.0, 90.0]]
  }
};

// Helper function to get countries for a specific region
export const getCountriesForRegion = (regionName, allCountries) => {
  if (regionName === 'World') {
    return allCountries;
  }
  
  const regionData = regions[regionName];
  if (!regionData || !regionData.continent) {
    return [];
  }
  
  return allCountries.filter(feature => {
    const countryName = feature.properties.name || feature.properties.NAME;
    const continent = getContinent(countryName);
    return continent === regionData.continent;
  });
};