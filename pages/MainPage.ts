import { Page } from "@playwright/test";
import { BasePage } from "./components";

export class MainPage extends BasePage {
    constructor(page: Page) {
        super(page)
    }
    
    // locators
    title  = () => this.page.locator('.title');


    // actions


}