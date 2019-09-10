const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.lightningmaps.org/?lang=pl#d=2;dl=2;dc=0;y=51.9984;x=35.376;z=4;o=0;b=0.00;t=3;');

    await page.waitFor(10000);

    const str_rate = await page.evaluate(() => {
      return document.getElementById('str_rate').innerHTML;
    });
    console.log(str_rate);

      if (str_rate > '0.0/min') {
      const d = new Date();
      const current_time = `${d.getFullYear()}_${d.getMonth()+1}_${d.getDate()}_${d.getHours()}_${d.getMinutes()}`
      await page.screenshot({path: `images/${current_time}.png`});
   
      } else { 
        await browser.close();
      }

    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();
