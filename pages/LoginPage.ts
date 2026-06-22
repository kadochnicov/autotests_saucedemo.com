import { Page } from "@playwright/test";
import { MainPage } from "./MainPage";
import { testData as data } from "@/testData/testData";

export class LoginPage {
    constructor(public page: Page) { }

    // locators
    logo = () => this.page.locator('.login_logo');
    userName = () => this.page.locator('#user-name');
    password = () => this.page.locator('#password');
    btnLogin = () => this.page.locator('#login-button');
    mainPageTitle = () => this.page.locator('.title');
    errorMessage = () => this.page.locator('[data-test="error"]');

    // actions
    async login(name: string, password: string, url: string = String(process.env.BASE_URL)) {
        await this.page.goto(url);
        await this.userName().fill(name);
        await this.password().fill(password);
        await this.btnLogin().click();

        return new MainPage(this.page);
    }

    async userNameFill(name: string | null) {
        if(name){
          await this.userName().fill(name) ;
        } else {
            await this.userName().fill(data.fakerName);
        }
        return this;
    }

    async passwordFill() {
        await this.password().fill(data.pswrd)
        return this;
    }

    async btnLoginClick() {
        await this.btnLogin().click();
    }

}