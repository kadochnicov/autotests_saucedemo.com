import { test, expect } from "@/fixtures/baseFixture";
import { testData as data } from "@/testData/testData";


test.describe.serial('put product in basket', { tag: '@regression' }, () => {

     test.beforeEach(async ({ page }) => {
          await page.goto(String(process.env.PRODUCT_URL)); 
     });

     test.afterEach(async ({ app }) => {
          await app.basketPage.RemoveFromBasket();
     });

    test('put product in basket from main page', { tag: '@smoke' }, async ({ app }) => {
        const itemIndex = 0;

        await app.mainPage.putInBasket(itemIndex);
        await app.mainPage.header.basketIconClick();

        await expect(app.basketPage.itemCards().nth(0).
            locator(app.basketPage.itemLabel())).
            toHaveText(data.productCards[itemIndex].label);
    });

    test('put product in basket from product page', async ({ app }) => {
        const itemIndex = 0;

        await app.mainPage.gotoProductPage(itemIndex);
        await app.productPage.addToBasket();
        await app.productPage.header.basketIconClick();

        await expect(app.basketPage.itemCards().nth(0).
            locator(app.basketPage.itemLabel())).
            toHaveText(data.productCards[itemIndex].label)
    });

})

// test.describe('cancel product in basket', { tag: '@regresion' } ,() => {

//     test('cancel product from main page', { tag: '@smoke' }, async ({ productInBasket: app }) => {
//         await app.mainPage.btnRemoveClick();

//         for (const elenent of await app.mainPage.btnsRemove().all()) {
//             await expect.soft(await elenent).not.toBeVisible();
//         }
//     })

//     test('cancel product from basket', async ({ productInBasket: app }) => {
//         await app.mainPage.header.basketIconClick();
//         await app.basketPage.RemoveFromBasket();

//         for (const elenent of await app.basketPage.btnsRemove().all()) {
//             await expect.soft(await elenent).not.toBeVisible();
//         }
//     })

// })

// test.describe('verify vizyal part of basket', { tag: '@vizusl' }, () => {
    
//     test('verify basket icon', async({ loggedIn }) => {
//         await expect(loggedIn.header.basketIcon()).toHaveScreenshot();
//     })

// })
