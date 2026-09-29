// Renders the app icon (public/images/heart-icon.png) - a heart in a purple circle.
// Run from the config folder with: npm run icons
const sharp = require('sharp');
const path = require('path');

const OUT = path.join(__dirname, '..', '..', 'public', 'images', 'heart-icon.png');

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
    <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#6b2f5a"/>
            <stop offset="1" stop-color="#874077"/>
        </linearGradient>
    </defs>
    <circle cx="256" cy="256" r="256" fill="url(#bg)"/>
    <g transform="translate(256 262) scale(11) translate(-12 -12)">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill="#ffffff" fill-opacity="0.25" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
</svg>`;

sharp(Buffer.from(SVG), { density: 144 })
    .resize(512, 512)
    .png()
    .toFile(OUT)
    .then(() => console.log('wrote public/images/heart-icon.png (512x512)'));
