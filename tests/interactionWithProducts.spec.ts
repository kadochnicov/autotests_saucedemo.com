import { expect, test } from "@/fixtures/baseFixture";
import { testData as data } from "@/testData/testData";

test.describe('product card', { tag: '@regression' }, () => {

    test.beforeEach(async({ page }) => {
        await page.goto(String(process.env.PRODUCT_URL));
    });

    test('check count of cards', async ({ app}) => {
        await expect(app.mainPage.productCards()).toHaveCount(6);
    });

    test('check cards content',  async ({ app }) => {
        let i: number = 0;
        for (const item of await app.mainPage.productCards().all()) {
            await test.step(`card nubmber ${i + 1}: check label & price`, async () => {
                await expect.soft(await item.locator(app.mainPage.label())).
                    toHaveText(data.productCards[i].label);
                await expect.soft(await item.locator(app.mainPage.price())).
                    toHaveText(data.productCards[i].price);
            })
            i++;
        }
    });
});

test.describe('content on product page', { tag: '@regression' }, () => {

    test.beforeEach(async({ page }) => {
        await page.goto(String(process.env.PRODUCT_URL));
    });

    for (const item of data.productCards) {
        test(`chek content on "${item.label}" page`, { tag: '@smoke' }, async ({ app}) => {
            await app.mainPage.gotoProductPage(item.index);

            await expect.soft(app.productPage.label()).
                toHaveText(data.productCards[item.index].label);

            await expect.soft(app.productPage.price()).
                toHaveText(data.productCards[item.index].price);
        })
    }
})

test.describe('elements on product page', { tag: '@regression' }, () => {

    test.beforeEach(async({ page }) => {
        await page.goto(String(process.env.PRODUCT_URL));
    });

    test('verify breadcrumbs button', async({ app }) => {
        await app.mainPage.gotoProductPage(0);
        await app.productPage.bredcrumbsClick();

        await expect(app.productPage.header.title()).toHaveText(data.titltText)
    })

})

test.describe('verify filter on product page', { tag: ['@regression', '@filter'] }, () => {

    test.beforeEach(async({ page }) => {
        await page.goto(String(process.env.PRODUCT_URL));
    });
   
    test('verify sort filter by price ascending', async({ app }) => {
        await app.mainPage.SetAscPriceFilter();
        await expect(await app.mainPage.isArrAsc()).toBeTruthy();
    })

    test('verify sort filter by price descending', async({ app }) => {
        await app.mainPage.SetDescPriceFilter();
        await expect(await app.mainPage.isArrDesc()).toBeTruthy();
    })
    
})