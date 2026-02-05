import fs from 'fs';
import { createCanvas } from 'canvas';

/**
 * Generate a procedural noise texture for the motion design site
 * Output: 512x512 grayscale noise pattern
 */
function generateNoiseTexture(width, height, intensity = 0.3) {
  console.log(`Generating noise texture: ${width}x${height} (intensity: ${intensity})`);

  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const imageData = ctx.createImageData(width, height);

  // Generate random noise for each pixel
  for (let i = 0; i < imageData.data.length; i += 4) {
    const noise = Math.random() * 255 * intensity;
    imageData.data[i] = noise;     // R
    imageData.data[i + 1] = noise; // G
    imageData.data[i + 2] = noise; // B
    imageData.data[i + 3] = 255;   // A (full opacity)
  }

  ctx.putImageData(imageData, 0, 0);

  // Save to public/textures/
  const outputPath = 'public/textures/Texture_01.png';
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);

  console.log(`✅ Noise texture generated successfully!`);
  console.log(`   Location: ${outputPath}`);
  console.log(`   Size: ${(buffer.length / 1024).toFixed(2)} KB`);
}

// Generate 512x512 texture with 30% intensity (subtle grain)
generateNoiseTexture(512, 512, 0.3);
