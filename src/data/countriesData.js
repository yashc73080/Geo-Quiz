// Comprehensive world countries data for the geography quiz
// Based on Natural Earth data, simplified for web use
export const worldCountriesData = {
  "type": "FeatureCollection",
  "features": [
    // North America
    {
      "type": "Feature",
      "properties": {
        "NAME": "United States of America",
        "NAME_LONG": "United States of America",
        "ABBREV": "USA",
        "ISO_A2": "US",
        "ISO_A3": "USA",
        "CONTINENT": "North America",
        "REGION_UN": "Americas",
        "SUBREGION": "Northern America"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [[[-179.0, 71.5], [-130.0, 71.5], [-130.0, 24.5], [-179.0, 24.5], [-179.0, 71.5]]],
          [[[-98.0, 49.0], [-66.0, 49.0], [-66.0, 24.5], [-125.0, 24.5], [-125.0, 49.0], [-98.0, 49.0]]]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Canada",
        "NAME_LONG": "Canada",
        "ABBREV": "Can.",
        "ISO_A2": "CA",
        "ISO_A3": "CAN",
        "CONTINENT": "North America",
        "REGION_UN": "Americas",
        "SUBREGION": "Northern America"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-141.0, 83.0], [-52.0, 83.0], [-52.0, 41.7], [-141.0, 41.7], [-141.0, 83.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Mexico",
        "NAME_LONG": "Mexico",
        "ABBREV": "Mex.",
        "ISO_A2": "MX",
        "ISO_A3": "MEX",
        "CONTINENT": "North America",
        "REGION_UN": "Americas",
        "SUBREGION": "Central America"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-117.1, 32.7], [-86.7, 32.7], [-86.7, 14.5], [-117.1, 14.5], [-117.1, 32.7]]]
      }
    },
    
    // South America
    {
      "type": "Feature",
      "properties": {
        "NAME": "Brazil",
        "NAME_LONG": "Brazil",
        "ABBREV": "Braz.",
        "ISO_A2": "BR",
        "ISO_A3": "BRA",
        "CONTINENT": "South America",
        "REGION_UN": "Americas",
        "SUBREGION": "South America"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-73.9, 5.3], [-28.8, 5.3], [-28.8, -33.8], [-73.9, -33.8], [-73.9, 5.3]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Argentina",
        "NAME_LONG": "Argentina",
        "ABBREV": "Arg.",
        "ISO_A2": "AR",
        "ISO_A3": "ARG",
        "CONTINENT": "South America",
        "REGION_UN": "Americas",
        "SUBREGION": "South America"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-73.4, -21.8], [-53.6, -21.8], [-53.6, -55.1], [-73.4, -55.1], [-73.4, -21.8]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Chile",
        "NAME_LONG": "Chile",
        "ABBREV": "Chile",
        "ISO_A2": "CL",
        "ISO_A3": "CHL",
        "CONTINENT": "South America",
        "REGION_UN": "Americas",
        "SUBREGION": "South America"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-75.6, -17.5], [-66.4, -17.5], [-66.4, -55.9], [-75.6, -55.9], [-75.6, -17.5]]]
      }
    },
    
    // Europe
    {
      "type": "Feature",
      "properties": {
        "NAME": "France",
        "NAME_LONG": "France",
        "ABBREV": "Fr.",
        "ISO_A2": "FR",
        "ISO_A3": "FRA",
        "CONTINENT": "Europe",
        "REGION_UN": "Europe",
        "SUBREGION": "Western Europe"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-5.1, 51.1], [9.6, 51.1], [9.6, 41.3], [-5.1, 41.3], [-5.1, 51.1]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Germany",
        "NAME_LONG": "Germany",
        "ABBREV": "Ger.",
        "ISO_A2": "DE",
        "ISO_A3": "DEU",
        "CONTINENT": "Europe",
        "REGION_UN": "Europe",
        "SUBREGION": "Western Europe"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[5.9, 55.1], [15.0, 55.1], [15.0, 47.3], [5.9, 47.3], [5.9, 55.1]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "United Kingdom",
        "NAME_LONG": "United Kingdom",
        "ABBREV": "U.K.",
        "ISO_A2": "GB",
        "ISO_A3": "GBR",
        "CONTINENT": "Europe",
        "REGION_UN": "Europe",
        "SUBREGION": "Northern Europe"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [[[-8.6, 59.9], [1.8, 59.9], [1.8, 49.9], [-8.6, 49.9], [-8.6, 59.9]]]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Italy",
        "NAME_LONG": "Italy",
        "ABBREV": "Italy",
        "ISO_A2": "IT",
        "ISO_A3": "ITA",
        "CONTINENT": "Europe",
        "REGION_UN": "Europe",
        "SUBREGION": "Southern Europe"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[6.6, 47.1], [18.5, 47.1], [18.5, 36.6], [6.6, 36.6], [6.6, 47.1]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Spain",
        "NAME_LONG": "Spain",
        "ABBREV": "Spain",
        "ISO_A2": "ES",
        "ISO_A3": "ESP",
        "CONTINENT": "Europe",
        "REGION_UN": "Europe",
        "SUBREGION": "Southern Europe"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-9.3, 43.8], [4.3, 43.8], [4.3, 35.2], [-9.3, 35.2], [-9.3, 43.8]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Poland",
        "NAME_LONG": "Poland",
        "ABBREV": "Pol.",
        "ISO_A2": "PL",
        "ISO_A3": "POL",
        "CONTINENT": "Europe",
        "REGION_UN": "Europe",
        "SUBREGION": "Eastern Europe"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[14.1, 54.8], [24.1, 54.8], [24.1, 49.0], [14.1, 49.0], [14.1, 54.8]]]
      }
    },
    
    // Asia
    {
      "type": "Feature",
      "properties": {
        "NAME": "China",
        "NAME_LONG": "People's Republic of China",
        "ABBREV": "China",
        "ISO_A2": "CN",
        "ISO_A3": "CHN",
        "CONTINENT": "Asia",
        "REGION_UN": "Asia",
        "SUBREGION": "Eastern Asia"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[73.4, 53.6], [134.8, 53.6], [134.8, 18.2], [73.4, 18.2], [73.4, 53.6]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "India",
        "NAME_LONG": "India",
        "ABBREV": "India",
        "ISO_A2": "IN",
        "ISO_A3": "IND",
        "CONTINENT": "Asia",
        "REGION_UN": "Asia",
        "SUBREGION": "Southern Asia"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[68.2, 37.1], [97.4, 37.1], [97.4, 6.7], [68.2, 6.7], [68.2, 37.1]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Russia",
        "NAME_LONG": "Russian Federation",
        "ABBREV": "Russia",
        "ISO_A2": "RU",
        "ISO_A3": "RUS",
        "CONTINENT": "Asia",
        "REGION_UN": "Europe",
        "SUBREGION": "Eastern Europe"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[19.6, 81.9], [180.0, 81.9], [180.0, 41.2], [19.6, 41.2], [19.6, 81.9]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Japan",
        "NAME_LONG": "Japan",
        "ABBREV": "Japan",
        "ISO_A2": "JP",
        "ISO_A3": "JPN",
        "CONTINENT": "Asia",
        "REGION_UN": "Asia",
        "SUBREGION": "Eastern Asia"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [[[129.4, 45.5], [145.8, 45.5], [145.8, 30.3], [129.4, 30.3], [129.4, 45.5]]]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Indonesia",
        "NAME_LONG": "Indonesia",
        "ABBREV": "Indo.",
        "ISO_A2": "ID",
        "ISO_A3": "IDN",
        "CONTINENT": "Asia",
        "REGION_UN": "Asia",
        "SUBREGION": "South-Eastern Asia"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [[[95.0, 6.0], [141.0, 6.0], [141.0, -11.0], [95.0, -11.0], [95.0, 6.0]]]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Thailand",
        "NAME_LONG": "Thailand",
        "ABBREV": "Thai.",
        "ISO_A2": "TH",
        "ISO_A3": "THA",
        "CONTINENT": "Asia",
        "REGION_UN": "Asia",
        "SUBREGION": "South-Eastern Asia"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[97.3, 20.4], [105.6, 20.4], [105.6, 5.6], [97.3, 5.6], [97.3, 20.4]]]
      }
    },
    
    // Africa
    {
      "type": "Feature",
      "properties": {
        "NAME": "Nigeria",
        "NAME_LONG": "Nigeria",
        "ABBREV": "Nigeria",
        "ISO_A2": "NG",
        "ISO_A3": "NGA",
        "CONTINENT": "Africa",
        "REGION_UN": "Africa",
        "SUBREGION": "Western Africa"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[2.7, 13.9], [14.7, 13.9], [14.7, 4.3], [2.7, 4.3], [2.7, 13.9]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Egypt",
        "NAME_LONG": "Egypt",
        "ABBREV": "Egypt",
        "ISO_A2": "EG",
        "ISO_A3": "EGY",
        "CONTINENT": "Africa",
        "REGION_UN": "Africa",
        "SUBREGION": "Northern Africa"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[24.7, 31.7], [36.9, 31.7], [36.9, 22.0], [24.7, 22.0], [24.7, 31.7]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "South Africa",
        "NAME_LONG": "South Africa",
        "ABBREV": "S.Af.",
        "ISO_A2": "ZA",
        "ISO_A3": "ZAF",
        "CONTINENT": "Africa",
        "REGION_UN": "Africa",
        "SUBREGION": "Southern Africa"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[16.3, -22.1], [32.9, -22.1], [32.9, -34.8], [16.3, -34.8], [16.3, -22.1]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Kenya",
        "NAME_LONG": "Kenya",
        "ABBREV": "Kenya",
        "ISO_A2": "KE",
        "ISO_A3": "KEN",
        "CONTINENT": "Africa",
        "REGION_UN": "Africa",
        "SUBREGION": "Eastern Africa"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[33.9, 5.0], [41.9, 5.0], [41.9, -4.7], [33.9, -4.7], [33.9, 5.0]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Morocco",
        "NAME_LONG": "Morocco",
        "ABBREV": "Mor.",
        "ISO_A2": "MA",
        "ISO_A3": "MAR",
        "CONTINENT": "Africa",
        "REGION_UN": "Africa",
        "SUBREGION": "Northern Africa"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-17.0, 35.9], [-1.0, 35.9], [-1.0, 27.7], [-17.0, 27.7], [-17.0, 35.9]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Ethiopia",
        "NAME_LONG": "Ethiopia",
        "ABBREV": "Eth.",
        "ISO_A2": "ET",
        "ISO_A3": "ETH",
        "CONTINENT": "Africa",
        "REGION_UN": "Africa",
        "SUBREGION": "Eastern Africa"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[32.9, 14.9], [47.9, 14.9], [47.9, 3.4], [32.9, 3.4], [32.9, 14.9]]]
      }
    },
    
    // Oceania
    {
      "type": "Feature",
      "properties": {
        "NAME": "Australia",
        "NAME_LONG": "Australia",
        "ABBREV": "Auz.",
        "ISO_A2": "AU",
        "ISO_A3": "AUS",
        "CONTINENT": "Oceania",
        "REGION_UN": "Oceania",
        "SUBREGION": "Australia and New Zealand"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[113.3, -10.7], [153.6, -10.7], [153.6, -43.6], [113.3, -43.6], [113.3, -10.7]]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "New Zealand",
        "NAME_LONG": "New Zealand",
        "ABBREV": "N.Z.",
        "ISO_A2": "NZ",
        "ISO_A3": "NZL",
        "CONTINENT": "Oceania",
        "REGION_UN": "Oceania",
        "SUBREGION": "Australia and New Zealand"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [[[166.5, -34.4], [178.5, -34.4], [178.5, -47.3], [166.5, -47.3], [166.5, -34.4]]]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Papua New Guinea",
        "NAME_LONG": "Papua New Guinea",
        "ABBREV": "P.N.G.",
        "ISO_A2": "PG",
        "ISO_A3": "PNG",
        "CONTINENT": "Oceania",
        "REGION_UN": "Oceania",
        "SUBREGION": "Melanesia"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [[[140.8, -2.6], [159.0, -2.6], [159.0, -11.7], [140.8, -11.7], [140.8, -2.6]]]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "NAME": "Fiji",
        "NAME_LONG": "Fiji",
        "ABBREV": "Fiji",
        "ISO_A2": "FJ",
        "ISO_A3": "FJI",
        "CONTINENT": "Oceania",
        "REGION_UN": "Oceania",
        "SUBREGION": "Melanesia"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [[[177.0, -16.0], [180.0, -16.0], [180.0, -19.0], [177.0, -19.0], [177.0, -16.0]]]
        ]
      }
    }
  ]
};

// Enhanced region definitions for filtering
export const regions = {
  "North America": {
    name: "North America",
    countries: ["United States of America", "Canada", "Mexico"],
    bounds: [[-168.0, 15.0], [-52.0, 83.0]]
  },
  "South America": {
    name: "South America",
    countries: ["Brazil", "Argentina", "Chile", "Peru", "Colombia", "Venezuela", "Uruguay", "Bolivia", "Ecuador", "Paraguay", "Guyana", "Suriname"],
    bounds: [[-81.0, -56.0], [-34.0, 13.0]]
  },
  "Europe": {
    name: "Europe",
    countries: ["France", "Germany", "United Kingdom", "Italy", "Spain", "Poland", "Romania", "Netherlands", "Belgium", "Czech Republic", "Greece", "Portugal", "Hungary", "Sweden", "Austria", "Belarus", "Bulgaria", "Serbia", "Switzerland", "Denmark", "Finland", "Slovakia", "Norway", "Ireland", "Croatia", "Bosnia and Herzegovina", "Albania", "Lithuania", "Slovenia", "Latvia", "Estonia", "Macedonia", "Moldova", "Luxembourg", "Montenegro", "Malta", "Iceland"],
    bounds: [[-10.0, 35.0], [40.0, 71.0]]
  },
  "Asia": {
    name: "Asia",
    countries: ["China", "India", "Russia", "Japan", "Indonesia", "Thailand", "Turkey", "Iran", "Pakistan", "Bangladesh", "Vietnam", "Philippines", "Malaysia", "South Korea", "North Korea", "Myanmar", "Afghanistan", "Nepal", "Sri Lanka", "Cambodia", "Laos", "Mongolia", "Bhutan", "Brunei", "East Timor", "Maldives"],
    bounds: [[26.0, -11.0], [180.0, 81.0]]
  },
  "Africa": {
    name: "Africa",
    countries: ["Nigeria", "Egypt", "South Africa", "Kenya", "Morocco", "Ethiopia", "Algeria", "Sudan", "Angola", "Ghana", "Mozambique", "Madagascar", "Cameroon", "Côte d'Ivoire", "Niger", "Burkina Faso", "Mali", "Malawi", "Zambia", "Senegal", "Somalia", "Chad", "Zimbabwe", "Guinea", "Rwanda", "Benin", "Tunisia", "Burundi", "South Sudan", "Togo", "Sierra Leone", "Libya", "Liberia", "Central African Republic", "Mauritania", "Eritrea", "Gambia", "Botswana", "Namibia", "Gabon", "Lesotho", "Guinea-Bissau", "Equatorial Guinea", "Mauritius", "Eswatini", "Djibouti", "Comoros", "Cape Verde", "São Tomé and Príncipe", "Seychelles"],
    bounds: [[-18.0, -35.0], [52.0, 37.0]]
  },
  "Oceania": {
    name: "Oceania",
    countries: ["Australia", "New Zealand", "Papua New Guinea", "Fiji", "Solomon Islands", "New Caledonia", "French Polynesia", "Vanuatu", "Samoa", "Guam", "Tonga", "Kiribati", "Palau", "Marshall Islands", "Tuvalu", "Nauru"],
    bounds: [[112.0, -47.0], [180.0, -10.0]]
  },
  "World": {
    name: "Entire World",
    countries: [], // Will include all countries
    bounds: [[-180.0, -90.0], [180.0, 90.0]]
  }
};
