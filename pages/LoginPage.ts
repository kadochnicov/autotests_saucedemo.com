import { Page } from "@playwright/test";

export class LoginPage {
    constructor(public page: Page) { }

    // locators
    userName = () => this.page.locator('#user-name');
    password = () => this.page.locator('#password');
    btnLogin = () => this.page.locator('#login-button');
    mainPageTitle = () => this.page.locator('.title');
    errorMessageLockedUser = () => this.page.locator('[data-test="error"]');

    // actions
    async login(name: string, password: string) {
        await this.userName().fill(name);
        await this.password().fill(password);
        await this.btnLogin().click();
    }

}