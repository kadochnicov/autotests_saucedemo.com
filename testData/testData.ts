import { faker } from '@faker-js/faker';
// всю дату решил сохранить в одном файле, так как даты не много 
// и не хочется плодить файлы
// но бест практис говорит что для каждая страничка требует свою дата файл

export const testData = {
    // content
    titltText: 'Products',
    errorMessageLockedUser: 'Epic sadface: Sorry, this user has been locked out.',
    menuItemList: ['All Items', 'About', 'Logout', 'Reset App State'],
    productCards: [
        {
            index: 0,
            label: 'Sauce Labs Backpack',
            price: '$29.99',
        },
        {
            index: 1,
            label: 'Sauce Labs Bike Light',
            price: '$9.99',
        },
        {
            index: 2,
            label: 'Sauce Labs Bolt T-Shirt',
            price: '$15.99',
        },
        {
            index: 3,
            label: 'Sauce Labs Fleece Jacket',
            price: '$49.99',
        },
        {
            index: 4,
            label: 'Sauce Labs Onesie',
            price: '$7.99',
        },
        {
            index: 5,
            label: 'Test.allTheThings() T-Shirt (Red)',
            price: '$15.99',
        },
    ],
    completeContent: {
        header: 'Thank you for your order!',
        text:  `Your order has been dispatched, 
        and will arrive just as fast as the pony can get there!`,
    },

    // user logins
    correctUserNames: ['standard_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'],
    standartUserName: 'standard_user',
    lockedOutUser: 'locked_out_user',
    pswrd: 'secret_sauce',

    // URLs
    baseURL: 'https://www.saucedemo.com/',

    // faker data
    fakerName: faker.person.firstName(),
    fakerLastname: faker.person.fullName(),
    fakerIndex: String(faker.number.int(9999)),

    // validation information
    errorMessage: {
        requerFirstName: 'Error: First Name is required',
        requerLastName: 'Error: Last Name is required',
        requerPostCode: 'Error: Postal Code is required',
        requerUserName: 'Epic sadface: Username is required',
        requerPswrd: 'Epic sadface: Password is required',
        badData: 'Epic sadface: Username and password do not match any user in this service',
    }
}