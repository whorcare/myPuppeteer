const puppeter = require('puppeteer');
const { screenshot } = require('./config/default');

(async () => {
    const browser = await puppeter.launch();
    const page = await browser.newPage();
    await page.goto('https://www.baidu.com');
    await page.screenshot({
        path: `${screenshot}/${Date.now()}.png`
    });
    await browser.close();
})();