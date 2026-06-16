import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { testData as data } from '@/testData/testData';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { App } from '@/pages/App';

type myFixtures = {
    loggedIn: MainPage;
    productInBasket: App;
    app: App;
}

export const test = base.extend<myFixtures>({
// расширяем базовую фикстуру
    page: async ({ page }, use) => {
        await page.goto(data.baseURL);
        await use(page);
    },

// фикстура с объктами всех страниц
    app: async ({ page }, use) => {
        await use(new App(page))
    }, 

// добавляем собственную фикстуру которая будет логинить стандартного пользователя
    loggedIn: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(data.standartUserName, data.pswrd);
        await use(new MainPage(page));
    },

// фикстура если нужно начать тест с товаром в корзине
    productInBasket: async({ app, loggedIn }, use) => {
        const indx = 3;
        await loggedIn.putInBasket(indx);
        await use(app); 
    }

});

export { expect, Page };
     