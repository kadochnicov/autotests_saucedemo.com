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

}