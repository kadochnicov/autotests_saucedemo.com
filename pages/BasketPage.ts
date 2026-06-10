import { Page } from "@/fixtures/baseFixture";

export class BasketPage {
page;

    constructor(page: Page){
        this.page = page;
    }

    // locators
    itemCards = () => this.page.locator('.cart_item');
    itemLabel = () => this.page.locator('[id *= "title_link"]');
    
    // actions
}