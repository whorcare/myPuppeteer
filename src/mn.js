const puppeter = require('puppeteer');
const { mn } = require('./config/default');
const srcToimg = require('./helper/srcToimg');

(async () => {
    const browser = await puppeter.launch();
    const page = await browser.newPage();
    await page.goto('https://image.baidu.com/');
    console.log('go to https://image.baidu.com/');

    await page.setViewport({ // 设置窗口宽度高度
        width: 1920,
        height: 1080
    });
    console.log('reset viewport');

    await page.focus('#kw');
    console.log('focus #kw');
    await page.keyboard.sendCharacter('狗');
    console.log('sendCharacter dog');
    await page.click('.s_search');
    console.log('go to search list');

    page.on('load', async () => { // 页面加载完成时
        console.log('page loading done, star fetch..');

        const srcs = await page.evaluate(() => {
            const images = document.querySelectorAll('img.main_img');
            return Array.prototype.map.call(images, img => img.src);
        });

        console.log(`get ${srcs.length} images, start`); // 获取的数量

        srcs.forEach(src => {
            srcToimg(src, mn);
        });

        await browser.close();
    })
})();