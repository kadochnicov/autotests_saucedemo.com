import { test as setup } from "@/fixtures/baseFixture";
import path from 'path';

setup('auth setup for standart user', async( {app} ) => {
    const login = String(process.env.STANDART_USER_NAME);
    const pswrd = String(process.env.PSWRD);
    const url = String(process.env.BASE_URL);
    const authFile = path.join(process.cwd(), '.auth/user.json');

    await app.loginPage.login(url, login, pswrd);
    await app.page.context().storageState({ path: authFile });
})

