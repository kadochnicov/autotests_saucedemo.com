import { expect, test } from "@/fixtures/baseFixture";
import { ProductPage } from "@/pages/ProductPage";
import { testData as data } from "@/testData/testData";

test.describe('product card', { tag: '@regression' }, () => {

    test('check count of cards', async ({ loggedIn: mainPage }) => {
        await expect(mainPage.productCards()).toHaveCount(6);
    });

    test('check cards content',  async ({ loggedIn }) => {
        let i: number = 0;
        for (const item of await loggedIn.productCards().all()) {
            await test.step(`card nubmber ${i + 1}: check label & price`, async () => {
                await expect.soft(await item.locator(loggedIn.label())).
                    toHaveText(data.productCards[i].label);
                await expect.soft(await item.locator(loggedIn.price())).
                    toHaveText(data.productCards[i].price);
            })
            i++;
        }
    });
})

test.describe('content on product page', { tag: '@regression' }, () => {

    for (const item of data.productCards) {
        test(`chek content on "${item.label}" page`, { tag: '@smoke' }, async ({ loggedIn, page }) => {
            await loggedIn.gotoProductPage(item.index);
            let productPage = new ProductPage(page);

            await expect.soft(productPage.label()).
                toHaveText(data.productCards[item.index].label);

            await expect.soft(productPage.price()).
                toHaveText(data.productCards[item.index].price);
        })
    }
})

test.describe('elements on product page', { tag: '@regression' }, () => {

    test('verify breadcrumbs button', async({ loggedIn, page }) => {
        let productPage = new ProductPage(page);
        await loggedIn.gotoProductPage(0);
        await productPage.bredcrumbsClick();

        await expect(loggedIn.header.title()).toHaveText(data.titltText)
    })

})

test.describe('verify filter on product page', { tag: ['@regression', '@filter'] }, () => {
   
    test('verify sort filter by price ascending', async({ loggedIn: mainPage }) => {
        await mainPage.SetAscPriceFilter();
        await expect(await mainPage.isArrAsc()).toBeTruthy();
    })

    test('verify sort filter by price descending', async({ loggedIn: mainPage }) => {
        await mainPage.SetDescPriceFilter();
        await expect(await mainPage.isArrDesc()).toBeTruthy();
    })
    
})