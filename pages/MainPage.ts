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
    btnAddToCard = () => this.page.locator('[id *= "add-to-cart"]');
    btnsRemove = () => this.page.locator('[id *= "remove"]');
    filter = () => this.page.locator('.product_sort_container')
    //locator prefix
    label = () => this.page.locator('[class *= "item_name"]');
    price = () => this.page.locator('[class *= "_price"]');


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
            console.log((await this.btnsRemove().all()).length);
            await this.btnsRemove().nth(0).click();
        }

        return this;
    }

    async SetAscPriceFilter() {
        await this.filter().selectOption('Price (low to high)');
    }

    async SetDescPriceFilter() {
        await this.filter().selectOption('Price (high to low)');
    }

    async getPriceArray() {
        let priceArray = await this.price().allInnerTexts();
        let compliteArray = priceArray.map((el) => parseFloat(el.replace(/[^0-9.]/g, '')))
        return compliteArray;
    }

    async isArrAsc() {
        const arr = await this.getPriceArray();
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[i - 1]) return false;
        }
        return true;
    }

    async isArrDesc() {
        const arr = await this.getPriceArray();
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > arr[i - 1]) return false;
        }
        return true;
    }

}