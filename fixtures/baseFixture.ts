import { test as base, expect, Page } from '@playwright/test';
import { testData as data } from '@/testData/testData';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';

type myFixtures = {
    loggedIn: MainPage;
    productInBasket: MainPage;
}

export const test = base.extend<myFixtures>({
// расширяем базовую фикстуру
    page: async ({ page }, use) => {
        await page.goto(data.baseURL);
        await use(page);
    },

// добавляем собственную фикстуру которая будет логинить стандартного пользователя
    loggedIn: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.login(data.standartUserName, data.pswrd);
        
// в тесте переменная logined будет равна объекту new LoginPage
        await use(new MainPage(page));
    },

// фикстура если нужно начать тест с товаром в корзине
    productInBasket: async({ page, loggedIn }, use) => {
        const indx = 3;
        await loggedIn.putInBasket(indx);
        await use(new MainPage(page));
    }

});

export { expect, Page };
     