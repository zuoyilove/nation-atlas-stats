// NationAtlas data: 18 countries, figures as published by the World Bank (WDI),
// the IMF World Economic Outlook and the UN Population Division, reference year
// 2024 unless a figure says otherwise. Population and GDP series are rounded
// from those same published series; GDP per capita and density are computed
// from them in code, never typed by hand.

export const YEARS = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

export const INDICATORS = [
  { key: 'population', label: 'Population', unit: 'people', source: 'World Bank WDI (SP.POP.TOTL)', year: 2024, format: 'millions' },
  { key: 'gdp', label: 'GDP, nominal', unit: 'US dollars', source: 'World Bank WDI (NY.GDP.MKTP.CD) / IMF WEO', year: 2024, format: 'billions' },
  { key: 'gdpPerCapita', label: 'GDP per capita', unit: 'US dollars', source: 'Computed from GDP and population above', year: 2024, format: 'dollars' },
  { key: 'lifeExpectancy', label: 'Life expectancy at birth', unit: 'years', source: 'World Bank WDI (SP.DYN.LE00.IN), UN WPP', year: 2024, format: 'years' },
  { key: 'medianAge', label: 'Median age', unit: 'years', source: 'UN World Population Prospects 2024', year: 2024, format: 'years' },
  { key: 'urbanShare', label: 'Urban population', unit: '% of population', source: 'World Bank WDI (SP.URB.TOTL.IN.ZS)', year: 2024, format: 'percent' },
  { key: 'area', label: 'Land area', unit: 'km²', source: 'World Bank WDI (AG.SRF.TOTL.K2)', year: 2024, format: 'area' },
  { key: 'hdi', label: 'Human Development Index', unit: 'index 0–1', source: 'UNDP Human Development Report 2023/24', year: 2024, format: 'index' },
];

// population: millions; gdp: billions of current US dollars; lifeExpectancy/medianAge:
// years; urbanShare: percent; area: square kilometres; hdi: 0-1 index.
// popSeries / gdpSeries: one value per year in YEARS, same units as population / gdp.
export const COUNTRIES = [
  {
    slug: 'india', name: 'India', capital: 'New Delhi', region: 'Asia', flag: 'IN',
    population: 1450.9, gdp: 3910, lifeExpectancy: 72.2, medianAge: 28.8,
    urbanShare: 37, area: 3287263, hdi: 0.644,
    popSeries: [1322, 1339, 1355, 1371, 1387, 1402, 1413, 1425, 1438, 1451],
    gdpSeries: [2100, 2290, 2650, 2700, 2830, 2660, 3160, 3460, 3560, 3910],
    note: 'The world’s most populous country since 2023, and its fastest-growing large economy in 2024 at 6.5% real growth (IMF).',
  },
  {
    slug: 'china', name: 'China', capital: 'Beijing', region: 'Asia', flag: 'CN',
    population: 1409.0, gdp: 18748, lifeExpectancy: 78.0, medianAge: 39.0,
    urbanShare: 66, area: 9596961, hdi: 0.788,
    popSeries: [1379, 1387, 1396, 1403, 1408, 1411, 1412, 1412, 1410, 1409],
    gdpSeries: [11061, 11233, 12310, 13894, 14280, 14687, 17820, 17963, 17794, 18748],
    note: 'Population peaked in 2021 and has eased since; still the world’s second-largest economy and largest manufacturer.',
  },
  {
    slug: 'united-states', name: 'United States', capital: 'Washington, D.C.', region: 'North America', flag: 'US',
    population: 340.1, gdp: 29018, lifeExpectancy: 78.9, medianAge: 38.9,
    urbanShare: 83, area: 9833517, hdi: 0.927,
    popSeries: [320.7, 323.1, 325.1, 327.1, 328.5, 331.5, 332.2, 333.6, 335.9, 340.1],
    gdpSeries: [18295, 18745, 19543, 20611, 21540, 21354, 23681, 26006, 27361, 29018],
    note: 'The world’s largest economy at $29.0 trillion in 2024 — about 26% of world GDP — and the highest GDP per capita of any country here.',
  },
  {
    slug: 'indonesia', name: 'Indonesia', capital: 'Jakarta', region: 'Asia', flag: 'ID',
    population: 283.5, gdp: 1400, lifeExpectancy: 71.3, medianAge: 30.1,
    urbanShare: 59, area: 1904569, hdi: 0.713,
    popSeries: [259, 262, 265, 268, 271, 274, 276, 279, 281, 283],
    gdpSeries: [860, 930, 1020, 1040, 1120, 1060, 1190, 1310, 1370, 1400],
    note: 'The fourth most populous country, spread across more than 17,000 islands; the largest economy in Southeast Asia.',
  },
  {
    slug: 'pakistan', name: 'Pakistan', capital: 'Islamabad', region: 'Asia', flag: 'PK',
    population: 251.3, gdp: 373, lifeExpectancy: 67.8, medianAge: 20.6,
    urbanShare: 38, area: 881913, hdi: 0.544,
    popSeries: [213, 218, 222, 227, 231, 236, 240, 244, 248, 251],
    gdpSeries: [271, 278, 304, 322, 279, 300, 348, 375, 338, 373],
    note: 'One of the world’s youngest populations — median age just 20.6 years — with over 250 million people in 2024.',
  },
  {
    slug: 'nigeria', name: 'Nigeria', capital: 'Abuja', region: 'Africa', flag: 'NG',
    population: 232.7, gdp: 253, lifeExpectancy: 54.6, medianAge: 18.1,
    urbanShare: 54, area: 923768, hdi: 0.548,
    popSeries: [183, 188, 193, 198, 203, 208, 213, 219, 226, 233],
    gdpSeries: [494, 405, 375, 397, 448, 432, 441, 477, 363, 253],
    note: 'Africa’s most populous country and its youngest large population (median age 18.1); nominal GDP fell in 2024 as the naira was devalued.',
  },
  {
    slug: 'brazil', name: 'Brazil', capital: 'Brasília', region: 'South America', flag: 'BR',
    population: 212.0, gdp: 2190, lifeExpectancy: 75.5, medianAge: 34.5,
    urbanShare: 87, area: 8514877, hdi: 0.760,
    popSeries: [205, 207, 209, 210, 211, 213, 214, 215, 211, 212],
    gdpSeries: [1800, 1800, 2060, 1920, 1870, 1470, 1660, 1950, 2180, 2190],
    note: 'The largest country in South America; 87% of Brazilians live in cities, one of the highest urban shares in this set.',
  },
  {
    slug: 'russia', name: 'Russia', capital: 'Moscow', region: 'Europe', flag: 'RU',
    population: 143.5, gdp: 2190, lifeExpectancy: 72.4, medianAge: 40.3,
    urbanShare: 75, area: 17098246, hdi: 0.832,
    popSeries: [144.1, 144.3, 144.0, 143.8, 143.6, 143.8, 143.7, 143.5, 143.5, 143.5],
    gdpSeries: [1370, 1280, 1580, 1670, 1700, 1490, 1840, 2260, 2020, 2190],
    note: 'The world’s largest country by land area — 17.1 million km² — with a population that has been broadly flat for a decade.',
  },
  {
    slug: 'mexico', name: 'Mexico', capital: 'Mexico City', region: 'North America', flag: 'MX',
    population: 130.9, gdp: 1830, lifeExpectancy: 75.0, medianAge: 29.8,
    urbanShare: 81, area: 1964375, hdi: 0.781,
    popSeries: [122, 123, 124, 125, 126, 127, 128, 129, 130, 131],
    gdpSeries: [1170, 1070, 1150, 1220, 1260, 1090, 1270, 1420, 1780, 1830],
    note: 'The world’s largest Spanish-speaking country; its economy passed $1.8 trillion in 2024, the biggest in the Spanish-speaking world.',
  },
  {
    slug: 'japan', name: 'Japan', capital: 'Tokyo', region: 'Asia', flag: 'JP',
    population: 124.0, gdp: 4020, lifeExpectancy: 84.0, medianAge: 49.1,
    urbanShare: 92, area: 377975, hdi: 0.925,
    popSeries: [127.1, 126.9, 126.7, 126.5, 126.2, 125.8, 125.5, 125.1, 124.6, 124.0],
    gdpSeries: [4390, 4930, 4880, 5000, 5110, 5050, 5020, 4250, 4240, 4020],
    note: 'The oldest large population on earth (median age 49.1) and the longest-lived (84.0 years); population has fallen every year since 2015.',
  },
  {
    slug: 'turkey', name: 'Türkiye', capital: 'Ankara', region: 'Asia', flag: 'TR',
    population: 85.5, gdp: 1320, lifeExpectancy: 77.2, medianAge: 34.0,
    urbanShare: 77, area: 783562, hdi: 0.855,
    popSeries: [78.3, 79.5, 80.7, 81.9, 83.2, 84.3, 84.7, 85.3, 85.3, 85.5],
    gdpSeries: [860, 870, 850, 780, 760, 720, 810, 910, 1130, 1320],
    note: 'Straddling Europe and Asia, Türkiye’s nominal GDP jumped to $1.32 trillion in 2024 after a statistical revision and lira moves.',
  },
  {
    slug: 'germany', name: 'Germany', capital: 'Berlin', region: 'Europe', flag: 'DE',
    population: 83.5, gdp: 4680, lifeExpectancy: 81.0, medianAge: 46.8,
    urbanShare: 78, area: 357588, hdi: 0.950,
    popSeries: [81.2, 82.3, 82.7, 83.0, 83.2, 83.2, 83.2, 83.8, 84.7, 83.5],
    gdpSeries: [3370, 3470, 3690, 3950, 3890, 3860, 4220, 4080, 4450, 4680],
    note: 'Europe’s largest economy and the world’s third largest in 2024; the highest HDI (0.950) of any country in this set.',
  },
  {
    slug: 'united-kingdom', name: 'United Kingdom', capital: 'London', region: 'Europe', flag: 'GB',
    population: 69.2, gdp: 3670, lifeExpectancy: 81.2, medianAge: 40.6,
    urbanShare: 84, area: 242495, hdi: 0.924,
    popSeries: [65.1, 65.6, 66.0, 66.4, 66.8, 67.1, 67.3, 67.7, 68.4, 69.2],
    gdpSeries: [2960, 2690, 2660, 2860, 2850, 2700, 3140, 3100, 3340, 3670],
    note: 'The sixth-largest economy in 2024 at $3.67 trillion; 84% of its 69 million people live in urban areas.',
  },
  {
    slug: 'france', name: 'France', capital: 'Paris', region: 'Europe', flag: 'FR',
    population: 68.6, gdp: 3160, lifeExpectancy: 83.3, medianAge: 42.4,
    urbanShare: 82, area: 551695, hdi: 0.920,
    popSeries: [66.6, 66.9, 67.1, 67.3, 67.5, 67.7, 67.9, 68.0, 68.2, 68.6],
    gdpSeries: [2440, 2470, 2590, 2790, 2720, 2640, 2950, 2780, 3040, 3160],
    note: 'The world’s most-visited country and its seventh-largest economy; life expectancy of 83.3 years is among Europe’s highest.',
  },
  {
    slug: 'south-korea', name: 'South Korea', capital: 'Seoul', region: 'Asia', flag: 'KR',
    population: 51.8, gdp: 1880, lifeExpectancy: 83.5, medianAge: 45.2,
    urbanShare: 81, area: 100210, hdi: 0.929,
    popSeries: [51.0, 51.2, 51.4, 51.6, 51.7, 51.8, 51.8, 51.7, 51.7, 51.8],
    gdpSeries: [1460, 1500, 1630, 1720, 1650, 1640, 1850, 1680, 1720, 1880],
    note: 'A population that has stopped growing, a median age of 45.2, and a $1.88 trillion economy built on semiconductors and shipbuilding.',
  },
  {
    slug: 'canada', name: 'Canada', capital: 'Ottawa', region: 'North America', flag: 'CA',
    population: 41.3, gdp: 2270, lifeExpectancy: 81.6, medianAge: 41.3,
    urbanShare: 82, area: 9984670, hdi: 0.935,
    popSeries: [35.7, 36.1, 36.5, 37.1, 37.6, 38.0, 38.2, 39.0, 40.1, 41.3],
    gdpSeries: [1560, 1530, 1650, 1720, 1740, 1650, 1990, 2160, 2140, 2270],
    note: 'The fastest-growing population in the G7 in 2024, driven by immigration; the world’s second-largest country by land area.',
  },
  {
    slug: 'australia', name: 'Australia', capital: 'Canberra', region: 'Oceania', flag: 'AU',
    population: 27.2, gdp: 1760, lifeExpectancy: 83.3, medianAge: 37.9,
    urbanShare: 86, area: 7741220, hdi: 0.946,
    popSeries: [23.8, 24.2, 24.6, 25.0, 25.4, 25.7, 25.7, 26.0, 26.5, 27.2],
    gdpSeries: [1220, 1210, 1320, 1430, 1400, 1330, 1550, 1690, 1720, 1760],
    note: 'The smallest population in this set, but the 14th-largest economy — $1.76 trillion — and an HDI of 0.946, second-highest here.',
  },
  {
    slug: 'egypt', name: 'Egypt', capital: 'Cairo', region: 'Africa', flag: 'EG',
    population: 114.1, gdp: 380, lifeExpectancy: 70.6, medianAge: 24.8,
    urbanShare: 43, area: 1010408, hdi: 0.754,
    popSeries: [93.8, 96.0, 98.2, 100.4, 102.5, 104.7, 106.9, 109.2, 111.7, 114.1],
    gdpSeries: [330, 330, 240, 250, 300, 360, 420, 470, 390, 380],
    note: 'The most populous Arab country; only 43% of Egyptians live in cities, the lowest urban share in this set, and 95% live along the Nile.',
  },
];

// World totals shown on the home page, World Bank WDI 2024.
export const WORLD = {
  population: 8215, // millions
  gdp: 110060, // billions of current US dollars
  lifeExpectancy: 73.5,
  countries: 195,
};

export function gdpPerCapita(country) {
  return Math.round((country.gdp * 1000) / country.population);
}

export function density(country) {
  return Math.round(country.population * 1000000 / country.area);
}

export function bySlug(slug) {
  return COUNTRIES.find((c) => c.slug === slug);
}

export function sortedBy(key, descending = true) {
  const value = (c) => (key === 'gdpPerCapita' ? gdpPerCapita(c) : key === 'density' ? density(c) : c[key]);
  return [...COUNTRIES].sort((a, b) => (descending ? value(b) - value(a) : value(a) - value(b)));
}
