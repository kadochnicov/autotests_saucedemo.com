import { Page } from '@/fixtures/baseFixture'

export class Header {
    page;
    constructor(page : Page) {
        this.page = page;
    }

    // locators
    title = () => this.page.locator('.title');
    // actions
}