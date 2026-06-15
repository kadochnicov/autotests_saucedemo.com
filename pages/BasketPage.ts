import { Page } from "@/fixtures/baseFixture";

export class BasketPage {
    page;

    constructor(page: Page) {
        this.page = page;
    }

    // locators
    itemCards = () => this.page.locator('.cart_item');
    itemLabel = () => this.page.locator('[id *= "title_link"]');
    btnsRemove = () => this.page.locator('[id *= "remove"]');
    btnCheckout = () => this.page.locator('#checkout');

    // actions
    async RemoveFromBasket() {
        while ((await this.btnsRemove().all()).length > 0) {
            await this.btnsRemove().nth(0).click();
        }

        return this;
    }

    async Checkout() {
        await this.btnCheckout().click();
    }
}