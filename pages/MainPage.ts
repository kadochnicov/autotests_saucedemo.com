import { Page } from "@playwright/test";
import { BasePage } from "./components";

export class MainPage extends BasePage {
    
    // locators
    title  = () => this.page.locator('.title');


    // actions
 

}