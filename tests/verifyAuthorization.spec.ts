import { test, expect, Page } from "@/fixtures/baseFixture";
import { testData as data } from "@/testData/testData";

test.describe('authorization', { tag: ['@smoke', '@regrasion'] }, () => {

    test.beforeEach(async({ page }) => {
        await page.goto(String(process.env.BASE_URL));
    });

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

    test.beforeEach(async({ page }) => {
        await page.goto(String(process.env.PRODUCT_URL));
    });

    test('verify log out', async ({ app}) => {
        await app.mainPage.burgerMenu.openBurgerMemu();
        await app.mainPage.burgerMenu.btnLogutClick();
    
        await expect(app.loginPage.logo()).toBeVisible();
    })

})

test.describe('verify authorization form', { tag: '@regression' }, () => {
    
    test.beforeEach(async({ page }) => {
        await page.goto(String(process.env.BASE_URL));
    });
    
    test('authorization whith empty username field', async({ app }) => {
        await app.loginPage.passwordFill();
        await app.loginPage.btnLoginClick();

        await expect(app.loginPage.errorMessage()).
            toHaveText(data.errorMessage.requerUserName);
    })

    test('authorization whith empty password field', async({ app }) => {
        await app.loginPage.userNameFill(null);
        await app.loginPage.btnLoginClick();

        await expect(app.loginPage.errorMessage()).toHaveText(data.errorMessage.requerPswrd)
    })

    test('authorization whith empty useername & password fields', async({ app }) => {
        await app.loginPage.btnLoginClick();

        await expect(app.loginPage.errorMessage()).
            toHaveText(data.errorMessage.requerUserName)
    })

    test('authorization using wrong data', async({ app }) => {
        await app.loginPage.userNameFill('wrong_name');
        await app.loginPage.passwordFill();
        await app.loginPage.btnLoginClick();

        await expect(app.loginPage.errorMessage()).
            toHaveText(data.errorMessage.badData)
    })

})
