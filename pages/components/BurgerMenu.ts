import { Page, expect } from '@/fixtures/baseFixture';
import { MainPage } from '../MainPage';
import { LoginPage } from '../LoginPage';

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
    btnLogOut = () => this.page.locator('[id *= "logout"]');

    // actions
    async openBurgerMemu() {
        await this.burgerMenuIconBurger().click();
        return this;
    }

    async closeBurgerMenu() {
        await this.burgerMenuIconClose().click();
        return new MainPage(this.page);
    }

    async btnLogutClick() {
        return this.btnLogOut().click();
        return new LoginPage(this.page);
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