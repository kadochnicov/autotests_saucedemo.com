import { BurgerMenu } from "./BurgerMenu";
import { Page } from '@/fixtures/baseFixture';

export class BasePage {
    page;
    #burgerMenu: BurgerMenu | null = null;

     constructor (page : Page) {
            this.page = page;
        }

    get burgerMenu() {
        return this.#burgerMenu ??= new BurgerMenu(this.page);
    }
}