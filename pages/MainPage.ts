import { Locator, Page } from "@playwright/test";
import { ProductPage } from '@/pages/ProductPage'
import { BasePage } from "./components";
import { BasketPage } from "./BasketPage";

export class MainPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    // locators
    productCards = () => this.page.locator('.inventory_item');
    //locator prefix
    label = () => this.page.locator('[class *= "item_name"]');
    price = () => this.page.locator('[class *= "_price"]');
    btnAddToCard = () => this.page.locator('[id *= "add-to-cart"]');
    btnsRemove = () => this.page.locator('[id *= "remove"]');

    // actions
    async gotoProductPage(indx: number) {
        await this.productCards().nth(indx).
            locator(this.label()).click();

        return new ProductPage(this.page);
    }

    async putInBasket(index: number) {
        await this.productCards().nth(index).
            locator(this.btnAddToCard()).click();

        return new BasketPage(this.page);
    }

    async btnRemoveClick() {
        while ((await this.btnsRemove().all()).length > 0) {
            console.log( (await this.btnsRemove().all()).length );
            await this.btnsRemove().nth(0).click();
        }

        return this;
    }

}