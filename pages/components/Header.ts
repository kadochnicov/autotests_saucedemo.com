import { Page } from '@/fixtures/baseFixture'

export class Header {
    page;
    constructor(page : Page) {
        this.page = page;
    }

    // locators
    title = () => this.page.locator('.title');
    basketIcon = () => this.page.locator('[class *= "cart_link"]');

    // actions
    async basketIconClick() {
        await this.basketIcon().click();
    }

}