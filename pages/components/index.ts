import { Page } from '@/fixtures/baseFixture';
import { BurgerMenu } from "./BurgerMenu";
import { Header } from "./Header";

export class BasePage {
    page;
    #burgerMenu: BurgerMenu | null = null;
    #header: Header | null = null;

     constructor (page : Page) {
            this.page = page;
        }

    get burgerMenu() {
        return this.#burgerMenu ??= new BurgerMenu(this.page);
    }

    get header() {
        return this.#header ??= new Header(this.page);
    }
}