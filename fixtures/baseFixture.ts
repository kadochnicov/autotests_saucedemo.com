import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { testData as data } from '@/testData/testData';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { App } from '@/pages/App';
//import { UserOptions } from 'playwright.config';

type myFixtures = {
    loggedIn: MainPage,
    productInBasket: App,
    app: App,
}

type UserOptions = {
  username: string;
  password: string;
};

export const test = base.extend<myFixtures & UserOptions>({
// Опции из конфигурации
  username: ['', { option: true }],
  password: ['', { option: true }],

// расширяем базовую фикстуру
    page: async ({ page }, use) => {
        await page.goto(data.baseURL);
        await use(page);
    },


// добавляем собственную фикстуру которая будет логинить стандартного пользователя
    loggedIn: async ({ page, username, password }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(username, password);
        await use(new MainPage(page));
    },

// фикстура с объктами всех страниц
    app: async ({ page }, use) => {
        await use(new App(page))
    }, 


// фикстура если нужно начать тест с товаром в корзине
    productInBasket: async({ app, loggedIn }, use) => {
        const indx = 3;
        await loggedIn.putInBasket(indx);
        await use(app); 
    }

});

export { expect, Page };
     