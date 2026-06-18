import { test, expect, Page } from "@/fixtures/baseFixture";
import { testData as data } from "@/testData/testData";
import { LoginPage } from "../pages/LoginPage";
import { MainPage } from "../pages/MainPage";

test.describe('authorization', { tag: ['@smoke', '@regrasion'] }, () => {

    for (const elment of data.correctUserNames) {
        test(`verify authorization for user ${elment}`, 
            { tag: '@critical' } , async ({ app }) => {
            await app.loginPage.login(elment, data.pswrd);

            await expect(app.mainPage.header.title()).toHaveText(data.titltText);
        })
    }

    test('verify authorization for locked out user', async ({ app }) => {
        await app.loginPage.login(data.lockedOutUser, data.pswrd)
        await expect(app.loginPage.errorMessage()).toHaveText(data.errorMessageLockedUser)
    })

    test('veify Enter key on authorization form', { tag: '@regression' }, async({ app, page}) => {
        await app.loginPage.userNameFill(data.standartUserName);
        await app.loginPage.passwordFill();
        await page.keyboard.press('Enter');
        
        await expect(app.mainPage.header.title()).toHaveText(data.titltText);
    })
    
})

test.describe('log out', { tag: '@smoke' } ,() => {

    test('verify log out', async ({ loggedIn, page }) => {
        await loggedIn.burgerMenu.openBurgerMemu();
        await loggedIn.burgerMenu.btnLogutClick();
        const loginPage = new LoginPage(page);
    
        await expect(loginPage.logo()).toBeVisible();
    })

})

test.describe('verify authorization form', { tag: '@regression' }, () => {
    
    test('authorization whith empty username field', async({ app }) => {
        await app.loginPage.passwordFill();
        await app.loginPage.btnLoginClick();

        await expect(app.loginPage.errorMessage()).
            toHaveText(data.errorMessage.requerUserName);
    })

    test('authorization whith empty password field', async({ app }) => {
        await app.loginPage.userNameFill();
        await app.loginPage.btnLoginClick();

        await expect(app.loginPage.errorMessage()).toHaveText(data.errorMessage.requerPswrd)
    })

    test('authorization whth empty useername & password fields', async({ app }) => {
        await app.loginPage.btnLoginClick();

        await expect(app.loginPage.errorMessage()).
            toHaveText(data.errorMessage.requerUserName)
    })

})
