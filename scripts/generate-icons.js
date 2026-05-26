// Generates square PWA icons from the rectangular logo by centering it on a
// white square background. Run with: node scripts/generate-icons.js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = path.join(__dirname, '..', 'images', "Omri's Software - icon.png");
const OUT_DIR = path.join(__dirname, '..', 'images');

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

async function makeSquare(size, { padRatio = 0.1, outName }) {
    const inner = Math.round(size * (1 - padRatio * 2));
    const logo = await sharp(SRC)
        .resize({ width: inner, height: inner, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .toBuffer();

    await sharp({
        create: { width: size, height: size, channels: 4, background: WHITE },
    })
        .composite([{ input: logo, gravity: 'center' }])
        .png()
        .toFile(path.join(OUT_DIR, outName));

    console.log(`  wrote ${outName} (${size}x${size}, pad ${Math.round(padRatio * 100)}%)`);
}

(async () => {
    console.log('Generating PWA icons...');
    await makeSquare(180, { padRatio: 0.08, outName: 'icon-180.png' });   // iOS apple-touch-icon
    await makeSquare(192, { padRatio: 0.08, outName: 'icon-192.png' });   // Android standard
    await makeSquare(512, { padRatio: 0.08, outName: 'icon-512.png' });   // Android standard / splash
    await makeSquare(512, { padRatio: 0.20, outName: 'icon-maskable-512.png' }); // Android adaptive (safe zone)
    await makeSquare(192, { padRatio: 0.20, outName: 'icon-maskable-192.png' });
    console.log('Done.');
})();
