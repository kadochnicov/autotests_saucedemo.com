import { test, expect, Page } from "@playwright/test";
import { testData as data } from "./testData/testData";
import { LoginPage } from "../pages/LoginPage";
import { MainPage } from "../pages/MaimPage";

test.describe('my tests', () => {

    for(const elment of data.userNameCorrect) {
        test.beforeEach(async({ page }: {page: Page}) => {
            await page.goto('https://www.saucedemo.com/');
        })

        test(`verify login for user ${elment}`, async({ page }: { page: Page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.login(elment, data.pswrd);
    
            const mainPage = new MainPage(page);
            await expect(mainPage.title()).toHaveText(data.text);
        })
    }
    
    test('verify login for locked out user', async({ page }: {page: Page}) => {
        await page.goto('https://www.saucedemo.com/');

        const loginPage = new LoginPage(page);
        loginPage.login(data.lockedOutUser, data.pswrd)
        await expect(loginPage.errorMessageLockedUser()).toHaveText(data.errorMessageLockedUser) 
    })

})