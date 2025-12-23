#!/usr/bin/env node

import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const WIDTHS = [480, 768, 1200, 1600];
const AVIF_QUALITY = 50;
const WEBP_QUALITY = 75;
const INPUT_DIRS = [
  join(__dirname, '../public'),
  join(__dirname, '../assets'),
  join(__dirname, '../images'),
];
const OUTPUT_DIR = join(__dirname, '../public/optimized');

// Track statistics
let stats = {
  totalOriginalSize: 0,
  totalOptimizedSize: 0,
  filesProcessed: 0,
  filesSkipped: 0,
};

/**
 * Get all image files from a directory (recursive)
 */
async function getImageFiles(dir) {
  const files = [];
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      // Skip optimized directory and node_modules
      if (entry.isDirectory() && (entry.name === 'optimized' || entry.name === 'node_modules' || entry.name === '.git')) {
        continue;
      }
      
      if (entry.isDirectory()) {
        files.push(...(await getImageFiles(fullPath)));
      } else if (/\.(png|jpg|jpeg)$/i.test(entry.name)) {
        // Skip favicon files and other small icons
        if (entry.name.startsWith('favicon') || 
            entry.name.startsWith('android-chrome') || 
            entry.name.startsWith('apple-touch-icon')) {
          continue;
        }
        files.push(fullPath);
      }
    }
  } catch (err) {
    console.warn(`Warning: Could not read directory ${dir}:`, err.message);
  }
  return files;
}

/**
 * Get file size in bytes
 */
async function getFileSize(path) {
  try {
    const stats = await stat(path);
    return stats.size;
  } catch (err) {
    return 0;
  }
}

/**
 * Optimize a single image file
 */
async function optimizeImage(inputPath) {
  const baseName = basename(inputPath, extname(inputPath));
  
  console.log(`\nProcessing: ${inputPath}`);
  
  const originalSize = await getFileSize(inputPath);
  stats.totalOriginalSize += originalSize;
  
  let imageOptimizedSize = 0;
  
  try {
    // Get original image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`  Original: ${metadata.width}x${metadata.height} (${(originalSize / 1024).toFixed(1)}KB)`);
    
    // Process for each width
    for (const width of WIDTHS) {
      // Skip if original is smaller than target width
      if (metadata.width < width) {
        console.log(`  Skipping width ${width}px (original is ${metadata.width}px)`);
        continue;
      }
      
      // Calculate height maintaining aspect ratio
      const height = Math.round((width / metadata.width) * metadata.height);
      
      // Generate AVIF
      const avifPath = join(OUTPUT_DIR, `${baseName}-${width}.avif`);
      await sharp(inputPath)
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .avif({ quality: AVIF_QUALITY, effort: 6 })
        .toFile(avifPath);
      const avifSize = await getFileSize(avifPath);
      imageOptimizedSize += avifSize;
      console.log(`  ✓ AVIF ${width}w: ${(avifSize / 1024).toFixed(1)}KB`);
      
      // Generate WebP
      const webpPath = join(OUTPUT_DIR, `${baseName}-${width}.webp`);
      await sharp(inputPath)
        .resize(width, height, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);
      const webpSize = await getFileSize(webpPath);
      imageOptimizedSize += webpSize;
      console.log(`  ✓ WebP ${width}w: ${(webpSize / 1024).toFixed(1)}KB`);
    }
    
    stats.totalOptimizedSize += imageOptimizedSize;
    stats.filesProcessed++;
    
    const savings = originalSize - imageOptimizedSize;
    const savingsPercent = ((savings / originalSize) * 100).toFixed(1);
    console.log(`  Savings: ${(savings / 1024).toFixed(1)}KB (${savingsPercent}%)`);
    
  } catch (err) {
    console.error(`  ✗ Error processing ${inputPath}:`, err.message);
    stats.filesSkipped++;
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('🖼️  Image Optimization Pipeline\n');
  console.log('Configuration:');
  console.log(`  Widths: ${WIDTHS.join(', ')}px`);
  console.log(`  AVIF Quality: ${AVIF_QUALITY}`);
  console.log(`  WebP Quality: ${WEBP_QUALITY}`);
  console.log(`  Output: ${OUTPUT_DIR}\n`);
  
  // Create output directory
  await mkdir(OUTPUT_DIR, { recursive: true });
  
  // Collect all image files
  const allFiles = [];
  for (const dir of INPUT_DIRS) {
    const files = await getImageFiles(dir);
    allFiles.push(...files);
  }
  
  console.log(`Found ${allFiles.length} image(s) to process\n`);
  console.log('═'.repeat(60));
  
  // Process each image
  for (const file of allFiles) {
    await optimizeImage(file);
  }
  
  // Print summary
  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 Summary:');
  console.log(`  Files processed: ${stats.filesProcessed}`);
  console.log(`  Files skipped: ${stats.filesSkipped}`);
  console.log(`  Original total: ${(stats.totalOriginalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`  Optimized total: ${(stats.totalOptimizedSize / 1024 / 1024).toFixed(2)}MB`);
  
  const totalSavings = stats.totalOriginalSize - stats.totalOptimizedSize;
  const totalSavingsPercent = stats.totalOriginalSize > 0 
    ? ((totalSavings / stats.totalOriginalSize) * 100).toFixed(1)
    : 0;
  
  console.log(`  Total savings: ${(totalSavings / 1024 / 1024).toFixed(2)}MB (${totalSavingsPercent}%)`);
  console.log('\n✅ Optimization complete!\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
