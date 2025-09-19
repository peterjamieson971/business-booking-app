const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');
const { URL } = require('url');

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        resolve();
      });

      file.on('error', (err) => {
        fs.unlink(filepath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function sanitizeFilename(filename) {
  return filename
    .replace(/[^a-z0-9\-_.]/gi, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

async function scrapeProCleanImages() {
  console.log('🚀 Starting Pro Clean AC image scraping...');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set a realistic user agent
  await page.setExtraHTTPHeaders({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  });

  const baseUrl = 'https://www.proclean-ac.com';
  const scrapedDir = path.join(process.cwd(), 'public', 'images', 'scraped');

  // Ensure directories exist
  if (!fs.existsSync(scrapedDir)) {
    fs.mkdirSync(scrapedDir, { recursive: true });
  }

  let imageCounter = 0;
  const downloadedImages = [];

  try {
    console.log(`📡 Navigating to ${baseUrl}...`);

    // Navigate to main site with error handling
    try {
      await page.goto(baseUrl, {
        waitUntil: 'networkidle',
        timeout: 30000
      });
      console.log('✅ Successfully loaded homepage');
    } catch (error) {
      console.error('❌ Failed to load homepage:', error.message);
      console.log('🔄 Trying with different wait strategy...');

      await page.goto(baseUrl, {
        waitUntil: 'domcontentloaded',
        timeout: 30000
      });
      await page.waitForTimeout(3000); // Wait additional 3 seconds
    }

    // Function to scrape images from current page
    async function scrapeCurrentPage(pageType = 'homepage') {
      console.log(`🔍 Scraping images from ${pageType}...`);

      const images = await page.evaluate(() => {
        const imgs = Array.from(document.querySelectorAll('img'));
        return imgs.map(img => ({
          src: img.src,
          alt: img.alt || '',
          width: img.naturalWidth || img.width || 0,
          height: img.naturalHeight || img.height || 0,
          className: img.className || '',
          id: img.id || ''
        })).filter(img =>
          img.src &&
          !img.src.includes('data:') &&
          !img.src.includes('base64') &&
          img.width > 50 &&
          img.height > 50
        );
      });

      console.log(`📸 Found ${images.length} images on ${pageType}`);

      for (const img of images) {
        try {
          const url = new URL(img.src);
          const extension = path.extname(url.pathname) || '.jpg';

          // Create descriptive filename
          let filename;
          if (pageType === 'homepage') {
            if (img.alt && img.alt.length > 0) {
              filename = `hero-${sanitizeFilename(img.alt)}-${imageCounter}${extension}`;
            } else if (img.className.includes('hero') || img.className.includes('banner')) {
              filename = `hero-banner-${imageCounter}${extension}`;
            } else {
              filename = `homepage-${imageCounter}${extension}`;
            }
          } else {
            const altText = img.alt ? sanitizeFilename(img.alt) : 'image';
            filename = `${pageType}-${altText}-${imageCounter}${extension}`;
          }

          const filepath = path.join(scrapedDir, filename);

          // Skip if already downloaded
          if (fs.existsSync(filepath)) {
            console.log(`⏭️  Skipping ${filename} (already exists)`);
            continue;
          }

          console.log(`⬇️  Downloading: ${filename}`);
          await downloadImage(img.src, filepath);

          downloadedImages.push({
            filename,
            originalUrl: img.src,
            alt: img.alt,
            width: img.width,
            height: img.height,
            pageType
          });

          imageCounter++;

          // Small delay to be respectful
          await page.waitForTimeout(500);

        } catch (error) {
          console.error(`❌ Failed to download image: ${error.message}`);
        }
      }
    }

    // Scrape homepage
    await scrapeCurrentPage('homepage');

    // Define pages to scrape with fallback URLs
    const pagesToScrape = [
      { url: '/services', type: 'services' },
      { url: '/about', type: 'about' },
      { url: '/about-us', type: 'about' },
      { url: '/contact', type: 'contact' },
      { url: '/gallery', type: 'gallery' },
      { url: '/portfolio', type: 'gallery' },
      { url: '/our-work', type: 'gallery' },
      { url: '/team', type: 'team' }
    ];

    // Try to scrape additional pages
    for (const pageInfo of pagesToScrape) {
      try {
        console.log(`🔗 Trying to navigate to ${pageInfo.url}...`);

        const response = await page.goto(`${baseUrl}${pageInfo.url}`, {
          waitUntil: 'domcontentloaded',
          timeout: 15000
        });

        if (response && response.status() === 200) {
          await page.waitForTimeout(2000);
          await scrapeCurrentPage(pageInfo.type);
        } else {
          console.log(`⚠️  Page ${pageInfo.url} not accessible (status: ${response?.status()})`);
        }

      } catch (error) {
        console.log(`⚠️  Page ${pageInfo.url} not found or inaccessible, skipping...`);
      }
    }

  } catch (error) {
    console.error('❌ Scraping failed:', error.message);
  } finally {
    await browser.close();
  }

  // Create attribution file
  const attributionPath = path.join(process.cwd(), 'images-attribution.md');
  let attributionContent = `# Image Attribution\n\n`;
  attributionContent += `Source: ${baseUrl}\n`;
  attributionContent += `Scraped on: ${new Date().toISOString()}\n`;
  attributionContent += `Total images downloaded: ${downloadedImages.length}\n\n`;

  attributionContent += `## Downloaded Images\n\n`;
  downloadedImages.forEach(img => {
    attributionContent += `- **${img.filename}**: ${img.alt || 'No alt text'} (${img.width}x${img.height}) - ${img.originalUrl}\n`;
  });

  attributionContent += `\n*Note: These images are used for demonstration purposes only. All rights belong to the original owners.*\n`;

  fs.writeFileSync(attributionPath, attributionContent);

  console.log(`\n✅ Scraping completed!`);
  console.log(`📊 Downloaded ${downloadedImages.length} images`);
  console.log(`📁 Images saved to: ${scrapedDir}`);
  console.log(`📄 Attribution file created: ${attributionPath}`);

  return downloadedImages;
}

// Run the scraper if called directly
if (require.main === module) {
  scrapeProCleanImages()
    .then(() => {
      console.log('🎉 Image scraping process completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Image scraping failed:', error);
      process.exit(1);
    });
}

module.exports = { scrapeProCleanImages };