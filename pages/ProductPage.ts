import { Locator, Page } from "@playwright/test";
import { BasePage } from "./components";
import { MainPage } from "./MainPage";
import { BasketPage } from "./BasketPage";

export class ProductPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }
    
    // locators
    label = () => this.page.locator('[class *= "inventory_details_name"]');
    price = () => this.page.locator('[class *= "inventory_details_price"]');
    breadcrumbs = () => this.page.locator('[class *= "left"]');
    btnAddToBasket = () => this.page.locator('[id = "add-to-cart"]');

    // actions
    async bredcrumbsClick() {
        await this.breadcrumbs().click();
        return new MainPage(this.page);
    }

    async addToBasket() {
        await this.btnAddToBasket().click();
        return this;
    }
}