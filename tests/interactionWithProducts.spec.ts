import { expect, test } from "@/fixtures/baseFixture";
import { ProductPage } from "@/pages/ProductPage";
import { testData as data } from "@/testData/testData";

test.describe('product card', () => {

    test('check count of cards', async ({ loggedIn }) => {
        await expect(loggedIn.productCards()).toHaveCount(6);
    });

    test('check cards content', async ({ loggedIn }) => {
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

test.describe('content on product page', () => {

    for (const item of data.productCards) {
        test(`chek content on "${item.label}" page`, async ({ loggedIn, page }) => {
            await loggedIn.gotoProductPage(item.index);
            let productPage = new ProductPage(page);

            await expect.soft(productPage.label()).
                toHaveText(data.productCards[item.index].label);

            await expect.soft(productPage.price()).
                toHaveText(data.productCards[item.index].price);
        })
    }
})

test.describe('elements on product page', () => {

    test('verify breadcrumbs button', async({ loggedIn, page }) => {
        let productPage = new ProductPage(page);
        await loggedIn.gotoProductPage(0);
        await productPage.bredcrumbsClick();

        await expect(loggedIn.header.title()).toHaveText(data.titltText)
    })

})