import { Page } from '@/fixtures/baseFixture';

export class BurgerMenu {
    page;
    constructor (page : Page) {
        this.page = page;
    }

    // locators
    menuWraper = () => this.page.locator('.bm-menu-wrap');
    burgerMenuIconBurger = () => this.page.locator('#react-burger-menu-btn');
    burgerMenuIconClose = () => this.page.locator('[id *= " cross - btn"]');
    menuItems = () => this.page.locator('.bm-menu a');

    // actions
    async openBurgerMemu() {
        await this.burgerMenuIconBurger().click();
    }

    async closeBurgerMenu() {
        await this.burgerMenuIconClose().click();
    }

    async isMenuOpen() {
        const atribute = await this.menuWraper().getAttribute('aria-hidden');
        if (atribute == 'true'){
            return false;
        } else return true;
    }

}