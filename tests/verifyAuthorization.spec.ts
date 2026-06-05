import { test, expect, Page } from "@/fixtures/baseFixture";
import { testData as data } from "@/testData/testData";
import { LoginPage } from "../pages/LoginPage";
import { MainPage } from "../pages/MainPage";

test.describe('authotization', () => {

    for(const elment of data.correctUserNames) {
        test(`verify authorization for user ${elment}`, async({ page }: { page: Page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.login(elment, data.pswrd);
    
            const mainPage = new MainPage(page);
            await expect(mainPage.header.title()).toHaveText(data.text);
        })
    }
    
    test('verify authorization for locked out user', async({ page }: {page: Page}) => {
        const loginPage = new LoginPage(page);
        loginPage.login(data.lockedOutUser, data.pswrd)
        await expect(loginPage.errorMessageLockedUser()).toHaveText(data.errorMessageLockedUser) 
    })

    test('verify log out', async ({ loggedIn, page}) => {
        await loggedIn.burgerMenu.openBurgerMemu();
        await loggedIn.burgerMenu.btnLogutClick();
        const loginPage = new LoginPage(page);

        await expect(loginPage.logo()).toBeVisible(); 
    })
    
})