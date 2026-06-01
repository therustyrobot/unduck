#!/usr/bin/env node
'use strict';

const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [16, 48, 128];
const iconsDir = path.join(__dirname, '..', 'icons');

// Draw Google multicolor G logo on canvas at given size
function drawGoogleG(ctx, size) {
  const s = size / 48; // scale factor (SVG viewBox is 0 0 48 48)

  ctx.clearRect(0, 0, size, size);

  // Blue path (top arc + right side bar)
  ctx.beginPath();
  ctx.fillStyle = '#4285F4';
  // M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z
  ctx.moveTo(45.12 * s, 24.5 * s);
  ctx.bezierCurveTo(45.12 * s, (24.5 - 1.56) * s, (45.12 - 0.14) * s, (24.5 - 3.06) * s, (45.12 - 0.4) * s, (24.5 - 4.5) * s);
  ctx.lineTo(24 * s, 20 * s);
  ctx.lineTo(24 * s, 28.51 * s);
  ctx.lineTo(35.84 * s, 28.51 * s);
  ctx.bezierCurveTo((35.84 - 0.51) * s, (28.51 + 2.75) * s, (35.84 - 2.06) * s, (28.51 + 5.08) * s, (35.84 - 4.39) * s, (28.51 + 6.64) * s);
  ctx.lineTo(31.45 * s, 40.67 * s);
  ctx.lineTo(38.56 * s, 40.67 * s);
  ctx.bezierCurveTo((38.56 + 4.16) * s, (40.67 - 3.83) * s, (38.56 + 6.56) * s, (40.67 - 9.47) * s, (38.56 + 6.56) * s, (40.67 - 16.17) * s);
  ctx.closePath();
  ctx.fill();

  // Green path (bottom right)
  ctx.beginPath();
  ctx.fillStyle = '#34A853';
  // M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z
  ctx.moveTo(24 * s, 46 * s);
  ctx.bezierCurveTo((24 + 5.94) * s, 46 * s, (24 + 10.92) * s, (46 - 1.97) * s, (24 + 14.56) * s, (46 - 5.33) * s);
  ctx.lineTo((24 + 14.56 - 7.11) * s, (46 - 5.33 - 5.52) * s);
  ctx.bezierCurveTo((31.45 - 1.97) * s, (35.15 + 1.32) * s, (31.45 - 4.49) * s, (35.15 + 2.1) * s, (31.45 - 7.45) * s, (35.15 + 2.1) * s);
  ctx.bezierCurveTo((24 - 5.73) * s, 37.25 * s, (24 - 10.58) * s, (37.25 - 3.87) * s, (24 - 12.31) * s, (37.25 - 9.07) * s);
  ctx.lineTo(4.34 * s, 28.18 * s);
  ctx.lineTo(4.34 * s, 33.88 * s);
  ctx.bezierCurveTo(7.96 * s, 41.07 * s, 15.4 * s, 46 * s, 24 * s, 46 * s);
  ctx.closePath();
  ctx.fill();

  // Yellow path (bottom left)
  ctx.beginPath();
  ctx.fillStyle = '#FBBC04';
  // M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z
  ctx.moveTo(11.69 * s, 28.18 * s);
  ctx.bezierCurveTo(11.25 * s, 26.86 * s, 11 * s, 25.45 * s, 11 * s, 24 * s);
  ctx.bezierCurveTo(11 * s, (24 - 2.86) * s, (11 + 0.25) * s, (24 - 4.18) * s, (11 + 0.69) * s, (24 - 4.18) * s);
  ctx.lineTo(11.69 * s, 14.12 * s);
  ctx.lineTo(4.34 * s, 14.12 * s);
  ctx.bezierCurveTo(2.85 * s, 17.09 * s, 2 * s, 20.45 * s, 2 * s, 24 * s);
  ctx.bezierCurveTo(2 * s, (24 + 3.55) * s, (2 + 0.85) * s, (24 + 6.91) * s, (2 + 2.34) * s, (24 + 9.88) * s);
  ctx.lineTo((2 + 2.34 + 7.35) * s, (24 + 9.88 - 5.7) * s);
  ctx.closePath();
  ctx.fill();

  // Red path (top left / top arc)
  ctx.beginPath();
  ctx.fillStyle = '#EA4335';
  // M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z
  ctx.moveTo(24 * s, 10.75 * s);
  ctx.bezierCurveTo((24 + 3.23) * s, 10.75 * s, (24 + 6.13) * s, (10.75 + 1.11) * s, (24 + 8.41) * s, (10.75 + 3.29) * s);
  ctx.lineTo((32.41 + 6.31) * s, (14.04 - 6.31) * s);
  ctx.bezierCurveTo(34.91 * s, 4.18 * s, 29.93 * s, 2 * s, 24 * s, 2 * s);
  ctx.bezierCurveTo(15.4 * s, 2 * s, 7.96 * s, 6.93 * s, 4.34 * s, 14.12 * s);
  ctx.lineTo((4.34 + 7.35) * s, (14.12 + 5.7) * s);
  ctx.bezierCurveTo((11.69 + 1.73) * s, (19.82 - 5.2) * s, (11.69 + 6.58) * s, (19.82 - 9.07) * s, 24 * s, 10.75 * s);
  ctx.closePath();
  ctx.fill();
}

for (const size of sizes) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  drawGoogleG(ctx, size);
  const outPath = path.join(iconsDir, `icon${size}.png`);
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outPath, buffer);
  console.log(`Generated ${outPath} (${buffer.length} bytes)`);
}
