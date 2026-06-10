import { test, expect } from "@/fixtures/baseFixture";
import { BasketPage } from "@/pages/BasketPage";
import { ProductPage } from "@/pages/ProductPage";
import { testData as data } from "@/testData/testData";

test.describe('put product in basket', () => {

    test('put product in basket from main page', async({ loggedIn, page}) => {
        const itemIndex = 0;
        const basketPage = new BasketPage(page);

        loggedIn.putInBasket(itemIndex);
        loggedIn.header.basketIconClick();
        
        await expect(basketPage.itemCards().nth(itemIndex).
                locator(basketPage.itemLabel())).
                toHaveText(data.productCards[itemIndex].label)
    })

    test('put product in basket from product page', async ({ loggedIn, page }) => {
        const itemIndex = 0;
        const basketPage = new BasketPage(page);
        const productPage = new ProductPage(page);

        loggedIn.gotoProductPage(itemIndex);
        productPage.addToBasket();
        loggedIn.header.basketIconClick();

        await expect(basketPage.itemCards().nth(itemIndex).
            locator(basketPage.itemLabel())).
            toHaveText(data.productCards[itemIndex].label)
    })

    test.describe('put product in basket', () => {

        test('cancel product from main page', async ({ loggedIn, page }) => {
          
        })

    })

})