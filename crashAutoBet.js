const chrome = require('selenium-webdriver/chrome');
let webdriver = require('selenium-webdriver');
let https = require("https");
const fs = require('fs');
const { By } = require('selenium-webdriver');
const { until } = require('selenium-webdriver');
require('dotenv/config');

console.log("Rodando web scraping");

var reset = "\u001B[0m";
var black = "\u001B[30m";
var red = "\u001B[31m";
var green = "\u001B[32m";
var light_yellow = "\u001B[93m";
var yellow = "\u001B[33m";
var blue = "\u001B[34m";
var purple = "\u001B[35m";
var cyan = "\u001B[36m";
var white = "\u001B[37m";
var bold = "\u001B[1m";
var unbold = "\u001B[21m";
var underline = "\u001B[4m";
var stop_underline = "\u001B[24m";
var blink = "\u001B[5m";
var backgroundBlack = '\u001b[40m'
var backgroundRed = '\u001b[41m'
var backgroundGreen = '\u001b[42m'
var backgroundYellow = '\u001b[43m'
var backgroundBlue = '\u001b[44m'
var backgroundMagenta = '\u001b[45m'
var backgroundCyan = '\u001b[46m'
var backgroundWhite = '\u001b[47m';

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

    let now = new Date();

    // async function getHorarios() {

    //     await driver.get("https://www.sinaisvips.com.br/sinais")
    //     await driver.manage().window().maximize()

    //     await driver.sleep(5000)

    //     // await driver.takeScreenshot().then(
    //     //     function (image) {
    //     //         require('fs').writeFileSync('./img/initial-page.png', image, 'base64');
    //     //     }
    //     // );

    //     await driver.findElement(webdriver.By.xpath('//*[@id="comp-l137vjdb"]/div')).click()
    //     await driver.sleep(5000)
    //     await driver.findElement(webdriver.By.xpath('//*[@id="comp-l0vc8flq"]/button/span')).click()

    //     await driver.sleep(5000)

    //     await driver.findElement(webdriver.By.xpath('//*[@id="input_comp-l0twycvn"]')).sendKeys(process.env.USER_SINAIS)
    //     await driver.findElement(webdriver.By.xpath('//*[@id="input_comp-l0twycw61"]')).sendKeys(process.env.PASS_SINAIS)
    //     await driver.findElement(webdriver.By.xpath('//*[@id="comp-l0twycwi"]/button')).click()

    //     await driver.sleep(5000)

    //     await driver.sleep(2000)
    //     await driver.get("https://www.sinaisvips.com.br/sinais")
    //     // await driver.findElement(webdriver.By.xpath('//*[@id="comp-l2mgh6qg"]/a')).click()

    //     // await driver.sleep(5000)

    //     // await driver.findElement(webdriver.By.xpath('//*[@id="input_comp-l0twycvn"]')).sendKeys('luiztrineves@gmail.com')
    //     // await driver.findElement(webdriver.By.xpath('//*[@id="input_comp-l0twycw61"]')).sendKeys('@Bet15')
    //     // await driver.findElement(webdriver.By.xpath('//*[@id="comp-l0twycwi"]/button')).click()

    //     await driver.sleep(5000)

    //     let horarios = [];

    //     console.log(await driver.findElement(webdriver.By.xpath('/html')).getText());

    //     let testeData = await driver.findElement(webdriver.By.xpath('//*[@id="comp-l3v0r3fx"]/h3/span/span/span')).getText();

    //     let naoAtualizou = false;

    //     const amanha = new Date();
    //     amanha.setHours(+24);

    //     if (testeData.includes(amanha.toLocaleDateString('pt-br', { timezone: 'America/Sao_Paulo' }))) {
    //         for (let index = 5; index <= 35; index++) {
    //             let valor = await driver.findElement(webdriver.By.xpath(`/html/body/div/div/div[3]/div/main/div/div/div[2]/div/div/div/div[${index}]`)).getText()
    //             if (valor !== '')
    //                 horarios.push(`${(await driver.findElement(webdriver.By.xpath(`/html/body/div/div/div[3]/div/main/div/div/div[2]/div/div/div/div[${index}]`)).getText()).slice(0, 5)}`)
    //         }

    //     }

    //     else {
    //         naoAtualizou = true;

    //         while (naoAtualizou) {
    //             console.log("N??O ATUALIZOU!");
    //             testeData = await driver.findElement(webdriver.By.xpath('//*[@id="comp-l3v0r3fx"]/h3/span/span/span')).getText();

    //             if (testeData.includes(amanha.toLocaleDateString('pt-br', { timezone: 'America/Sao_Paulo' }))) {
    //                 for (let index = 5; index <= 35; index++) {
    //                     let valor = await driver.findElement(webdriver.By.xpath(`/html/body/div/div/div[3]/div/main/div/div/div[2]/div/div/div/div[${index}]`)).getText()
    //                     if (valor !== '')
    //                         horarios.push(`${(await driver.findElement(webdriver.By.xpath(`/html/body/div/div/div[3]/div/main/div/div/div[2]/div/div/div/div[${index}]`)).getText()).slice(0, 5)}`)
    //                 }
    //                 break;
    //             }

    //             await driver.sleep(1000 * 60 * 30)
    //         }

    //     }

    //     console.log(horarios);

    //     // let now = new Date();

    //     // fs.writeFile(

    //     //     `${now.toLocaleDateString("pt-br", { timezone: "America/Sao_Paulo" }).replace(/\//g, "_")}.json`,

    //     //     JSON.stringify(horarios),

    //     //     function (err) {
    //     //         if (err) {
    //     //             console.error('Crap happens');
    //     //         }
    //     //     }
    //     // );

    //     if (horarios.length) {
    //         const data = JSON.stringify({
    //             sinais: horarios,
    //         })

    //         const optionsPost = {
    //             hostname: 'webcrepe-mongodb.herokuapp.com',
    //             path: '/sinais',
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Content-Length': data.length,
    //             },
    //         }

    //         const req = https.request(optionsPost, (res) => {
    //             console.log(`statusCode: ${res.statusCode}`)

    //             res.on('data', (d) => {
    //                 process.stdout.write(d)
    //             })
    //         })

    //         req.on('error', (error) => {
    //             console.error(error)
    //         })

    //         req.write(data)
    //         req.end()

    //         let now = new Date();

    //     }
    // }

    var sinais = []

    while (sinais.length === 0) {
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

        await driver.sleep(1000 * 10) // 10 segundos

        if (sinais.length === 0) {
            console.log('Tentando encontrar novos sinais daqui 30 minutos');
            await driver.sleep(1000 * 60 * 30) // 30 minutos
        }
    }

    await driver.get("https://blaze.com/pt/games/crash")

    await driver.sleep(10000)

    console.log(sinais.sinais);

    // await driver.takeScreenshot().then(
    //     function (image) {
    //         require('fs').writeFileSync('./img/initial-page.png', image, 'base64');
    //     }
    // );

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

    let horarioPraRetirar = ''

    let elAutoRetirar = await driver.findElement(By.xpath(`//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[2]/div[1]/input`));
    await driver.wait(until.elementIsEnabled(elAutoRetirar), 10000).then(async () => {
        await driver.findElement(By.xpath(`//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[2]/div[1]/input`)).sendKeys(2)
    })

    await driver.sleep(1000);

    // await driver.takeScreenshot().then(
    //     function (image) {
    //         require('fs').writeFileSync('./img/initial-page.png', image, 'base64');
    //     }
    // );

    let valorConta = await driver.findElement(webdriver.By.xpath('//*[@id="header"]/div[2]/div/div[2]/div/div[3]/div/a/div/div/div')).getText();

    console.log(valorConta);

    let horariosCrash = sinais.sinais;

    let valorAposta = 5;

    let buttonBet = '';

    horariosCrash = horariosCrash.filter((e) => {
        return e > now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5)
    })

    horariosCrash.sort((a, b) => {
        return a.localeCompare(b)
    })

    await driver.sleep(2000)

    await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[1]/div/div[1]/input')).sendKeys(2)

    await driver.sleep(2000)

    console.log(horariosCrash);

    const stopWin = 1000, stopLoss = -100;

    let placarWin = 0, placarLoss = 0;

    console.log(`\n${bold} Saldo atual: ${purple}${valorConta} ${reset}
${bold} Stake: ${valorAposta} ${reset}
${bold} StopWin: ${green}${stopWin} ${reset}
${bold} StopLoss: ${red}${stopLoss} ${reset}\n`
    );

    while (true) {

        let lastResult;
        let actualId;

        if (horariosCrash[0] === undefined) {
            console.log(
                `${yellow}Sinais acabaram, vamos apostar mais amanh??!
Placar final: ${blue + bold}${placarWin} x ${placarLoss}${reset}
${yellow}${perdaGanho > 0 ? `Parab??ns, voc?? ganhou ${green + bold}R$${perdaGanho}` : `Infelizmente voc?? perdeu ${red + bold}R$${perdaGanho * -1}`}${reset}`
            );

            process.exit(0);
        }

        await driver.sleep(500)

        now = new Date();

        try {
            actualId = await driver.findElement(webdriver.By.xpath('//*[@id="crash-recent"]/div[2]/div[2]/span[1]')).getId()
        } catch (err) {
            console.log("N??o deu pra pegar o ID da classe");
            actualId = await driver.findElement(webdriver.By.xpath('//*[@id="crash-recent"]/div[2]/div[2]/span[1]')).getId()
            return null;
        }

        await driver.sleep(500)

        try {
            lastResult = parseFloat((await driver.findElement(webdriver.By.xpath('//*[@id="crash-recent"]/div[2]/div[2]/span[1]')).getText()).slice(0, -1))
            buttonBet = await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[2]/button')).isEnabled()
        } catch (err) {
            lastResult = parseFloat((await driver.findElement(webdriver.By.xpath('//*[@id="crash-recent"]/div[2]/div[2]/span[1]')).getText()).slice(0, -1))
            console.log("N??o deu pra pegar info do BOT??O");
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
                console.log("N??o deu pra pegar info do BOT??O");
                return null;
            }


            console.log(now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5), lastResult);

            if (verifyNextResult) {
                gale++;
                if (gale === 3) {
                    if (lastResult > 2) {
                        perdaGanho += valorAposta;
                        console.log(`${backgroundGreen + bold} WIN ${reset} `);
                        placarWin++;
                    }
                    else {
                        perdaGanho -= valorAposta * 7;
                        console.log(gale);
                        console.log(`${backgroundRed + bold} LOSS ${(gale === 1 && 'SG') || (gale === 2 && 'G1') || (gale === 3 && 'G2')} ${reset} `);
                        placarLoss++;
                    }


                    valorConta = await driver.findElement(webdriver.By.xpath('//*[@id="header"]/div[2]/div/div[2]/div/div[3]/div/a/div/div/div')).getText();

                    console.log("Retirando", horarioPraRetirar);

                    horariosCrash = horariosCrash.filter((e, i) => {
                        return e !== horarioPraRetirar
                    })

                    if (horariosCrash.length !== 0) {
                        console.log(`\n${bold + yellow} Pr??ximo hor??rio a apostar ser?? ??s ${horariosCrash[0]} ${reset}`);
                        console.log(`${backgroundMagenta + bold + yellow} Faltam ${horariosCrash.length} sinais${reset}\n`);
                    }

                    console.log(`${bold} Saldo: ${valorConta} \n${reset + bold} Placar: ${placarWin} x ${placarLoss}${reset} `);

                    verifyNextResult = false;

                    gale = 0;
                } else if (lastResult > 2) {

                    placarWin++;

                    console.log(`${backgroundGreen + bold} WIN ${reset} `);

                    console.log("Retirando", horarioPraRetirar);
                    horariosCrash = horariosCrash.filter((e, i) => {
                        return e !== horarioPraRetirar
                    })

                    if (horariosCrash.length !== 0) {
                        console.log(`\n${bold + yellow} Pr??ximo hor??rio a apostar ser?? ??s ${horariosCrash[0]} ${reset}`);
                        console.log(`${backgroundMagenta + bold + yellow}Faltam ${horariosCrash.length} sinais${reset}\n`);
                    }

                    verifyNextResult = false;

                    perdaGanho += valorAposta;

                    valorConta = await driver.findElement(webdriver.By.xpath('//*[@id="header"]/div[2]/div/div[2]/div/div[3]/div/a/div/div/div')).getText();

                    console.log(`${bold} Saldo: ${valorConta} \n${reset + bold} Placar: ${placarWin} x ${placarLoss}${reset} `);

                    gale = 0;

                } else {

                    console.log(`${backgroundRed + bold} LOSS ${(gale === 1 && 'SG') || (gale === 2 && 'G1') || (gale === 3 && 'G2')} ${reset} `);

                    await driver.sleep(2000)

                    let el = await driver.findElement(By.xpath(`//*[@id="crash-controller"]/div[1]/div[2]/div[2]/button`));
                    await driver.wait(until.elementIsEnabled(el), 10000).then(async () => {
                        // Colocando valor da aposta G1 e G2 no input
                        await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[1]/div/div[1]/input')).sendKeys(webdriver.Key.CONTROL + "a")
                        await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[1]/div/div[1]/input')).sendKeys(valorAposta * 2 ** gale)

                        // Clicando para apostar
                        await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[2]/button')).click()

                        console.log(`${bold}Apostando G${gale} - ${green}R$${valorAposta * 2 ** gale}${reset}`);
                        console.log(`${yellow}Verificando pr??ximo resultado...${reset}`, gale !== 0 ? (gale === 1 && '??') : (gale === 2 && '??'));
                    });
                }

            } else {

                await driver.sleep(2000)

                now = new Date();

                if (horariosCrash.includes(now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5))) {

                    let el = await driver.findElement(By.xpath(`//*[@id="crash-controller"]/div[1]/div[2]/div[2]/button`));
                    await driver.wait(until.elementIsEnabled(el), 10000).then(async () => {

                        // Colocando valor da aposta SG no input
                        await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[1]/div/div[1]/input')).sendKeys(webdriver.Key.CONTROL + "a")
                        await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[1]/div[1]/div/div[1]/input')).sendKeys(valorAposta * 2 ** gale)

                        // Clicando para apostar
                        await driver.findElement(webdriver.By.xpath('//*[@id="crash-controller"]/div[1]/div[2]/div[2]/button')).click()

                        console.log(`${bold}Apostando SG - ${green}R$${valorAposta * 2 ** gale}${reset}`);
                        console.log("Verificando pr??ximo resultado...");

                        verifyNextResult = true;

                        horarioPraRetirar = now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5);
                    });

                }
            }

            // console.log(now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5), lastResult);

            console.log(`${bold + blue}${perdaGanho}${reset}`);

            console.log("");

            lastId = actualId

            buttonBet = true;

            if (perdaGanho >= stopWin) {
                console.log(`${backgroundMagenta + bold} Placar: ${placarWin} x ${placarLoss} ${reset}`);
                process.exit(0);
            } else if (perdaGanho <= stopLoss) {
                console.log(`${backgroundMagenta + bold} Placar: ${placarWin} x ${placarLoss} ${reset}`);
                process.exit(0);
            }

            if (now.toLocaleTimeString('pt-br', { timezone: 'America/Sao_Paulo' }).slice(0, 5) > horariosCrash[0])
                horariosCrash.splice(0, 1)
        }
    }

})()
