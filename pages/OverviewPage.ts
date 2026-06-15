import { Page } from "@/fixtures/baseFixture";

export class OvetviewPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    //locators
    btnFinish = () => this.page.locator('#finish');

    //actions
    async clickFinish() {
        await this.btnFinish().click();
    }
}