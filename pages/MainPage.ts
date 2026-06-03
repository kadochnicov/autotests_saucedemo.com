import { Page } from "@playwright/test";

export class MainPage {
    constructor(public page: Page) {}

    title  = () => this.page.locator('.title');
}