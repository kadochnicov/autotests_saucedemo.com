import { expect, test } from "@/fixtures/baseFixture";
import { testData as data } from "@/testData/testData";

test.describe('verify product order', { tag: '@regression' }, () => {

    test.beforeEach(async({ page }) => {
        await page.goto(String(process.env.PRODUCT_URL));
    });

    test.afterEach(async ({ app }) => {
          await app.basketPage.RemoveFromBasket();
     });

    test('verify screen on order finish page',
        { tag: ['@ui', '@smoke'] }, async ({ productInBasket: app }) => {
            await app.mainPage.header.basketIconClick();
            await app.basketPage.Checkout();
            await app.checkoutInfoPage.fillData();
            await app.checkoutInfoPage.btnContinueClick();
            await app.overviewePage.clickFinish();

            await expect(app.complitePage.comlpleteContent()).toHaveScreenshot();
        });

    test('verify secces message on finish page',
        { tag: ['@content', '@regression'] }, async ({ productInBasket: app }) => {
            await app.mainPage.header.basketIconClick();
            await app.basketPage.Checkout();
            await app.checkoutInfoPage.fillData();
            await app.checkoutInfoPage.btnContinueClick();
            await app.overviewePage.clickFinish();

            await expect(app.complitePage.completeHeader()).
                toHaveText(data.completeContent.header);
            await expect(app.complitePage.completeText()).
                toHaveText(data.completeContent.text)
        });


});

test.describe('verify information form', () => {

    test.beforeEach(async({ page }) => {
        await page.goto(String(process.env.PRODUCT_URL));
    });

    test.afterEach(async ({ app }) => {
          await app.basketPage.RemoveFromBasket();
     });

    test('if name field is empty', async ({ productInBasket: app }) => {
        await app.mainPage.header.basketIconClick();
        await app.basketPage.Checkout();

        await app.checkoutInfoPage.fillLastName();
        await app.checkoutInfoPage.fillZipCode();
        await app.checkoutInfoPage.btnContinueClick();

        await expect(app.checkoutInfoPage.errorMessage()).
            toContainText(data.errorMessage.requerFirstName);
    });

    test('if last name field is empty', async ({ productInBasket: app }) => {
        await app.mainPage.header.basketIconClick();
        await app.basketPage.Checkout();

        await app.checkoutInfoPage.fillFirstJName();
        await app.checkoutInfoPage.fillZipCode();
        await app.checkoutInfoPage.btnContinueClick();

        await expect(app.checkoutInfoPage.errorMessage()).
            toContainText(data.errorMessage.requerLastName);
    });

    test('if post code field is empty', async ({ productInBasket: app }) => {
        await app.mainPage.header.basketIconClick();
        await app.basketPage.Checkout();

        await app.checkoutInfoPage.fillFirstJName();
        await app.checkoutInfoPage.fillLastName();
        await app.checkoutInfoPage.btnContinueClick();

        await expect(app.checkoutInfoPage.errorMessage()).
            toContainText(data.errorMessage.requerPostCode);
    });

});