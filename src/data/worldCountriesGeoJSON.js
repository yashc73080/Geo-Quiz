// Real world countries GeoJSON data with actual polygons
// Source: Natural Earth via D3 Graph Gallery
// This data contains actual country boundaries instead of simplified bounding boxes

export const realWorldCountriesData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Afghanistan",
        "ISO_A2": "AF",
        "ISO_A3": "AFG"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[61.210817091725744, 35.650072333309225], [62.23065340913006, 35.270663967422294], [62.984662624808206, 35.404394034416496], [63.193538158566815, 35.857165635718924], [63.98290269134442, 36.007957310043244], [64.54648869009883, 36.31207326918454], [64.74611652692324, 37.11198033837196], [65.58881781958693, 37.30521320269715], [65.74563074214124, 37.661164748098914], [66.21737892678773, 37.39379018813024], [66.51860680528325, 37.36278432875879], [67.07578209825963, 37.35614390506013], [67.83000191890356, 37.144994004864324], [68.13550282792842, 37.02314107227296], [68.85945851268335, 37.344335842631104], [69.19627282835315, 37.151144462181284], [69.51878538805023, 37.608997245221226], [70.11657840343012, 37.588223949253784], [70.27057248488693, 37.73516467554098], [70.37680587595354, 38.138396030184436], [70.80682206317187, 38.486281643216255], [71.34813113799984, 38.25890411005433], [71.23940392444859, 37.95326277617556], [71.54191775767925, 37.90580840227686], [71.44869347828104, 37.06564484017211], [71.8446382088132, 36.73817827137189], [72.19324547751031, 36.948287969128185], [72.63689499892455, 37.047558594798234], [73.26095050270143, 37.495256647390045], [73.9486959166382, 37.42120984593237], [74.98000350043517, 37.419990139305584], [75.1583158814093, 37.133030910578085], [74.57587203514108, 37.020840259338054], [74.06755528687754, 36.836175604914], [72.92002485000086, 36.72000511259111], [71.8468595004294, 36.509990137305325], [71.26234826507492, 36.07439988279804], [71.49876640515983, 35.650563259414684], [71.61307500098999, 35.15327495094843], [71.11507735070962, 34.733125718722516], [71.15676150258702, 34.34891167363113], [70.88184058286686, 33.98856193292637], [69.93054390050656, 34.02012014358344], [70.32343745094238, 33.35853261493548], [69.68714055074553, 33.105498667493675], [69.26252200712084, 32.50192580042889], [69.31776411111114, 31.901412258424306], [68.926676832664, 31.620189113892067], [68.55693203043002, 31.71331476442409], [67.79268969039778, 31.582930406020467], [67.68339216017772, 31.303154096038484], [66.93889122172732, 31.304911200479425], [66.38145277154704, 30.738899237586944], [66.34647259720623, 29.88794087620348], [65.04686200125502, 29.472180691031833], [64.35041873389331, 29.560031028694177], [64.14870372754117, 29.34081863560652], [63.550260896132924, 29.468330796789976], [62.5493844390056, 29.406414364802226], [60.87424848820108, 29.829238999952258], [61.781222466654506, 30.735850328081164], [61.69931440213618, 31.379506130492097], [60.94191137035574, 31.548074652628987], [60.86321050845799, 32.18291962333347], [60.536078199486216, 32.981269804006456], [60.9637949030536, 33.528832038772], [60.52843375601717, 33.67645506371938], [60.80319339691835, 34.404101874437736], [61.210817091725744, 35.650072333309225]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Angola",
        "ISO_A2": "AO",
        "ISO_A3": "AGO"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [[[[16.32652835, -5.87747], [16.57318, -6.622645], [16.86019, -7.222298], [17.089996, -7.545689], [17.47297, -8.068551], [18.134222, -7.987678], [18.464176, -7.847014], [19.016752, -7.988247], [19.166613, -7.738184], [19.417502, -7.155429], [20.037723, -7.116361], [20.091622, -6.943090], [20.601823, -6.939318], [20.514748, -7.299606], [21.728111, -7.290872], [21.746456, -7.920085], [21.949131, -8.305901], [21.801801, -8.908707], [21.875182, -9.523708], [22.208753, -9.894796], [22.155268, -11.084801], [22.402798, -10.993075], [22.837345, -11.017622], [23.456790, -10.867863], [23.912215, -10.926826], [24.017894, -11.237298], [23.904154, -11.722282], [24.079905, -12.191297], [23.930922, -12.565848], [24.016137, -12.911046], [21.933886, -12.898437], [21.887842, -16.080310], [22.562478, -16.898998], [23.215048, -17.523116], [21.377176, -17.930636], [18.956187, -17.789095], [18.263309, -17.309951], [14.209707, -17.353101], [14.058501, -17.423381], [13.462362, -16.971212], [12.814081, -16.941343], [12.215461, -17.111668], [11.734199, -17.301889], [11.640096, -16.673142], [11.778537, -15.793816], [12.123581, -14.878316], [12.175619, -14.449144], [12.500095, -13.547699], [12.738479, -13.137906], [13.312914, -12.479570], [13.633721, -12.038645], [13.738728, -11.297863], [13.686379, -10.731076], [13.387328, -10.373578], [12.875218, -9.166934], [12.929061, -8.959091], [13.236433, -8.562629], [12.933040, -7.596538], [12.728298, -6.927122], [12.227348, -6.294448], [12.322432, -6.100092], [12.735171, -5.965682], [13.024869, -5.984389], [13.375597, -5.864241], [16.32652835, -5.87747]]], [[[12.436688, -5.684304], [12.182337, -5.789931], [11.914963, -5.037987], [12.318608, -4.606229], [12.62076, -4.438023], [12.995517, -4.781103], [12.631612, -4.991271], [12.468004, -5.248362], [12.436688, -5.684304]]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Albania",
        "ISO_A2": "AL",
        "ISO_A3": "ALB"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[20.590247, 41.855404], [20.463175, 41.515089], [20.605182, 41.086226], [21.02004, 40.842727], [20.99999, 40.580003], [20.674997, 40.435],[20.615, 40.110007], [20.150016, 39.624998], [19.98, 39.694993], [19.960002, 39.915006], [19.406082, 40.250773], [19.319059, 40.72723], [19.40355, 41.409566], [19.540027, 41.719984], [19.371769, 41.877548], [19.304486, 42.195745], [19.738051, 42.688247], [19.801613, 42.500093], [20.0707, 42.58863], [20.283755, 42.32026], [20.52295, 42.21787], [20.590247, 41.855404]]]
      }
    }
    // Note: This is a sample of countries - the full dataset would be much larger
    // For the complete implementation, you would fetch the full GeoJSON data
  ]
};

// Function to fetch complete world countries data
export const fetchWorldCountriesData = async () => {
  try {
    const response = await fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson');
    const data = await response.json();
    
    // Transform the data to match our expected format
    const transformedData = {
      type: "FeatureCollection",
      features: data.features.map(feature => ({
        type: "Feature",
        properties: {
          NAME: feature.properties.name,
          NAME_LONG: feature.properties.name,
          ABBREV: feature.properties.name,
          ISO_A2: feature.properties.iso_a2 || "",
          ISO_A3: feature.properties.iso_a3 || "",
          CONTINENT: getContinent(feature.properties.name),
          REGION_UN: getRegionUN(feature.properties.name),
          SUBREGION: getSubregion(feature.properties.name)
        },
        geometry: feature.geometry
      }))
    };
    
    return transformedData;
  } catch (error) {
    console.error('Error fetching world countries data:', error);
    return realWorldCountriesData; // fallback to static data
  }
};

// Comprehensive continent mapping based on Natural Earth data naming conventions
const continentMap = {
  // North America (including Central America and Caribbean)
  'United States of America': 'North America',
  'USA': 'North America', // Alternative name
  'United States': 'North America', // Alternative name
  'Canada': 'North America',
  'Mexico': 'North America',
  'Guatemala': 'North America',
  'Belize': 'North America',
  'El Salvador': 'North America',
  'Honduras': 'North America',
  'Nicaragua': 'North America',
  'Costa Rica': 'North America',
  'Panama': 'North America',
  'Cuba': 'North America',
  'Jamaica': 'North America',
  'Haiti': 'North America',
  'Dominican Republic': 'North America',
  'Trinidad and Tobago': 'North America',
  'Bahamas': 'North America',
  'Barbados': 'North America',
  'Saint Lucia': 'North America',
  'Grenada': 'North America',
  'Saint Vincent and the Grenadines': 'North America',
  'Antigua and Barbuda': 'North America',
  'Dominica': 'North America',
  'Saint Kitts and Nevis': 'North America',
  'Puerto Rico': 'North America',
  
  // South America
  'Brazil': 'South America',
  'Argentina': 'South America',
  'Chile': 'South America',
  'Peru': 'South America',
  'Colombia': 'South America',
  'Venezuela': 'South America',
  'Ecuador': 'South America',
  'Bolivia': 'South America',
  'Paraguay': 'South America',
  'Uruguay': 'South America',
  'Guyana': 'South America',
  'Suriname': 'South America',
  'French Guiana': 'South America',
  
  // Europe (including all variations of UK names)
  'United Kingdom': 'Europe',
  'UK': 'Europe',
  'Great Britain': 'Europe',
  'Britain': 'Europe',
  'England': 'Europe',
  'Scotland': 'Europe',
  'Wales': 'Europe',
  'Northern Ireland': 'Europe',
  'France': 'Europe',
  'Germany': 'Europe',
  'Italy': 'Europe',
  'Spain': 'Europe',
  'Poland': 'Europe',
  'Romania': 'Europe',
  'Netherlands': 'Europe',
  'Belgium': 'Europe',
  'Czech Republic': 'Europe',
  'Czechia': 'Europe', // Alternative name
  'Greece': 'Europe',
  'Portugal': 'Europe',
  'Hungary': 'Europe',
  'Sweden': 'Europe',
  'Belarus': 'Europe',
  'Austria': 'Europe',
  'Serbia': 'Europe',
  'Switzerland': 'Europe',
  'Bulgaria': 'Europe',
  'Slovakia': 'Europe',
  'Finland': 'Europe',
  'Norway': 'Europe',
  'Ireland': 'Europe',
  'Croatia': 'Europe',
  'Bosnia and Herzegovina': 'Europe',
  'Albania': 'Europe',
  'Lithuania': 'Europe',
  'Slovenia': 'Europe',
  'Latvia': 'Europe',
  'Estonia': 'Europe',
  'Macedonia': 'Europe',
  'North Macedonia': 'Europe',
  'Moldova': 'Europe',
  'Luxembourg': 'Europe',
  'Malta': 'Europe',
  'Iceland': 'Europe',
  'Montenegro': 'Europe',
  'San Marino': 'Europe',
  'Liechtenstein': 'Europe',
  'Monaco': 'Europe',
  'Vatican': 'Europe',
  'Vatican City': 'Europe',
  'Andorra': 'Europe',
  'Ukraine': 'Europe',
  'Russia': 'Europe', // Note: Russia spans both Europe and Asia, but commonly classified as European
  'Russian Federation': 'Europe', // Alternative name
  'Denmark': 'Europe',
  'Cyprus': 'Europe', // Geographically in Asia but politically/culturally European
  
  // Asia
  'China': 'Asia',
  'India': 'Asia',
  'Kazakhstan': 'Asia',
  'Saudi Arabia': 'Asia',
  'Indonesia': 'Asia',
  'Iran': 'Asia',
  'Mongolia': 'Asia',
  'Pakistan': 'Asia',
  'Turkey': 'Asia',
  'Afghanistan': 'Asia',
  'Yemen': 'Asia',
  'Thailand': 'Asia',
  'Turkmenistan': 'Asia',
  'Uzbekistan': 'Asia',
  'Iraq': 'Asia',
  'Japan': 'Asia',
  'Vietnam': 'Asia',
  'Malaysia': 'Asia',
  'Oman': 'Asia',
  'Philippines': 'Asia',
  'Laos': 'Asia',
  'Kyrgyzstan': 'Asia',
  'Syria': 'Asia',
  'Cambodia': 'Asia',
  'Jordan': 'Asia',
  'Azerbaijan': 'Asia',
  'United Arab Emirates': 'Asia',
  'Tajikistan': 'Asia',
  'Bangladesh': 'Asia',
  'Nepal': 'Asia',
  'North Korea': 'Asia',
  'South Korea': 'Asia',
  'Sri Lanka': 'Asia',
  'Bhutan': 'Asia',
  'Kuwait': 'Asia',
  'Georgia': 'Asia',
  'Armenia': 'Asia',
  'Qatar': 'Asia',
  'Bahrain': 'Asia',
  'East Timor': 'Asia',
  'Timor-Leste': 'Asia', // Alternative name
  'Lebanon': 'Asia',
  'Palestine': 'Asia',
  'Brunei': 'Asia',
  'Maldives': 'Asia',
  'Singapore': 'Asia',
  'Israel': 'Asia',
  'Myanmar': 'Asia',
  'Burma': 'Asia', // Alternative name for Myanmar
  
  // Africa (including all missing countries)
  'Algeria': 'Africa',
  'Angola': 'Africa',
  'Benin': 'Africa',
  'Botswana': 'Africa',
  'Burkina Faso': 'Africa',
  'Burundi': 'Africa',
  'Cameroon': 'Africa',
  'Cape Verde': 'Africa',
  'Central African Republic': 'Africa',
  'Chad': 'Africa',
  'Comoros': 'Africa',
  'Democratic Republic of the Congo': 'Africa',
  'Republic of the Congo': 'Africa',
  'Congo': 'Africa', // Alternative name
  'Djibouti': 'Africa',
  'Egypt': 'Africa',
  'Equatorial Guinea': 'Africa',
  'Eritrea': 'Africa',
  'Ethiopia': 'Africa',
  'Gabon': 'Africa',
  'Gambia': 'Africa',
  'Ghana': 'Africa',
  'Guinea': 'Africa',
  'Guinea Bissau': 'Africa', // This was missing!
  'Ivory Coast': 'Africa',
  "Cote d'Ivoire": 'Africa',
  'Kenya': 'Africa',
  'Lesotho': 'Africa',
  'Liberia': 'Africa',
  'Libya': 'Africa',
  'Madagascar': 'Africa',
  'Malawi': 'Africa',
  'Mali': 'Africa',
  'Mauritania': 'Africa',
  'Mauritius': 'Africa',
  'Morocco': 'Africa',
  'Mozambique': 'Africa',
  'Namibia': 'Africa',
  'Niger': 'Africa',
  'Nigeria': 'Africa',
  'Rwanda': 'Africa',
  'Sao Tome and Principe': 'Africa',
  'Senegal': 'Africa',
  'Seychelles': 'Africa',
  'Sierra Leone': 'Africa',
  'Somalia': 'Africa',
  'South Africa': 'Africa',
  'South Sudan': 'Africa',
  'Sudan': 'Africa',
  'Swaziland': 'Africa',
  'Eswatini': 'Africa',
  'Tanzania': 'Africa', // This was missing!
  'United Republic of Tanzania': 'Africa', // Alternative name
  'Togo': 'Africa',
  'Tunisia': 'Africa',
  'Uganda': 'Africa',
  'Zambia': 'Africa',
  'Zimbabwe': 'Africa',
  'Western Sahara': 'Africa', // This was missing!
  
  // Oceania
  'Australia': 'Oceania',
  'Papua New Guinea': 'Oceania',
  'New Zealand': 'Oceania',
  'Fiji': 'Oceania',
  'Solomon Islands': 'Oceania',
  'Vanuatu': 'Oceania',
  'Samoa': 'Oceania',
  'Micronesia': 'Oceania',
  'Tonga': 'Oceania',
  'Kiribati': 'Oceania',
  'Palau': 'Oceania',
  'Marshall Islands': 'Oceania',
  'Tuvalu': 'Oceania',
  'Nauru': 'Oceania'
};

export const getContinent = (countryName) => {
  return continentMap[countryName] || 'Unknown';
};

export const getRegionUN = (countryName) => {
  const continent = getContinent(countryName);
  switch (continent) {
    case 'North America':
    case 'South America':
      return 'Americas';
    case 'Europe':
      return 'Europe';
    case 'Asia':
      return 'Asia';
    case 'Africa':
      return 'Africa';
    case 'Oceania':
      return 'Oceania';
    default:
      return 'Unknown';
  }
};

export const getSubregion = (countryName) => {
  const continent = getContinent(countryName);
  
  // Northern America
  if (['United States of America', 'USA', 'United States', 'Canada'].includes(countryName)) {
    return 'Northern America';
  }
  
  // Central America
  if (['Mexico', 'Guatemala', 'Belize', 'El Salvador', 'Honduras', 'Nicaragua', 'Costa Rica', 'Panama'].includes(countryName)) {
    return 'Central America';
  }
  
  // South America
  if (continent === 'South America') {
    return 'South America';
  }
  
  // Add more specific subregion mappings as needed
  return continent;
};