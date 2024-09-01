import puppeteer from 'puppeteer';
import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Set the viewport for the page
  await page.setViewport({ width: 1200, height: 800 });

  // Navigate to the calculator website
  await page.goto('https://www.calculator.net/');

  // Extract and print some text from the website (like the heading)
  const text = await page.evaluate(() => document.querySelector('h1').innerText);
  console.log('Extracted Text:', text);

  // Perform calculation "15 + 20" using updated selectors
  // Click the number '1'
  await page.click('span[onclick="r(1)"]'); 

  // Click the number '5'
  await page.click('span[onclick="r(5)"]'); 

  // Click the '+' operator
  await page.click('span[onclick="r(\'+\')"]'); 

  // Click the number '2'
  await page.click('span[onclick="r(2)"]');

  // Click the number '0'
  await page.click('span[onclick="r(0)"]');

  // Click the '=' button to get the result
  await page.click('span[onclick="r(\'=\')"]'); 

  // Wait for the output element to display the result
  await page.waitForSelector('#sciOutPut', { visible: true });

  // Extract the output value and validate it
  const output = await page.evaluate(() => document.querySelector('#sciOutPut').innerText.trim());
  console.log('Calculated Output:', output);

  // Check if the output matches "35"
  if (output === '35') {
    console.log('Test Passed: The output is correct.');
  } else {
    console.error('Test Failed: The output is incorrect.');
  }

  // Screenshot comparison setup
  const referenceScreenshot = 'reference.png';
  const testScreenshot = 'test.png';

  // Check if a reference screenshot exists
  if (!fs.existsSync(referenceScreenshot)) {
    // Take the initial reference screenshot
    await page.screenshot({ path: referenceScreenshot });
    console.log('Reference screenshot saved.');
  } else {
    // Capture a new screenshot for comparison
    await page.screenshot({ path: testScreenshot });

    // Read both screenshots
    const img1 = PNG.sync.read(fs.readFileSync(referenceScreenshot));
    const img2 = PNG.sync.read(fs.readFileSync(testScreenshot));
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    // Compare the screenshots with pixelmatch
    const mismatchedPixels = pixelmatch(
      img1.data,
      img2.data,
      diff.data,
      width,
      height,
      { threshold: 0.1 }
    );

    // Log the comparison results
    if (mismatchedPixels > 0) {
      fs.writeFileSync('diff.png', PNG.sync.write(diff));
      console.log('Screenshots do not match. Check diff.png for differences.');
    } else {
      console.log('Screenshots match.');
    }
  }

  // Close the browser
  await browser.close();
})().catch((err) => {
  console.error('Error running the test:', err);
  process.exit(1);
});
