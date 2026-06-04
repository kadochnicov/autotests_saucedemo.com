import { Page, expect } from '@/fixtures/baseFixture';

export class BurgerMenu {
    page;
    constructor (page : Page) {
        this.page = page;
    }

    // locators
    menuWraper = () => this.page.locator('.bm-menu-wrap');
    burgerMenuIconBurger = () => this.page.locator('#react-burger-menu-btn');
    burgerMenuIconClose = () => this.page.locator('#react-burger-cross-btn');
    menuItems = () => this.page.locator('.bm-menu a');

    // actions
    async openBurgerMemu() {
        await this.burgerMenuIconBurger().click();
        return this;
    }

    async closeBurgerMenu() {
        await this.burgerMenuIconClose().click();
        return this;
    }

    async isMenuOpen() {
        const hide = await this.menuWraper().getAttribute('aria-hidden');

        if (hide == 'false'){
            console.log('menu is open');
            return true;
        } else {
            console.log('menu is closed');
            return false;
        }
    }

}