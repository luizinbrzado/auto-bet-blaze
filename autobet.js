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
    options.addArguments("--headless");
    options.addArguments("--disable-gpu");
    options.addArguments("--no-sandbox");
    options.addArguments("--window-size=1920,1080")


    let driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .setChromeService(serviceBuilder)
        .build();

    await driver.manage().window().maximize();

    await driver.get("https://www.sinaisvips.com.br/sinais")
    await driver.manage().window().maximize()

    await driver.sleep(5000)

    await driver.findElement(webdriver.By.xpath('//*[@id="comp-l137vjdb"]/div')).click()

    await driver.sleep(5000)
    await driver.findElement(webdriver.By.xpath('//*[@id="comp-l0vc8flq"]/button/span')).click()


    await driver.sleep(10000)

    await driver.findElement(webdriver.By.xpath('//*[@id="input_comp-l0twycvn"]')).sendKeys(process.env.USER_SINAIS)
    await driver.findElement(webdriver.By.xpath('//*[@id="input_comp-l0twycw61"]')).sendKeys(process.env.PASS_SINAIS)
    await driver.findElement(webdriver.By.xpath('//*[@id="comp-l0twycwi"]/button')).click()

    await driver.sleep(5000)

    // await driver.takeScreenshot().then(
    //     function (image) {
    //         require('fs').writeFileSync('./img/initial-page.png', image, 'base64');
    //     }
    // );

    await driver.get("https://www.sinaisvips.com.br/sinaisdecrash2x-blaze")

    let horariosSite = await driver.findElement(webdriver.By.xpath('//*[@id="comp-l10j12x6"]')).getText();

    await driver.sleep(5000)

    let now = new Date();

    fs.writeFile(`${now.toLocaleDateString('pt-br', { timezone: 'America/Sao_Paulo' }).replace(/\//g, '_')}.json`,
        `[${horariosSite
            .replace(/ $/, '')
            .replace(/\s+/g, ' , ')
            .replace(/\s+/g, '"')
            .replace('', '"')
            .concat('"')}]`, () => {
            })

    await driver.get("https://blaze.com/pt/games/crash")

    await driver.sleep(10000)

    await driver.takeScreenshot().then(
        function (image) {
            require('fs').writeFileSync('./img/initial-page.png', image, 'base64');
        }
    );

    await driver.findElement(webdriver.By.xpath('//*[@id="header"]/div[2]/div/div[2]/div/div/div[1]/a')).click()
    await driver.sleep(5000)
    await driver.findElement(webdriver.By.xpath('//*[@id="auth-modal"]/div[2]/form/div[1]/div/input')).sendKeys(process.env.USER)
    await driver.findElement(webdriver.By.xpath('//*[@id="auth-modal"]/div[2]/form/div[2]/div/input')).sendKeys(process.env.PASS)
    await driver.findElement(webdriver.By.xpath('//*[@id="auth-modal"]/div[2]/form/div[4]/button')).click()

    await driver.sleep(5000)

    let lastId = '';

    let perdaGanho = 0;

    let gale = 0;

    let verifyNextResult = false;

    let indice = ''

    await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[2]/div[1]/input')).sendKeys(2);

    await driver.sleep(1000);

    await driver.takeScreenshot().then(
        function (image) {
            require('fs').writeFileSync('./img/initial-page.png', image, 'base64');
        }
    );

    let valorConta = await driver.findElement(webdriver.By.xpath('//*[@id="header"]/div[2]/div/div[2]/div/div[3]/div/a/div/div/div')).getText();

    console.log(valorConta);

    let horarios = []

    fs.readFile(`${now.toLocaleDateString('pt-br', { timezone: 'America/Sao_Paulo' }).replace(/\//g, '_')}.json`, 'utf8', (err, data) => {
        err ?
            console.error(err)
            :
            horarios = JSON.parse(data);
    });

    let valorAposta = 2;

    let buttonBet = '';

    now = new Date();

    horarios = horarios.filter((e) => {
        return e > now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5)
    })

    horarios.sort((a, b) => {
        return a.localeCompare(b)
    })

    await driver.sleep(2000)

    await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[1]/div/div[1]/input')).sendKeys(2)

    await driver.sleep(2000)

    console.log(horarios);

    let stopWin = 50;

    let stopLoss = -100;

    while (true) {

        if (now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5) > horarios[0])
            horarios.splice(0, 1)

        let lastResult;
        let actualId;

        await driver.sleep(500)

        now = new Date();        

        try {
            actualId = await driver.findElement(webdriver.By.xpath('//*[@id="crash-recent"]/div[2]/div[2]/span[1]')).getId()
        } catch (err) {
            console.log("Não deu pra pegar o ID da classe");
            actualId = await driver.findElement(webdriver.By.xpath('//*[@id="crash-recent"]/div[2]/div[2]/span[1]')).getId()
            return null;
        }

        await driver.sleep(500)

        try {
            lastResult = parseFloat((await driver.findElement(webdriver.By.xpath('//*[@id="crash-recent"]/div[2]/div[2]/span[1]')).getText()).slice(0, -1))
            buttonBet = await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[2]/button')).isEnabled()
        } catch (err) {
            lastResult = parseFloat((await driver.findElement(webdriver.By.xpath('//*[@id="crash-recent"]/div[2]/div[2]/span[1]')).getText()).slice(0, -1))
            console.log("Não deu pra pegar info do BOTÃO");
            return null;
        }

        if (actualId != lastId) {

            try {
                buttonBet = await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[2]/button')).isEnabled()
                if (lastResult === NaN) {
                    await driver.sleep(1000);
                    lastResult = parseFloat((await driver.findElement(webdriver.By.xpath('//*[@id="crash-recent"]/div[2]/div[2]/span[1]')).getText()).slice(0, -1))
                }
            } catch (err) {
                console.log("Não deu pra pegar info do BOTÃO");
                return null;
            }

            console.log("Próximo horário a apostar", horarios[0]);

            console.log(now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5), lastResult);

            if (verifyNextResult) {
                gale++;
                if (gale === 3) {
                    if (lastResult > 2)
                        console.log("WIN");
                    else {
                        perdaGanho -= valorAposta * 7;
                        console.log("LOSS G2");
                    }

                    verifyNextResult = false;
                    gale = 0;
                } else if (lastResult > 2) {

                    console.log("WIN");

                    console.log("Retirando", horarios[indice], indice);

                    horarios.splice(indice, 1);

                    verifyNextResult = false;

                    perdaGanho += valorAposta;

                    gale = 0;

                } else {

                    if (gale === 1)
                        console.log('LOSS SG');
                    else
                        console.log(`LOSS G1`);

                    await driver.sleep(6000)

                    if (!buttonBet) {

                        // Colocando valor da aposta G1 e G2 no input
                        await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[1]/div/div[1]/input')).sendKeys(webdriver.Key.CONTROL + "a")
                        await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[1]/div/div[1]/input')).sendKeys(valorAposta * 2 ** gale)

                        // Clicando para apostar
                        await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[2]/button')).click()

                        console.log(`Apostando G${gale}`, valorAposta * 2 ** gale);
                        console.log("Verificando próximo resultado...");

                    }
                }

            } else {

                await driver.sleep(6000)

                now = new Date();
                console.log(horarios.includes(now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5)));

                if (horarios.includes(now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5)) && parseInt(now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(6, 8)) < 30) {

                    indice = horarios.indexOf(now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5))

                    console.log("Retirando", horarios[indice], indice);

                    console.log(horarios);

                    horarios.splice(indice, 1);

                } else if (horarios.includes(now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5))) {

                    if (!buttonBet) {

                        // Colocando valor da aposta SG no input
                        await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[1]/div/div[1]/input')).sendKeys(webdriver.Key.CONTROL + "a")
                        await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[1]/div/div[1]/input')).sendKeys(valorAposta * 2 ** gale)

                        // Clicando para apostar
                        await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[2]/button')).click()

                        console.log("Apostando SG", valorAposta * 2 ** gale);
                        console.log("Verificando próximo resultado...");

                        verifyNextResult = true;

                        indice = horarios.indexOf(now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5))
                    }

                }
            }

            // console.log(now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5), lastResult);

            console.log("");

            lastId = actualId

            buttonBet = true;

            if (perdaGanho >= stopWin) {
                process.exit(0);
            } else if (perdaGanho <= stopLoss) {
                process.exit(0);
            }
        }
    }

})()
