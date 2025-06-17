#!/usr/bin/env node

import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const publicDir = join(process.cwd(), 'public');
const srcDir = join(process.cwd(), 'src', 'app');
const logoPath = join(publicDir, 'logo.png');

async function generateFavicons() {
  try {
    console.log('🎨 Generating favicons from Elitizon logo...');

    // Read the original logo
    const logoBuffer = readFileSync(logoPath);

    // Generate favicon.ico (32x32) for src/app/
    await sharp(logoBuffer)
      .resize(32, 32)
      .png()
      .toFile(join(srcDir, 'favicon.png'));

    // Convert PNG to ICO format for src/app/favicon.ico
    await sharp(logoBuffer)
      .resize(32, 32)
      .png()
      .toFile(join(srcDir, 'temp-favicon.png'));

    // Generate various sizes for public directory
    const sizes = [
      { size: 16, name: 'favicon-16x16.png' },
      { size: 32, name: 'favicon-32x32.png' },
      { size: 192, name: 'android-chrome-192x192.png' },
      { size: 512, name: 'android-chrome-512x512.png' },
      { size: 180, name: 'apple-touch-icon.png' }
    ];

    for (const { size, name } of sizes) {
      await sharp(logoBuffer)
        .resize(size, size)
        .png()
        .toFile(join(publicDir, name));
      
      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    // Create favicon.ico for public directory
    await sharp(logoBuffer)
      .resize(32, 32)
      .png()
      .toFile(join(publicDir, 'favicon.ico'));

    // Also update the src/app/favicon.ico
    await sharp(logoBuffer)
      .resize(32, 32)
      .png()
      .toFile(join(srcDir, 'favicon.ico'));

    console.log('🎉 All favicons generated successfully!');
    console.log('📍 Files updated:');
    console.log('  - src/app/favicon.ico');
    console.log('  - public/favicon.ico');
    console.log('  - public/favicon-16x16.png');
    console.log('  - public/favicon-32x32.png');
    console.log('  - public/android-chrome-192x192.png');
    console.log('  - public/android-chrome-512x512.png');
    console.log('  - public/apple-touch-icon.png');

  } catch (error) {
    console.error('❌ Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
