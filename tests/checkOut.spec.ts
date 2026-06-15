import { expect, test } from "@/fixtures/baseFixture";
import { BasketPage } from "@/pages/BasketPage";
import { CheckoutInfoPage } from "@/pages/CheckOutInfoPage";
import { ComplitePage } from "@/pages/ComplitePage";
import { OvetviewPage } from "@/pages/OverviewPage";
import { testData as data } from "@/testData/testData";

test.describe('verify product order', { tag: '@regresion' }, () => {

    test('verify screen on order finish page',
        { tag: ['@vizual', '@smole'] }, async ({ productInBasket, page }) => {
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

});

test.describe('verify information form', () => {

    test('if first name field is empty', async ({ productInBasket, page }) => {
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

});