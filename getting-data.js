'use strict'

const chrome = require('selenium-webdriver/chrome');
let webdriver = require('selenium-webdriver');
let https = require("https");
const fs = require('fs');
require('dotenv/config');

console.log("Rodando web scraping");

(async function blazeBot() {

    let options = new chrome.Options();
    options.setChromeBinaryPath(process.env.CHROME_BINARY_PATH);
    let serviceBuilder = new chrome.ServiceBuilder(process.env.CHROME_DRIVER_PATH);

    //Don't forget to add these for heroku
    // options.addArguments("--headless");
    // options.addArguments("--disable-gpu");
    // options.addArguments("--no-sandbox");
    options.addArguments("--window-size=1920,1080")

    let driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .setChromeService(serviceBuilder)
        .build();

    let sinais = [];

    const now = new Date();

    https.get('https://webcrepe-mongodb.herokuapp.com/sinais', (resp) => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {

            for (let i = 0; i < JSON.parse(data).length; i++) {
                if (JSON.parse(data)[i].dia === now.toLocaleDateString('pt-br', { timezone: 'America/Sao_Paulo' })) {
                    console.log(JSON.parse(data)[i].sinais);
                    sinais = JSON.parse(data)[i]
                }
            }

        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

    await driver.get("https://www.sinaisvips.com.br/sinais")

    await driver.sleep(1000 * 5)

    if (sinais.sinais.length !== 0) {
        console.log("Já tem sinal do dia!");
        await driver.quit();
        process.exit(0)
    }

    await driver.manage().window().maximize()

    await driver.sleep(5000)

    await driver.takeScreenshot().then(
        function (image) {
            require('fs').writeFileSync('./img/initial-page.png', image, 'base64');
        }
    );

    await driver.findElement(webdriver.By.xpath('//*[@id="comp-l137vjdb"]/div')).click()
    await driver.sleep(5000)
    await driver.findElement(webdriver.By.xpath('//*[@id="comp-l0vc8flq"]/button/span')).click()

    await driver.sleep(5000)

    await driver.findElement(webdriver.By.xpath('//*[@id="input_comp-l0twycvn"]')).sendKeys('luiztrineves@gmail.com')
    await driver.findElement(webdriver.By.xpath('//*[@id="input_comp-l0twycw61"]')).sendKeys('@Bet15')
    await driver.findElement(webdriver.By.xpath('//*[@id="comp-l0twycwi"]/button')).click()

    await driver.sleep(5000)

    await driver.sleep(2000)
    await driver.findElement(webdriver.By.xpath('//*[@id="comp-l2mgh6qg"]/a')).click()

    // await driver.sleep(5000)

    // await driver.findElement(webdriver.By.xpath('//*[@id="input_comp-l0twycvn"]')).sendKeys('luiztrineves@gmail.com')
    // await driver.findElement(webdriver.By.xpath('//*[@id="input_comp-l0twycw61"]')).sendKeys('@Bet15')
    // await driver.findElement(webdriver.By.xpath('//*[@id="comp-l0twycwi"]/button')).click()

    await driver.sleep(5000)

    let horarios = []

    let testeData = await driver.findElement(webdriver.By.xpath('//*[@id="comp-l3v0r3fx"]/h3/span/span/span')).getText()


    const amanha = new Date();
    amanha.setHours(+24);

    let elAutoRetirar = await driver.findElement(webdriver.By.xpath(`/html/body/div/div/div[3]/div/main/div/div/div[2]/div/div/div/div[1]`));
    await driver.wait(webdriver.until.elementIsEnabled(elAutoRetirar), 10000).then(async () => {

        if (testeData.includes(amanha.toLocaleDateString('pt-br', { timezone: 'America/Sao_Paulo' })))
            for (let index = 5; index <= 38; index++) {
                let valor = await driver.findElement(webdriver.By.xpath(`/html/body/div/div/div[3]/div/main/div/div/div[2]/div/div/div/div[${index}]`)).getText()
                if (valor !== '')
                    horarios.push(`${(await driver.findElement(webdriver.By.xpath(`/html/body/div/div/div[3]/div/main/div/div/div[2]/div/div/div/div[${index}]`)).getText()).slice(0, 5)}`)
            }

    })


    console.log(horarios);

    // let now = new Date();

    // fs.writeFile(

    //     `${now.toLocaleDateString("pt-br", { timezone: "America/Sao_Paulo" }).replace(/\//g, "_")}.json`,

    //     JSON.stringify(horarios),

    //     function (err) {
    //         if (err) {
    //             console.error('Crap happens');
    //         }
    //     }
    // );

    const data = JSON.stringify({
        dia: now.toLocaleDateString('pt-br', { timezone: 'America/Sao_Paulo' }),
        sinais: horarios,
    })

    const optionsPost = {
        hostname: 'webcrepe-mongodb.herokuapp.com',
        path: '/sinais',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        },
    }

    const req = https.request(optionsPost, (res) => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', (d) => {
            process.stdout.write(d)
        })
    })

    req.on('error', (error) => {
        console.error(error)
    })

    req.write(data)
    req.end()

    await driver.sleep(5000)

    await driver.quit()

})()
