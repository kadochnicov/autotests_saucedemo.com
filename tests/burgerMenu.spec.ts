import { test, expect } from "@/fixtures/baseFixture";
import { testData as data } from "@/testData/testData";

test.describe('verife burger menu', { tag: '@regression' }, () => {

    // Here I use the 'loggedIn' fixture, which logs me into the website as a standard user.
    test('verify burger menu open', async ({ loggedIn }) => {
        await loggedIn.burgerMenu.openBurgerMemu();
        await expect(await loggedIn.burgerMenu.isMenuOpen()).toBeTruthy();
    })

    test.skip('verify burger menu close', async ({ loggedIn }) => {
        await loggedIn.burgerMenu.openBurgerMemu();
        await loggedIn.burgerMenu.closeBurgerMenu();

        await expect(await loggedIn.burgerMenu.isMenuOpen()).toBeFalsy();
    })

    test('verify menu items', { tag: '@smoke' }, async ({ loggedIn }) => {
        await loggedIn.burgerMenu.openBurgerMemu();
        const listOfItems = await loggedIn.burgerMenu.menuItems()
            .allTextContents();

        await expect(listOfItems).toEqual(data.menuItemList);
    })

    test('verify burger menu icon', { tag: '@vizual' },async({ loggedIn }) => {
        await expect(loggedIn.burgerMenu.burgerMenuIconBurger()).toHaveScreenshot();
    })
}) 