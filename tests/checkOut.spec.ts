import { expect, test } from "@/fixtures/baseFixture";
import { BasketPage } from "@/pages/BasketPage";
import { CheckoutInfoPage } from "@/pages/CheckOutInfoPage";
import { ComplitePage } from "@/pages/ComplitePage";
import { OvetviewPage } from "@/pages/OverviewPage";
import { testData as data } from "@/testData/testData";
import { App } from '@/pages/App';

test.describe('verify product order', { tag: '@regression' }, () => {

    test('verify screen on order finish page',
        { tag: ['@vizual', '@smoke'] }, async ({ productInBasket: app }) => {
            await app.mainPage.header.basketIconClick();
            await app.basketPage.Checkout();
            await app.checkoutInfoPage.fillData();
            await app.checkoutInfoPage.btnContinueClick();
            await app.overviewePage.clickFinish();

            await expect(app.complitePage.comlpleteContent()).toHaveScreenshot();
        })

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
        })


});

test.describe('verify information form', () => {

    test('if name field is empty', async ({ productInBasket: app }) => {
        await app.mainPage.header.basketIconClick();
        await app.basketPage.Checkout();

        await app.checkoutInfoPage.fillLastName();
        await app.checkoutInfoPage.fillZipCode();
        await app.checkoutInfoPage.btnContinueClick();

        await expect(app.checkoutInfoPage.errorMessage()).
            toContainText(data.errorMessage.requerFirstName);
    })

    test('if last name field is empty', async ({ productInBasket: app }) => {
        await app.mainPage.header.basketIconClick();
        await app.basketPage.Checkout();

        await app.checkoutInfoPage.fillFirstJName();
        await app.checkoutInfoPage.fillZipCode();
        await app.checkoutInfoPage.btnContinueClick();

        await expect(app.checkoutInfoPage.errorMessage()).
            toContainText(data.errorMessage.requerLastName);
    })

    test('if post code field is empty', async ({ productInBasket: app }) => {
        await app.mainPage.header.basketIconClick();
        await app.basketPage.Checkout();

        await app.checkoutInfoPage.fillFirstJName();
        await app.checkoutInfoPage.fillLastName();
        await app.checkoutInfoPage.btnContinueClick();

        await expect(app.checkoutInfoPage.errorMessage()).
            toContainText(data.errorMessage.requerPostCode);
    })

});