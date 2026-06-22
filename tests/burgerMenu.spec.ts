import { test, expect } from "@/fixtures/baseFixture";
import { testData as data } from "@/testData/testData";

test.describe('verife burger menu', { tag: '@regression' }, () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(String(process.env.PRODUCT_URL));
    });

    test('verify burger menu open', async ({ app }) => {
        await app.mainPage.burgerMenu.openBurgerMemu();
        await expect(await app.mainPage.burgerMenu.isMenuOpen()).toBeTruthy();
    });

    test.skip('verify burger menu close', async ({ app }) => {
        await app.mainPage.burgerMenu.openBurgerMemu();
        await app.mainPage.burgerMenu.closeBurgerMenu();

        await expect(await app.mainPage.burgerMenu.isMenuOpen()).toBeFalsy();
    });

    test('verify menu items', { tag: '@smoke' }, async ({ app }) => {
        await app.mainPage.burgerMenu.openBurgerMemu();
        const listOfItems = await app.mainPage.burgerMenu.menuItems()
            .allTextContents();

        await expect(listOfItems).toEqual(data.menuItemList);
    });

    test('verify burger menu icon', { tag: '@ui' }, async ({ app }) => {
        await expect(app.mainPage.burgerMenu.burgerMenuIconBurger()).toHaveScreenshot();
    });
}) 