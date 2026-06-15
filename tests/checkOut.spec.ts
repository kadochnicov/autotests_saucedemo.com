import { expect, test } from "@/fixtures/baseFixture";
import { BasketPage } from "@/pages/BasketPage";
import { CheckoutInfoPage } from "@/pages/CheckOutInfoPage";
import { ComplitePage } from "@/pages/ComplitePage";
import { OvetviewPage } from "@/pages/OverviewPage";
import { testData as data } from "@/testData/testData";

test.describe('verify product order', { tag: '@regresion' }, () => {

    test('verify screen on order finish page',
        { tag: ['@vizual', '@smoke'] }, async ({ productInBasket, page }) => {
            const basketPage = await new BasketPage(page);
            const checkoutInfoPage = await new CheckoutInfoPage(page);
            const overviewPage = await new OvetviewPage(page);
            const complitePage = await new ComplitePage(page);

            await productInBasket.header.basketIconClick();
            await basketPage.Checkout();
            await checkoutInfoPage.fillData();
            await checkoutInfoPage.btnContinueClick();
            await overviewPage.clickFinish();

            await expect(complitePage.comlpleteContent()).toHaveScreenshot();
        })

    test('verify secces message on finish page',
        { tag: ['@content', '@regress'] }, async ({ productInBasket, page }) => {
            const basketPage = await new BasketPage(page);
            const checkoutInfoPage = await new CheckoutInfoPage(page);
            const overviewPage = await new OvetviewPage(page);
            const complitePage = await new ComplitePage(page);

            await productInBasket.header.basketIconClick();
            await basketPage.Checkout();
            await checkoutInfoPage.fillData();
            await checkoutInfoPage.btnContinueClick();
            await overviewPage.clickFinish();

            await expect(complitePage.completeHeader()).
                toHaveText(data.completeContent.header);
            await expect(complitePage.completeText()).
                toHaveText(data.completeContent.text)
        })


});

test.describe('verify information form', () => {

    test('if name field is empty', async ({ productInBasket, page }) => {
        const basketPage = await new BasketPage(page);
        const checkoutInfoPage = await new CheckoutInfoPage(page);
        const overviewPage = await new OvetviewPage(page);
        const complitePage = await new ComplitePage(page);

        await productInBasket.header.basketIconClick();
        await basketPage.Checkout();

        await checkoutInfoPage.fillLastName();
        await checkoutInfoPage.fillZipCode();
        await checkoutInfoPage.btnContinueClick();

        await expect(checkoutInfoPage.errorMessage()).
            toContainText(data.errorMessage.requerFirstName);
    })

    test('if last name field is empty', async ({ productInBasket, page }) => {
        const basketPage = await new BasketPage(page);
        const checkoutInfoPage = await new CheckoutInfoPage(page);
        const overviewPage = await new OvetviewPage(page);
        const complitePage = await new ComplitePage(page);

        await productInBasket.header.basketIconClick();
        await basketPage.Checkout();

        await checkoutInfoPage.fillFirstJName();
        await checkoutInfoPage.fillZipCode();
        await checkoutInfoPage.btnContinueClick();

        await expect(checkoutInfoPage.errorMessage()).
            toContainText(data.errorMessage.requerLastName);
    })

    test('if post code field is empty', async ({ productInBasket, page }) => {
        const basketPage = await new BasketPage(page);
        const checkoutInfoPage = await new CheckoutInfoPage(page);
        const overviewPage = await new OvetviewPage(page);
        const complitePage = await new ComplitePage(page);

        await productInBasket.header.basketIconClick();
        await basketPage.Checkout();

        await checkoutInfoPage.fillFirstJName();
        await checkoutInfoPage.fillLastName();
        await checkoutInfoPage.btnContinueClick();

        await expect(checkoutInfoPage.errorMessage()).
            toContainText(data.errorMessage.requerPostCode);
    })

});