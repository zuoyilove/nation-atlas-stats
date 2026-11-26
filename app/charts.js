// NationAtlas charts: small canvas chart helpers, no library. Every chart is drawn
// from the data in data.js at render time, with axes, gridlines and labels, so a
// screenshot always shows real figures, never a placeholder image.

export const INK = '#1b2a4a';
export const MUTED = '#64748b';
export const GRID = '#e2e8f0';
export const TEAL = '#0f766e';
export const AMBER = '#b45309';
export const BLUE = '#1d4ed8';
export const ROSE = '#be123c';

export function formatMillions(millions) {
  if (millions >= 1000) return (millions / 1000).toFixed(2).replace(/\.?0+$/, '') + 'B';
  return millions.toFixed(1).replace(/\.0$/, '') + 'M';
}

export function formatBillions(billions) {
  if (billions >= 1000) return '$' + (billions / 1000).toFixed(2).replace(/\.?0+$/, '') + 'T';
  return '$' + Math.round(billions) + 'B';
}

export function formatDollars(dollars) {
  return '$' + Math.round(dollars).toLocaleString('en-US');
}

function setupCanvas(canvas, height) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth || canvas.parentElement.clientWidth || 640;
  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.height = height + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.font = '12px system-ui, -apple-system, "Segoe UI", sans-serif';
  return { ctx, width, height };
}

// Horizontal bars: items are { label, value, display, color? }.
export function drawBarChart(canvas, items, options = {}) {
  const height = options.height || 320;
  const { ctx, width } = setupCanvas(canvas, height);
  const max = Math.max(...items.map((i) => i.value));
  const labelWidth = options.labelWidth || 110;
  const valueWidth = 74;
  const rowH = (height - 30) / items.length;
  const barH = Math.min(20, rowH - 8);
  ctx.clearRect(0, 0, width, height);
  ctx.textBaseline = 'middle';
  items.forEach((item, i) => {
    const y = 8 + i * rowH + rowH / 2;
    ctx.fillStyle = INK;
    ctx.textAlign = 'right';
    ctx.fillText(item.label, labelWidth - 8, y);
    const barX = labelWidth;
    const barW = (width - labelWidth - valueWidth - 8) * (item.value / max);
    ctx.fillStyle = item.color || TEAL;
    const r = 3;
    ctx.beginPath();
    ctx.roundRect(barX, y - barH / 2, Math.max(barW, 2), barH, r);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.textAlign = 'left';
    ctx.fillText(item.display, barX + barW + 8, y);
  });
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'left';
  ctx.fillText(options.caption || '', 0, height - 8);
}

// Line chart: years on x, one or two series { label, values, color }.
export function drawLineChart(canvas, years, series, options = {}) {
  const height = options.height || 280;
  const { ctx, width } = setupCanvas(canvas, height);
  const padL = 52, padR = 14, padT = 26, padB = 28;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;
  const all = series.flatMap((s) => s.values);
  let min = Math.min(...all), max = Math.max(...all);
  const span = max - min || 1;
  min -= span * 0.08;
  max += span * 0.08;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  const ticks = 4;
  for (let t = 0; t <= ticks; t++) {
    const v = min + ((max - min) * t) / ticks;
    const y = padT + plotH - (plotH * t) / ticks;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(width - padR, y);
    ctx.stroke();
    ctx.fillText(options.formatTick ? options.formatTick(v) : Math.round(v).toLocaleString('en-US'), padL - 8, y);
  }
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  years.forEach((year, i) => {
    if (i % 2 === 0 || i === years.length - 1) {
      ctx.fillText(String(year), padL + (plotW * i) / (years.length - 1), padT + plotH + 8);
    }
  });
  series.forEach((s) => {
    ctx.strokeStyle = s.color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    s.values.forEach((v, i) => {
      const x = padL + (plotW * i) / (years.length - 1);
      const y = padT + plotH - ((v - min) / (max - min)) * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.fillStyle = s.color;
    s.values.forEach((v, i) => {
      const x = padL + (plotW * i) / (years.length - 1);
      const y = padT + plotH - ((v - min) / (max - min)) * plotH;
      ctx.beginPath();
      ctx.arc(x, y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
  });
  // Legend, top left inside the plot.
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  let lx = padL;
  series.forEach((s) => {
    ctx.fillStyle = s.color;
    ctx.fillRect(lx, 8, 10, 10);
    ctx.fillStyle = INK;
    ctx.fillText(s.label, lx + 14, 8);
    lx += 14 + ctx.measureText(s.label).width + 18;
  });
  ctx.fillStyle = MUTED;
  ctx.textAlign = 'left';
  ctx.fillText(options.caption || '', 0, height - 4);
}
