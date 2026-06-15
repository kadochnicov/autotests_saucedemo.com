import { Page } from "@/fixtures/baseFixture";
import { testData as data } from "@/testData/testData";

export class CheckoutInfoPage {
    page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    //locators
    firstName = () => this.page.locator('#first-name');
    lastName = () => this.page.locator('#last-name');
    zipCode = () => this.page.locator('#postal-code');
    btnContinue = () => this.page.locator('#continue');
    errorMessage = () => this.page.locator('[class *= "error-message"]');
     
    

    //actions
    async fillData() {
        await this.firstName().fill(data.fakerName);
        await this.lastName().fill(data.fakerLastname);
        await this.zipCode().fill(data.fakerIndex);

        return this;
    }

    async fillFirstJName() {
        await this.firstName().fill(data.fakerName);
        return this;
    }

    async fillLastName() {
        await this.lastName().fill(data.fakerLastname);
        return this;
    }

    async fillZipCode() {
        await this.zipCode().fill(data.fakerIndex);
        return this;
    }

    async btnContinueClick() {
        await this.btnContinue().click();
    }
}