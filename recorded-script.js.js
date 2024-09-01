// const puppeteer = require('puppeteer'); // v22.0.0 or later
import puppeteer from "puppeteer"

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 971,
            height: 678
        })
    }
    {
        const targetPage = page;
        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        startWaitingForEvents();
        await targetPage.goto('https://www.calculator.net/');
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('td:nth-of-type(2) div:nth-of-type(3) > span:nth-of-type(1)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"sciout\\"]/tbody/tr[2]/td[2]/div/div[3]/span[1])'),
            targetPage.locator(':scope >>> td:nth-of-type(2) div:nth-of-type(3) > span:nth-of-type(1)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 22.1875,
                y: 20.199996948242188,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('td:nth-of-type(2) div:nth-of-type(2) > span:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"sciout\\"]/tbody/tr[2]/td[2]/div/div[2]/span[2])'),
            targetPage.locator(':scope >>> td:nth-of-type(2) div:nth-of-type(2) > span:nth-of-type(2)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 28.98748779296875,
                y: 15,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('td:nth-of-type(2) div:nth-of-type(1) > span:nth-of-type(4)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"sciout\\"]/tbody/tr[2]/td[2]/div/div[1]/span[4])'),
            targetPage.locator(':scope >>> td:nth-of-type(2) div:nth-of-type(1) > span:nth-of-type(4)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 20.587493896484375,
                y: 13.800003051757812,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('td:nth-of-type(2) div:nth-of-type(3) > span:nth-of-type(2)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"sciout\\"]/tbody/tr[2]/td[2]/div/div[3]/span[2])'),
            targetPage.locator(':scope >>> td:nth-of-type(2) div:nth-of-type(3) > span:nth-of-type(2)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 4.98748779296875,
                y: 17.199996948242188,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('td:nth-of-type(2) div:nth-of-type(4) > span:nth-of-type(1)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"sciout\\"]/tbody/tr[2]/td[2]/div/div[4]/span[1])'),
            targetPage.locator(':scope >>> td:nth-of-type(2) div:nth-of-type(4) > span:nth-of-type(1)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 11.1875,
                y: 18.399993896484375,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('td:nth-of-type(2) div:nth-of-type(5) > span:nth-of-type(4)'),
            targetPage.locator('::-p-xpath(//*[@id=\\"sciout\\"]/tbody/tr[2]/td[2]/div/div[5]/span[4])'),
            targetPage.locator(':scope >>> td:nth-of-type(2) div:nth-of-type(5) > span:nth-of-type(4)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 41.587493896484375,
                y: 20.600006103515625,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
