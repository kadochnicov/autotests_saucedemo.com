import type { Page } from '@/fixtures/baseFixture';
import { BasketPage } from './BasketPage';
import { CheckoutInfoPage } from './CheckOutInfoPage';
import { OvetviewPage } from './OverviewPage';
import { ComplitePage } from './ComplitePage';
import { MainPage } from './MainPage';
import { LoginPage } from './LoginPage';
import { ProductPage } from './ProductPage';


export class App {
    public page;
    #basketPage: BasketPage | null = null;
    #checkoutInfoPage: CheckoutInfoPage | null = null;
    #overviewerPage: OvetviewPage | null = null;
    #complitePage: ComplitePage | null = null;
    #mainPage: MainPage | null = null;
    #loginPage: LoginPage | null = null;
    #productPage: ProductPage | null = null;

    constructor(page: Page) {
        this.page = page;
    }

    get productPage() {
        return this.#productPage ??= new ProductPage(this.page);
    }

    get basketPage() {
        return this.#basketPage ??= new BasketPage(this.page);
    }

    get checkoutInfoPage() {
        return this.#checkoutInfoPage ??= new CheckoutInfoPage(this.page);
    }

    get overviewePage() {
        return this.#overviewerPage ??= new OvetviewPage(this.page);
    }

    get complitePage() {
        return this.#complitePage ??= new ComplitePage(this.page);
    }

    get mainPage() {
        return this.#mainPage ??= new MainPage(this.page);
    }

    get loginPage() {
        return this.#loginPage ??= new LoginPage(this.page);
    }
}