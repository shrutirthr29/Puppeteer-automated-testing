import puppeteer from 'puppeteer';
import fs from "fs"
import pixelmatch from 'pixelmatch';
import {PNG} from 'pngjs'

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto('https://www.calculator.net/');

  const text = await page.evaluate(() => document.querySelector('h1').innerText);
  console.log('Extracted Text:', text); 

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
})();
