import { test as base, expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { MainPage } from '@/pages/MainPage';
import { App } from '@/pages/App';

type myFixtures = {
    loggedIn: MainPage,
    productInBasket: App,
    app: App,
}

export const test = base.extend<myFixtures>({

// фикстура с объктами всех страниц
    app: async ({ page }, use) => {
        await use(new App(page))
    }, 


// фикстура если нужно начать тест с товаром в корзине
    productInBasket: async({ app }, use) => {
        const indx = 3;
      //  await loggedIn.putInBasket(indx);
        await use(app); 
    }

});

export { expect, Page };
     