// NationAtlas views: hash router and one renderer per page. Every page is built
// from data.js at render time; every link is a real route and every control works.

import { COUNTRIES, INDICATORS, WORLD, YEARS, bySlug, sortedBy, gdpPerCapita, density } from './data.js';
import { drawBarChart, drawLineChart, formatMillions, formatBillions, formatDollars, TEAL, AMBER, BLUE, ROSE } from './charts.js';

const app = document.getElementById('app');

function esc(text) {
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function countryLink(c) {
  return `<a class="country-chip" href="#/country/${c.slug}"><span class="flag">${c.flag}</span> ${esc(c.name)}</a>`;
}

function statCard(value, label, sub) {
  return `<div class="stat"><div class="stat-value">${value}</div><div class="stat-label">${label}</div><div class="stat-sub">${sub}</div></div>`;
}

function sourceLine(indicatorKey) {
  const ind = INDICATORS.find((i) => i.key === indicatorKey);
  return ind ? `${ind.source}, ${ind.year}` : '';
}

// ---------- Home ----------

function renderHome() {
  const topPop = sortedBy('population').slice(0, 10);
  const topGdp = sortedBy('gdp').slice(0, 10);
  const regions = ['Asia', 'Europe', 'North America', 'South America', 'Africa', 'Oceania'];
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">World Bank · IMF · United Nations — reference year 2024</p>
      <h1>Every country, measured.</h1>
      <p class="lede">Population, economy, health and development for 18 countries — real figures,
      each with its source and year, on one fast site. Pick a country, rank them all, or put two side by side.</p>
      <form class="search" id="home-search" action="#/rankings" method="get">
        <input id="home-q" type="search" placeholder="Search a country — try “Japan” or “Nigeria”…" aria-label="Search countries" autocomplete="off">
        <button type="submit">Search</button>
      </form>
      <div class="search-results" id="home-results"></div>
    </section>

    <section class="stats-row">
      ${statCard(formatMillions(WORLD.population), 'World population', '8.22 billion people, 2024')}
      ${statCard(formatBillions(WORLD.gdp), 'World GDP', 'current US$, World Bank 2024')}
      ${statCard(WORLD.lifeExpectancy.toFixed(1) + ' yrs', 'World life expectancy', 'at birth, World Bank 2024')}
      ${statCard(String(WORLD.countries), 'Countries', 'in the UN; 18 profiled here')}
    </section>

    <section class="panel">
      <div class="panel-head">
        <h2>Most populous countries, 2024</h2>
        <div class="toggle" role="group" aria-label="Chart measure">
          <button id="chart-pop" class="toggle-btn active" type="button">Population</button>
          <button id="chart-gdp" class="toggle-btn" type="button">GDP</button>
        </div>
      </div>
      <canvas id="home-chart" aria-label="Bar chart of the ten largest countries by the selected measure"></canvas>
      <p class="caption">Source: World Bank WDI, 2024. India passed China as the world’s most populous country in 2023.</p>
    </section>

    <section class="grid-2">
      <div class="panel">
        <h2>Largest economies, 2024</h2>
        <table class="rank-table">
          <thead><tr><th>#</th><th>Country</th><th class="num">GDP</th><th class="num">Per capita</th></tr></thead>
          <tbody>
            ${topGdp.map((c, i) => `<tr><td>${i + 1}</td><td>${countryLink(c)}</td><td class="num">${formatBillions(c.gdp)}</td><td class="num">${formatDollars(gdpPerCapita(c))}</td></tr>`).join('')}
          </tbody>
        </table>
        <p class="caption">Nominal GDP, current US$. Source: World Bank WDI / IMF WEO, 2024.</p>
      </div>
      <div class="panel">
        <h2>Longest lives, 2024</h2>
        <table class="rank-table">
          <thead><tr><th>#</th><th>Country</th><th class="num">Life expectancy</th><th class="num">Median age</th></tr></thead>
          <tbody>
            ${sortedBy('lifeExpectancy').slice(0, 10).map((c, i) => `<tr><td>${i + 1}</td><td>${countryLink(c)}</td><td class="num">${c.lifeExpectancy.toFixed(1)} yrs</td><td class="num">${c.medianAge.toFixed(1)}</td></tr>`).join('')}
          </tbody>
        </table>
        <p class="caption">Life expectancy at birth. Source: World Bank WDI / UN WPP, 2024.</p>
      </div>
    </section>

    <section class="panel">
      <h2>Browse by region</h2>
      ${regions.map((r) => `<h3 class="region-title">${r}</h3><div class="chips">${COUNTRIES.filter((c) => c.region === r).map(countryLink).join('')}</div>`).join('')}
    </section>

    <section class="panel">
      <h2>About the figures</h2>
      <p>Every figure on this site names its source and year on the page where it appears.
      Population and GDP come from the World Bank’s World Development Indicators (2024);
      GDP rankings cross-check against the IMF World Economic Outlook; ages come from the
      UN World Population Prospects 2024; development from the UNDP Human Development Report.
      GDP per capita and population density are computed from the published figures.
      <a href="#/about">Read the full methodology →</a></p>
    </section>`;

  const canvas = document.getElementById('home-chart');
  function draw(kind) {
    const list = kind === 'gdp' ? topGdp : topPop;
    drawBarChart(canvas, list.map((c) => ({
      label: c.name,
      value: kind === 'gdp' ? c.gdp : c.population,
      display: kind === 'gdp' ? formatBillions(c.gdp) : formatMillions(c.population),
      color: kind === 'gdp' ? BLUE : TEAL,
    })), { height: 330, caption: kind === 'gdp' ? 'Nominal GDP, current US$, 2024.' : 'Total population, mid-year 2024.' });
  }
  draw('population');
  document.getElementById('chart-pop').addEventListener('click', (e) => {
    document.getElementById('chart-gdp').classList.remove('active');
    e.currentTarget.classList.add('active');
    draw('population');
  });
  document.getElementById('chart-gdp').addEventListener('click', (e) => {
    document.getElementById('chart-pop').classList.remove('active');
    e.currentTarget.classList.add('active');
    draw('gdp');
  });

  const q = document.getElementById('home-q');
  const results = document.getElementById('home-results');
  function runSearch() {
    const term = q.value.trim().toLowerCase();
    if (term.length < 2) { results.innerHTML = ''; return; }
    const hits = COUNTRIES.filter((c) => c.name.toLowerCase().includes(term) || c.capital.toLowerCase().includes(term));
    results.innerHTML = hits.length
      ? hits.map(countryLink).join('')
      : `<p class="muted">No country in this set matches “${esc(q.value.trim())}”. Try the <a href="#/rankings">rankings table</a>.</p>`;
  }
  q.addEventListener('input', runSearch);
  document.getElementById('home-search').addEventListener('submit', (e) => {
    e.preventDefault();
    const term = q.value.trim().toLowerCase();
    const hit = COUNTRIES.find((c) => c.name.toLowerCase().includes(term));
    if (hit) location.hash = '#/country/' + hit.slug;
    else location.hash = '#/rankings';
  });
}

// ---------- Country profile ----------

function renderCountry(slug) {
  const c = bySlug(slug);
  if (!c) {
    app.innerHTML = `<section class="panel"><h1>Country not found</h1><p>We profile 18 countries. <a href="#/rankings">See them all in the rankings table →</a></p></section>`;
    return;
  }
  const popChange = (((c.popSeries[9] - c.popSeries[0]) / c.popSeries[0]) * 100).toFixed(1);
  const gdpChange = (((c.gdpSeries[9] - c.gdpSeries[0]) / c.gdpSeries[0]) * 100).toFixed(1);
  const peers = COUNTRIES.filter((x) => x.region === c.region && x.slug !== c.slug);
  app.innerHTML = `
    <nav class="crumbs"><a href="#/">Home</a> / ${esc(c.region)} / <strong>${esc(c.name)}</strong></nav>
    <section class="hero country-hero">
      <p class="eyebrow">${esc(c.region)} · Capital ${esc(c.capital)}</p>
      <h1><span class="flag big">${c.flag}</span> ${esc(c.name)}</h1>
      <p class="lede">${esc(c.note)}</p>
    </section>

    <section class="stats-row">
      ${statCard(formatMillions(c.population), 'Population', sourceLine('population'))}
      ${statCard(formatBillions(c.gdp), 'GDP, nominal', sourceLine('gdp'))}
      ${statCard(formatDollars(gdpPerCapita(c)), 'GDP per capita', 'computed from GDP ÷ population')}
      ${statCard(c.lifeExpectancy.toFixed(1) + ' yrs', 'Life expectancy', sourceLine('lifeExpectancy'))}
      ${statCard(c.medianAge.toFixed(1) + ' yrs', 'Median age', sourceLine('medianAge'))}
      ${statCard(c.urbanShare + '%', 'Urban population', sourceLine('urbanShare'))}
    </section>

    <section class="grid-2">
      <div class="panel">
        <h2>Population, 2015–2024</h2>
        <canvas id="pop-chart" aria-label="Line chart of population 2015 to 2024"></canvas>
        <p class="caption">Population ${popChange >= 0 ? 'grew' : 'fell'} ${Math.abs(popChange)}% over the decade. Source: ${sourceLine('population')}.</p>
      </div>
      <div class="panel">
        <h2>GDP, 2015–2024</h2>
        <canvas id="gdp-chart" aria-label="Line chart of nominal GDP 2015 to 2024"></canvas>
        <p class="caption">Nominal GDP ${gdpChange >= 0 ? 'grew' : 'fell'} ${Math.abs(gdpChange)}% over the decade. Source: ${sourceLine('gdp')}.</p>
      </div>
    </section>

    <section class="panel">
      <h2>Key figures — ${esc(c.name)}</h2>
      <table class="fact-table">
        <thead><tr><th>Indicator</th><th class="num">Value</th><th>Source</th><th>Year</th></tr></thead>
        <tbody>
          <tr><td>Population</td><td class="num">${(c.population * 1000000).toLocaleString('en-US')}</td><td>${sourceLine('population')}</td><td>2024</td></tr>
          <tr><td>GDP, nominal</td><td class="num">${formatBillions(c.gdp)}</td><td>${sourceLine('gdp')}</td><td>2024</td></tr>
          <tr><td>GDP per capita</td><td class="num">${formatDollars(gdpPerCapita(c))}</td><td>Computed from the two rows above</td><td>2024</td></tr>
          <tr><td>Life expectancy at birth</td><td class="num">${c.lifeExpectancy.toFixed(1)} years</td><td>${sourceLine('lifeExpectancy')}</td><td>2024</td></tr>
          <tr><td>Median age</td><td class="num">${c.medianAge.toFixed(1)} years</td><td>${sourceLine('medianAge')}</td><td>2024</td></tr>
          <tr><td>Urban population</td><td class="num">${c.urbanShare}%</td><td>${sourceLine('urbanShare')}</td><td>2024</td></tr>
          <tr><td>Land area</td><td class="num">${c.area.toLocaleString('en-US')} km²</td><td>${sourceLine('area')}</td><td>2024</td></tr>
          <tr><td>Population density</td><td class="num">${density(c).toLocaleString('en-US')} / km²</td><td>Computed from population ÷ land area</td><td>2024</td></tr>
          <tr><td>Human Development Index</td><td class="num">${c.hdi.toFixed(3)}</td><td>${sourceLine('hdi')}</td><td>2024</td></tr>
        </tbody>
      </table>
    </section>

    <section class="panel">
      <h2>Also in ${esc(c.region)}</h2>
      <div class="chips">${peers.map(countryLink).join('')}</div>
      <p><a href="#/compare?a=${c.slug}">Compare ${esc(c.name)} with another country →</a></p>
    </section>`;

  drawLineChart(document.getElementById('pop-chart'), YEARS,
    [{ label: 'Population (M)', values: c.popSeries, color: TEAL }],
    { height: 280, formatTick: (v) => formatMillions(v) });
  drawLineChart(document.getElementById('gdp-chart'), YEARS,
    [{ label: 'GDP ($B)', values: c.gdpSeries, color: BLUE }],
    { height: 280, formatTick: (v) => formatBillions(v) });
}

// ---------- Compare ----------

function renderCompare(params) {
  const a = bySlug(params.get('a')) || bySlug('united-states');
  const b = bySlug(params.get('b')) || bySlug('china');
  const thirdSlug = params.get('c');
  const third = thirdSlug ? bySlug(thirdSlug) : null;
  const picked = third ? [a, b, third] : [a, b];
  const rows = [
    ['Population', (c) => formatMillions(c.population), 'World Bank WDI, 2024'],
    ['GDP, nominal', (c) => formatBillions(c.gdp), 'World Bank WDI / IMF, 2024'],
    ['GDP per capita', (c) => formatDollars(gdpPerCapita(c)), 'Computed, 2024'],
    ['Life expectancy', (c) => c.lifeExpectancy.toFixed(1) + ' yrs', 'World Bank WDI, 2024'],
    ['Median age', (c) => c.medianAge.toFixed(1) + ' yrs', 'UN WPP, 2024'],
    ['Urban population', (c) => c.urbanShare + '%', 'World Bank WDI, 2024'],
    ['Land area', (c) => c.area.toLocaleString('en-US') + ' km²', 'World Bank WDI, 2024'],
    ['Population density', (c) => density(c).toLocaleString('en-US') + ' / km²', 'Computed, 2024'],
    ['Human Development Index', (c) => c.hdi.toFixed(3), 'UNDP, 2023/24'],
  ];
  const options = (selected) => COUNTRIES.map((c) =>
    `<option value="${c.slug}"${c.slug === selected.slug ? ' selected' : ''}>${esc(c.name)}</option>`).join('');
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">Side by side · 2024 figures</p>
      <h1>Compare countries</h1>
      <p class="lede">Pick two or three countries and see the same eight indicators for each, on the same scale.</p>
    </section>
    <section class="panel compare-pickers">
      <label>Country A <select id="pick-a">${options(a)}</select></label>
      <label>Country B <select id="pick-b">${options(b)}</select></label>
      <label>Country C <select id="pick-c"><option value="">— none —</option>${COUNTRIES.map((c) => `<option value="${c.slug}"${third && c.slug === third.slug ? ' selected' : ''}>${esc(c.name)}</option>`).join('')}</select></label>
      <button id="compare-go" type="button">Compare</button>
    </section>
    <section class="panel">
      <table class="fact-table compare-table">
        <thead><tr><th>Indicator</th>${picked.map((c) => `<th class="num"><a href="#/country/${c.slug}">${esc(c.name)}</a></th>`).join('')}<th>Source</th></tr></thead>
        <tbody>
          ${rows.map(([label, fn, src]) => `<tr><td>${label}</td>${picked.map((c) => `<td class="num">${fn(c)}</td>`).join('')}<td>${src}</td></tr>`).join('')}
        </tbody>
      </table>
    </section>
    <section class="panel">
      <h2>Population vs GDP</h2>
      <canvas id="compare-chart" aria-label="Bar chart comparing the selected countries"></canvas>
      <p class="caption">Bars show population in millions (teal) against nominal GDP in billions of dollars (blue) — different units, shown together for shape, not for direct comparison. Exact values are in the table above.</p>
    </section>`;

  const canvas = document.getElementById('compare-chart');
  const bars = [];
  picked.forEach((c) => {
    bars.push({ label: c.name + ' · pop.', value: c.population, display: formatMillions(c.population), color: TEAL });
    bars.push({ label: c.name + ' · GDP', value: c.gdp, display: formatBillions(c.gdp), color: BLUE });
  });
  drawBarChart(canvas, bars, { height: 300, labelWidth: 150 });
  document.getElementById('compare-go').addEventListener('click', () => {
    const na = document.getElementById('pick-a').value;
    const nb = document.getElementById('pick-b').value;
    const nc = document.getElementById('pick-c').value;
    location.hash = '#/compare?a=' + na + '&b=' + nb + (nc ? '&c=' + nc : '');
  });
}

// ---------- Rankings ----------

function renderRankings(params) {
  const key = params.get('sort') || 'population';
  const dir = params.get('dir') === 'asc' ? 'asc' : 'desc';
  const list = sortedBy(key, dir === 'desc');
  const ind = INDICATORS.find((i) => i.key === key) || INDICATORS[0];
  const valueOf = (c) => (key === 'gdpPerCapita' ? gdpPerCapita(c) : key === 'density' ? density(c) : c[key]);
  const displayOf = (c) => {
    if (key === 'population') return formatMillions(c.population);
    if (key === 'gdp') return formatBillions(c.gdp);
    if (key === 'gdpPerCapita') return formatDollars(gdpPerCapita(c));
    if (key === 'lifeExpectancy' || key === 'medianAge') return valueOf(c).toFixed(1) + ' yrs';
    if (key === 'urbanShare') return c.urbanShare + '%';
    if (key === 'area') return c.area.toLocaleString('en-US') + ' km²';
    if (key === 'density') return density(c).toLocaleString('en-US') + ' / km²';
    if (key === 'hdi') return c.hdi.toFixed(3);
    return String(valueOf(c));
  };
  const headCell = (k, label) => {
    const active = k === key;
    const nextDir = active && dir === 'desc' ? 'asc' : 'desc';
    const arrow = active ? (dir === 'desc' ? ' ▼' : ' ▲') : '';
    return `<th class="num"><a href="#/rankings?sort=${k}&dir=${nextDir}">${label}${arrow}</a></th>`;
  };
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">All 18 profiled countries · click a column to sort</p>
      <h1>Rankings</h1>
      <p class="lede">One table, every indicator. Now sorted by <strong>${esc(ind.label)}</strong>
      (${dir === 'desc' ? 'highest first' : 'lowest first'}). Source: ${esc(ind.source)}, ${ind.year}.</p>
    </section>
    <section class="panel">
      <div class="sort-bar">
        <label>Sort by
          <select id="rank-sort">
            ${INDICATORS.map((i) => `<option value="${i.key}"${i.key === key ? ' selected' : ''}>${i.label}</option>`).join('')}
            <option value="density"${key === 'density' ? ' selected' : ''}>Population density</option>
          </select>
        </label>
        <button id="rank-flip" type="button">${dir === 'desc' ? 'Highest first ↓' : 'Lowest first ↑'}</button>
      </div>
      <div class="table-scroll">
      <table class="rank-table full">
        <thead><tr><th>#</th><th>Country</th><th>Region</th>
          ${headCell('population', 'Population')}
          ${headCell('gdp', 'GDP')}
          ${headCell('gdpPerCapita', 'GDP / capita')}
          ${headCell('lifeExpectancy', 'Life exp.')}
          ${headCell('medianAge', 'Median age')}
          ${headCell('urbanShare', 'Urban %')}
          ${headCell('hdi', 'HDI')}
        </tr></thead>
        <tbody>
          ${list.map((c, i) => `<tr>
            <td>${i + 1}</td>
            <td>${countryLink(c)}</td>
            <td>${esc(c.region)}</td>
            <td class="num">${formatMillions(c.population)}</td>
            <td class="num">${formatBillions(c.gdp)}</td>
            <td class="num">${formatDollars(gdpPerCapita(c))}</td>
            <td class="num">${c.lifeExpectancy.toFixed(1)}</td>
            <td class="num">${c.medianAge.toFixed(1)}</td>
            <td class="num">${c.urbanShare}%</td>
            <td class="num">${c.hdi.toFixed(3)}</td>
          </tr>`).join('')}
        </tbody>
      </table>
      </div>
      <p class="caption">Figures are 2024 unless noted. GDP per capita and density are computed from the published
      population, GDP and area figures. Sources: World Bank WDI, IMF WEO, UN WPP 2024, UNDP Human Development Report.</p>
    </section>`;
  document.getElementById('rank-sort').addEventListener('change', (e) => {
    location.hash = '#/rankings?sort=' + e.target.value + '&dir=desc';
  });
  document.getElementById('rank-flip').addEventListener('click', () => {
    location.hash = '#/rankings?sort=' + key + '&dir=' + (dir === 'desc' ? 'asc' : 'desc');
  });
}

// ---------- About ----------

function renderAbout() {
  app.innerHTML = `
    <section class="hero">
      <p class="eyebrow">Methodology &amp; sources</p>
      <h1>About NationAtlas</h1>
      <p class="lede">NationAtlas is an independent reference site. It is not affiliated with the
      World Bank, the IMF, the United Nations or UNDP; it republishes their published figures, rounded, with credit.</p>
    </section>
    <section class="panel">
      <h2>Where the numbers come from</h2>
      <table class="fact-table">
        <thead><tr><th>Indicator</th><th>Source</th><th>Year</th></tr></thead>
        <tbody>
          ${INDICATORS.map((i) => `<tr><td>${i.label}</td><td>${i.source}</td><td>${i.year}</td></tr>`).join('')}
          <tr><td>Population density</td><td>Computed: population ÷ land area</td><td>2024</td></tr>
        </tbody>
      </table>
      <p>Population and GDP series for 2015–2024 are rounded from the same World Bank WDI series
      used for the 2024 headline figures. Where the IMF and World Bank disagree slightly on a GDP
      figure (they revise on different schedules), the World Bank value is used and the IMF is
      named as a cross-check. Figures are rounded for readability; ranks use the rounded values shown.</p>
    </section>
    <section class="panel">
      <h2>What this site does not do</h2>
      <p>It makes no forecasts and takes no live data: every figure on the site is fixed at
      publication time, so the page you see is the same page anyone else sees. It collects no
      personal data, sets no cookies, and loads nothing from another server — the whole site is
      the files it ships with.</p>
    </section>
    <section class="panel">
      <h2>Corrections</h2>
      <p>Statistics are revised by their publishers. If a figure here disagrees with the current
      World Bank, IMF, UN or UNDP release, the publisher’s release is right and this page should
      be updated to match it.</p>
    </section>`;
}

// ---------- Router ----------

export function route() {
  const hash = location.hash || '#/';
  const [pathPart, queryPart] = hash.replace(/^#/, '').split('?');
  const params = new URLSearchParams(queryPart || '');
  const parts = pathPart.split('/').filter(Boolean);
  document.querySelectorAll('.nav-link').forEach((a) => a.classList.remove('active'));
  if (parts[0] === 'country' && parts[1]) {
    document.querySelector('[data-nav="countries"]')?.classList.add('active');
    renderCountry(parts[1]);
  } else if (parts[0] === 'compare') {
    document.querySelector('[data-nav="compare"]')?.classList.add('active');
    renderCompare(params);
  } else if (parts[0] === 'rankings') {
    document.querySelector('[data-nav="rankings"]')?.classList.add('active');
    renderRankings(params);
  } else if (parts[0] === 'about') {
    document.querySelector('[data-nav="about"]')?.classList.add('active');
    renderAbout();
  } else {
    document.querySelector('[data-nav="home"]')?.classList.add('active');
    renderHome();
  }
  window.scrollTo(0, 0);
}
