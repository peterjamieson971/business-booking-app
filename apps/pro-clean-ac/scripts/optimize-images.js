const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  console.log('🎨 Starting image optimization...');

  const scrapedDir = path.join(process.cwd(), 'public', 'images', 'scraped');
  const optimizedDir = path.join(process.cwd(), 'public', 'images', 'optimized');

  // Check if sharp is installed
  let sharp;
  try {
    sharp = require('sharp');
  } catch (error) {
    console.log('📦 Sharp not found, installing...');
    const { execSync } = require('child_process');
    execSync('npm install sharp', { stdio: 'inherit' });
    sharp = require('sharp');
  }

  // Ensure directories exist
  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true });
  }

  if (!fs.existsSync(scrapedDir)) {
    console.log('⚠️  No scraped images directory found. Run scrape-images first.');
    return;
  }

  const files = fs.readdirSync(scrapedDir);
  const imageFiles = files.filter(file =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  console.log(`📸 Found ${imageFiles.length} images to optimize`);

  const sizes = [320, 640, 1024, 1920];
  const optimizedImages = [];

  for (const filename of imageFiles) {
    const inputPath = path.join(scrapedDir, filename);
    const nameWithoutExt = path.parse(filename).name;

    try {
      console.log(`🔄 Processing: ${filename}`);

      // Get original image metadata
      const metadata = await sharp(inputPath).metadata();
      console.log(`   Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);

      // Create optimized versions for different sizes
      for (const size of sizes) {
        // Skip if original is smaller than target size
        if (metadata.width && metadata.width < size) continue;

        const outputFilename = `${nameWithoutExt}-${size}w.webp`;
        const outputPath = path.join(optimizedDir, outputFilename);

        // Skip if already exists
        if (fs.existsSync(outputPath)) {
          console.log(`   ⏭️  Skipping ${outputFilename} (already exists)`);
          continue;
        }

        await sharp(inputPath)
          .resize(size, null, {
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({
            quality: 85,
            effort: 4
          })
          .toFile(outputPath);

        console.log(`   ✅ Created: ${outputFilename}`);
      }

      // Create a full-size optimized version
      const fullSizeFilename = `${nameWithoutExt}-full.webp`;
      const fullSizePath = path.join(optimizedDir, fullSizeFilename);

      if (!fs.existsSync(fullSizePath)) {
        await sharp(inputPath)
          .webp({
            quality: 90,
            effort: 4
          })
          .toFile(fullSizePath);

        console.log(`   ✅ Created: ${fullSizeFilename}`);
      }

      // Generate blur placeholder
      const blurFilename = `${nameWithoutExt}-blur.webp`;
      const blurPath = path.join(optimizedDir, blurFilename);

      if (!fs.existsSync(blurPath)) {
        await sharp(inputPath)
          .resize(20, 20, {
            fit: 'inside'
          })
          .blur(1)
          .webp({
            quality: 20
          })
          .toFile(blurPath);

        console.log(`   ✅ Created blur placeholder: ${blurFilename}`);
      }

      optimizedImages.push({
        original: filename,
        sizes: sizes.filter(size => !metadata.width || metadata.width >= size),
        fullSize: fullSizeFilename,
        blur: blurFilename,
        originalWidth: metadata.width,
        originalHeight: metadata.height
      });

    } catch (error) {
      console.error(`❌ Failed to process ${filename}:`, error.message);
    }
  }

  // Create image manifest
  const manifestPath = path.join(optimizedDir, 'image-manifest.json');
  const manifest = {
    generated: new Date().toISOString(),
    totalImages: optimizedImages.length,
    images: optimizedImages
  };

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\n✅ Image optimization completed!`);
  console.log(`📊 Processed ${optimizedImages.length} images`);
  console.log(`📁 Optimized images saved to: ${optimizedDir}`);
  console.log(`📄 Manifest created: ${manifestPath}`);

  return optimizedImages;
}

// Run the optimizer if called directly
if (require.main === module) {
  optimizeImages()
    .then(() => {
      console.log('🎉 Image optimization process completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Image optimization failed:', error);
      process.exit(1);
    });
}

module.exports = { optimizeImages };