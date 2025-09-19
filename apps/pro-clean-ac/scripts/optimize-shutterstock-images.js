const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = '/Users/peterjamieson/Documents/Ai Consultancy/Business Booking Website/business-booking-app/images/shutterstock';
const targetDir = '/Users/peterjamieson/Documents/Ai Consultancy/Business Booking Website/business-booking-app/apps/pro-clean-ac/public/images/hero';

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Image mappings with descriptive names
const imageMap = {
  'shutterstock_1505538905.jpg': 'woman-adjusting-thermostat',
  'shutterstock_2466562349.jpg': 'woman-using-ac-remote',
  'shutterstock_2566757199.jpg': 'professional-ac-cleaning'
};

// Sizes for responsive images
const sizes = [
  { width: 640, suffix: '640w' },
  { width: 768, suffix: '768w' },
  { width: 1024, suffix: '1024w' },
  { width: 1280, suffix: '1280w' },
  { width: 1536, suffix: '1536w' },
  { width: 1920, suffix: '1920w' }
];

async function optimizeImages() {
  console.log('Starting Shutterstock image optimization...');

  for (const [originalName, newName] of Object.entries(imageMap)) {
    const sourcePath = path.join(sourceDir, originalName);

    if (!fs.existsSync(sourcePath)) {
      console.log(`Source file not found: ${originalName}`);
      continue;
    }

    console.log(`Processing: ${originalName} -> ${newName}`);

    try {
      // Get image metadata
      const metadata = await sharp(sourcePath).metadata();
      console.log(`  Original: ${metadata.width}x${metadata.height}, format: ${metadata.format}`);

      // Generate WebP versions at different sizes
      for (const size of sizes) {
        if (size.width <= metadata.width) {
          const outputPath = path.join(targetDir, `${newName}-${size.suffix}.webp`);

          await sharp(sourcePath)
            .resize(size.width, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .webp({
              quality: 85,
              effort: 6
            })
            .toFile(outputPath);

          console.log(`  Generated: ${newName}-${size.suffix}.webp`);
        }
      }

      // Also create a high-quality full-size WebP
      const fullSizePath = path.join(targetDir, `${newName}-full.webp`);
      await sharp(sourcePath)
        .webp({
          quality: 90,
          effort: 6
        })
        .toFile(fullSizePath);

      console.log(`  Generated: ${newName}-full.webp`);

    } catch (error) {
      console.error(`Error processing ${originalName}:`, error);
    }
  }

  console.log('Shutterstock image optimization complete!');

  // Create a mapping file for easy reference
  const mappingFile = path.join(targetDir, 'image-mapping.json');
  const mapping = {
    thermostat: {
      name: 'woman-adjusting-thermostat',
      description: 'Woman adjusting home thermostat/AC control',
      usage: 'Hero sections, comfort/temperature control content'
    },
    remote: {
      name: 'woman-using-ac-remote',
      description: 'Woman using AC remote control in modern room',
      usage: 'User experience, comfort sections'
    },
    professional: {
      name: 'professional-ac-cleaning',
      description: 'Professional AC cleaning/maintenance being performed',
      usage: 'Service sections, professional work demonstrations'
    }
  };

  fs.writeFileSync(mappingFile, JSON.stringify(mapping, null, 2));
  console.log('Created image mapping file for reference');
}

// Check if sharp is available
try {
  require.resolve('sharp');
  optimizeImages().catch(console.error);
} catch (error) {
  console.log('Sharp not found. Installing...');
  const { execSync } = require('child_process');
  execSync('npm install sharp', { stdio: 'inherit' });
  console.log('Sharp installed. Running optimization...');
  optimizeImages().catch(console.error);
}