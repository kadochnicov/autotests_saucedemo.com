import { Page } from "@/fixtures/baseFixture";

export class ComplitePage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    // locators
    comlpleteContent = () => this.page.locator('#checkout_complete_container');

    // actions
}