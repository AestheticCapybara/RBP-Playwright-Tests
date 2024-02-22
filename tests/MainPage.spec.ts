import {expect, test} from "@playwright/test";
import {ExtendedPage} from "./ExtendedPage";
import {MainPage} from "./MainPage.po";

let extendedPage : ExtendedPage;

let mainPage: MainPage;

test.describe('Main page tests @mainPage', () => {
    test.beforeAll(async ({request, baseURL}) => {
        let response = await request.get(`${baseURL}`);
        expect(response.status()).toBe(200);
    })
    test.beforeEach(async ({page}) => {
        extendedPage = new ExtendedPage(page);
        mainPage = new MainPage(page);

        await page.goto('/');
    })

    test('Verify MainPage title', async ({page}) => {
        await expect(page).toHaveTitle("Restful-booker-platform demo");
    })

    test ('Verify MainPage hero image', async () => {
        await expect(mainPage.heroImg).toBeVisible();
        await expect(mainPage.heroImg).toHaveAttribute('src', 'https://www.mwtestconsultancy.co.uk/img/rbp-logo.png');
    })
})