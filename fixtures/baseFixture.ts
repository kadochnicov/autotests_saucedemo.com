import { test as base, expect, Page } from '@playwright/test';
import { testData as data } from '@/testData/testData';

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.goto(data.baseURL);
        await use(page);
    },
});

export { expect, Page }; 