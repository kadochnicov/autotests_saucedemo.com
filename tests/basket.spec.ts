import { test, expect } from "@/fixtures/baseFixture";
import { BasketPage } from "@/pages/BasketPage";
import { ProductPage } from "@/pages/ProductPage";
import { testData as data } from "@/testData/testData";

test.describe('put product in basket', { tag: '@regression' }, () => {

    test('put product in basket from main page', { tag: '@smoke' }, async ({ loggedIn, page }) => {
        const itemIndex = 0;
        const basketPage = new BasketPage(page);

        loggedIn.putInBasket(itemIndex);
        loggedIn.header.basketIconClick();

        await expect(basketPage.itemCards().nth(itemIndex).
            locator(basketPage.itemLabel())).
            toHaveText(data.productCards[itemIndex].label)
    })

    test('put product in basket from product page', async ({ loggedIn, page }) => {
        const itemIndex = 0;
        const basketPage = new BasketPage(page);
        const productPage = new ProductPage(page);

        loggedIn.gotoProductPage(itemIndex);
        productPage.addToBasket();
        loggedIn.header.basketIconClick();

        await expect(basketPage.itemCards().nth(itemIndex).
            locator(basketPage.itemLabel())).
            toHaveText(data.productCards[itemIndex].label)
    })

})

test.describe('cancel product in basket', { tag: '@regresion' } ,() => {

    test('cancel product from main page', { tag: '@smoke' }, async ({ productInBasket: app }) => {
        await app.mainPage.btnRemoveClick();

        for (const elenent of await app.mainPage.btnsRemove().all()) {
            await expect.soft(await elenent).not.toBeVisible();
        }
    })

    test('cancel product from basket', async ({ productInBasket: app }) => {
        await app.mainPage.header.basketIconClick();
        await app.basketPage.RemoveFromBasket();

        for (const elenent of await app.basketPage.btnsRemove().all()) {
            await expect.soft(await elenent).not.toBeVisible();
        }
    })

})

test.describe('verify vizyal part of basket', { tag: '@vizusl' }, () => {
    
    test('verify basket icon', async({ loggedIn }) => {
        await expect(loggedIn.header.basketIcon()).toHaveScreenshot();
    })

})
