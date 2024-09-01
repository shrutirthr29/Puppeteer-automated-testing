import puppeteer from 'puppeteer';
import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({ width: 1200, height: 800 });

  await page.goto('https://www.calculator.net/');

  const text = await page.evaluate(() => document.querySelector('h1').innerText);
  console.log('Extracted Text:', text);

  await page.click('span[onclick="r(1)"]'); 
  await page.click('span[onclick="r(5)"]'); 
  await page.click('span[onclick="r(\'+\')"]'); 
  await page.click('span[onclick="r(2)"]');
  await page.click('span[onclick="r(0)"]');
  await page.click('span[onclick="r(\'=\')"]'); 
  await page.waitForSelector('#sciOutPut', { visible: true });

  const output = await page.evaluate(() => document.querySelector('#sciOutPut').innerText.trim());
  console.log('Calculated Output:', output);

  if (output === '35') {
    console.log('Test Passed: The output is correct.');
  } else {
    console.error('Test Failed: The output is incorrect.');
  }

  const referenceScreenshot = 'reference.png';
  const testScreenshot = 'test.png';

  if (!fs.existsSync(referenceScreenshot)) {
    await page.screenshot({ path: referenceScreenshot });
    console.log('Reference screenshot saved.');
  } else {
    await page.screenshot({ path: testScreenshot });

    const img1 = PNG.sync.read(fs.readFileSync(referenceScreenshot));
    const img2 = PNG.sync.read(fs.readFileSync(testScreenshot));
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    const mismatchedPixels = pixelmatch(
      img1.data,
      img2.data,
      diff.data,
      width,
      height,
      { threshold: 0.1 }
    );

    if (mismatchedPixels > 0) {
      fs.writeFileSync('diff.png', PNG.sync.write(diff));
      console.log('Screenshots do not match. Check diff.png for differences.');
    } else {
      console.log('Screenshots match.');
    }
  }

  await browser.close();
})().catch((err) => {
  console.error('Error running the test:', err);
  process.exit(1);
});
