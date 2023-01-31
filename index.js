const puppeteer = require('puppeteer-extra');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');

const { executablePath } = require('puppeteer')

// puppeteer.use(
//     RecaptchaPlugin({
//
//     })
// );
//
//
// provider: { id: '2captcha', token: '0dc13a497a3ee3852095213deb19437a' }

(async () => {
    const browser = await puppeteer.launch({ headless: false, executablePath: executablePath(), });

    let page = await browser.newPage();

    await page.goto('https://online.mfa.gov.ua/application');

    const searchResultSelector = "body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogActions-root.MuiDialogActions-spacing > button";
    await page.waitForSelector(searchResultSelector, {visible: true});
    await page.waitForTimeout(1000);
    await page.click(searchResultSelector);
    await page.waitForTimeout(1000);

    const input = await page.waitForSelector('#countries', {visible: true});
    await page.waitForTimeout(1000);
    await page.focus('#countries')
    await page.waitForTimeout(1000);
    const countries = await page.waitForSelector('#countries-option-50')
    await page.waitForTimeout(1000);
    console.log(countries, 'selector')
    await countries.tap();
    await page.waitForTimeout(1000);

    const iframePath = 'body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root > div > div > iframe'
    const iframe = await page.waitForSelector(iframePath);

    const bodyJsPath = 'body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root';

    const iframeBody = await page.waitForSelector(bodyJsPath);

    const rect = await page.evaluate((frame) => {
        const {top, left, bottom, right} = frame.getBoundingClientRect();
        return {top, left, bottom, right};
    }, iframeBody);
    console.log(rect, 'rect')
    console.log(iframe, 'iframe')
    const coOrdinates = await iframeBody.boundingBox()
    console.log(coOrdinates, 'coOrdinates boundingBox')

    await page.waitForTimeout(3000);

    try {
        let { captchas, error } = await page.findRecaptchas()
        if (captchas) {
            console.log(captchas, 'captchas')
            console.log(captchas[0]?.display, 'Display')

            const { solved, error } = await page.solveRecaptchas();
            if(solved) {
                console.log('✔️ The captcha has been solved');
            }
            if (error) {
                console.log(error, 'error')
            }
        } else {
            console.log('No captchas error', error, '=========')
        }
    } catch (error) {
        console.log(error, 'ERROR')
    }
    await page.waitForTimeout(3000);

    await page.focus('#consulates')
    await page.waitForTimeout(1000);
    const consulates = await page.waitForSelector('#consulates-option-3')
    await page.waitForTimeout(1000);
    await consulates.tap();
    await page.waitForTimeout(1000);

    await page.focus('#categories')
    await page.waitForTimeout(1000);
    const categories = await page.waitForSelector('#categories-option-0')
    await page.waitForTimeout(1000);
    await categories.tap();
    await page.waitForTimeout(1000);

    await page.focus('#services')
    await page.waitForTimeout(300);
    const services1 = await page.waitForSelector('#services-option-3');
    await page.waitForTimeout(300);
    await services1.tap();
    await page.waitForTimeout(300);

    const servicesInput = await page.waitForSelector('#services')
    await page.waitForTimeout(300);
    await servicesInput.tap();
    await page.waitForTimeout(300);
    const services2 = await page.waitForSelector('#services-option-2');
    await page.waitForTimeout(300);
    await services2.tap();
    await page.waitForTimeout(300);

    await servicesInput.tap();
    await page.waitForTimeout(300);
    const services3 = await page.waitForSelector('#services-option-3');
    await page.waitForTimeout(300);
    await services3.tap();
    await page.waitForTimeout(300);

    await servicesInput.tap();
    await page.waitForTimeout(300);
    const services4 = await page.waitForSelector('#services-option-2');
    await page.waitForTimeout(300);
    await services4.tap();
    await page.waitForTimeout(300);

    await servicesInput.tap();
    await page.waitForTimeout(300);
    const services5 = await page.waitForSelector('#services-option-3');
    await page.waitForTimeout(300);
    await services5.tap();
    await page.waitForTimeout(300);

    await servicesInput.tap();
    await page.waitForTimeout(300);
    const services6 = await page.waitForSelector('#services-option-2');
    await page.waitForTimeout(300);
    await services6.tap();
    await page.waitForTimeout(300);

    await servicesInput.tap();
    await page.waitForTimeout(300);
    const services = await page.waitForSelector('#services-option-3');
    await page.waitForTimeout(300);
    await page.setRequestInterception(true);
    page.on('request', request => {
        if (request.url() === 'https://online.mfa.gov.ua/api/v1/queue/consulates/81/schedule?date=2023-01-31&dateEnd=2023-01-31&serviceId=1495') {
            request.respond({
                content: 'application/json',
                headers: {"Access-Control-Allow-Origin": "*"},
                body: JSON.stringify([{"date":"2023-02-21","time":[{"to":"09:03","from":"08:54","serviceGroupId":7957,"userId":569}]},{"date":"2023-02-22","time":[{"to":"09:21","from":"09:12","serviceGroupId":7957,"userId":569},{"to":"14:45","from":"14:36","serviceGroupId":7957,"userId":569}]},{"date":"2023-02-20","time":[{"to":"15:03","from":"14:54","serviceGroupId":7957,"userId":569},{"to":"15:30","from":"15:21","serviceGroupId":7957,"userId":569},{"to":"15:48","from":"15:39","serviceGroupId":7957,"userId":569},{"to":"16:06","from":"15:57","serviceGroupId":7957,"userId":569},{"to":"16:15","from":"16:06","serviceGroupId":7957,"userId":569},{"to":"16:33","from":"16:24","serviceGroupId":7957,"userId":569},{"to":"16:42","from":"16:33","serviceGroupId":7957,"userId":569}]}])
            });
        }
        else {
            request.continue();
        }
    });
    await services.tap();
    await page.waitForTimeout(1000);


    const date = await page.waitForSelector('#root > main > div.jss47 > div > form > div.jss82 > div > input');
    await page.waitForTimeout(1000);
    await date.tap();

    const dates = await page.waitForSelector('#root > main > div.jss47 > div > form > div.jss82 > div > div > div > table > tbody > tr:nth-child(4) > td:nth-child(1)')
    await page.waitForTimeout(1000);
    await dates.tap();
    await page.waitForTimeout(1000);

    const time = await page.waitForSelector('#root > main > div.jss47 > div > form > div.MuiFormControl-root.jss84 > div > div > input')
    await page.waitForTimeout(300);
    await time.tap();
    await page.waitForTimeout(300);
    const times = await page.waitForSelector('body > div.MuiDialog-root > div.MuiDialog-container.MuiDialog-scrollPaper > div > div.MuiDialogContent-root.jss92 > button:nth-child(1)')
    await page.waitForTimeout(300);
    await times.tap();
    await page.waitForTimeout(1000);

    const nextButton = await page.waitForSelector('#root > main > div.jss47 > div > form > div.MuiBox-root.jss95.jss94 > button')
    await page.waitForTimeout(300);
    await nextButton.tap();

    await page.focus('#root > main > div.jss47 > div:nth-child(2) > form > div:nth-child(1) > div > div > input')
    await page.waitForTimeout(300);
    await page.keyboard.type('Єфімов', {delay: 300})
    await page.waitForTimeout(300);

    await page.focus('#root > main > div.jss47 > div:nth-child(2) > form > div:nth-child(2) > div > div > input')
    await page.waitForTimeout(1000);
    await page.keyboard.type('Дмитро', {delay: 300})
    await page.waitForTimeout(300);

    await page.focus('#root > main > div.jss47 > div:nth-child(2) > form > div:nth-child(3) > div > div > input')
    await page.waitForTimeout(1000);
    await page.keyboard.type('Валентинович', {delay: 300})
    await page.waitForTimeout(300);

    await page.focus('#root > main > div.jss47 > div:nth-child(2) > form > div.MuiFormControl-root.jss131 > div > div > input')
    await page.waitForTimeout(1000);
    await page.keyboard.type('954071641', {delay: 300})
    await page.waitForTimeout(300);

    await page.focus('#root > main > div.jss47 > div:nth-child(2) > form > div:nth-child(5) > div > div > input')
    await page.waitForTimeout(1000);
    await page.keyboard.type('valentine.efimov@gmail.com', {delay: 300})
    await page.waitForTimeout(300);

    await page.focus('#root > main > div.jss47 > div:nth-child(2) > form > div:nth-child(6) > div > div > input')
    await page.waitForTimeout(1000);
    await page.keyboard.type('valentine.efimov@gmail.com', {delay: 300})
    await page.waitForTimeout(300);

    const nextButton2 = await page.waitForSelector('#root > main > div.jss47 > div:nth-child(2) > form > div.MuiBox-root.jss141.jss94 > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-containedSizeLarge.MuiButton-sizeLarge')
    await page.waitForTimeout(300);
    await nextButton2.tap();

    const nextButton3 = await page.waitForSelector('#root > main > div.jss47 > div > div.MuiBox-root.jss149.jss94 > button.MuiButtonBase-root.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-containedSizeLarge.MuiButton-sizeLarge')
    await page.waitForTimeout(300);
    await nextButton3.tap();

    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'screenshot.png' })

})();