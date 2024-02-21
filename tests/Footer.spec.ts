import {expect, test} from "@playwright/test";
import {ExtendedPage} from "./ExtendedPage";
import {MainPage} from "./MainPage.po";
import {Footer} from "./Footer.po";

let extendedPage : ExtendedPage;

let mainPage: MainPage;
let footer: Footer;

test.beforeAll(async ({baseURL, request}) => {
    let response = await request.get(`${baseURL}`);
    expect(response.status()).toBe(200);
})
test.beforeEach(async ({page}) => {
    extendedPage = new ExtendedPage(page);

    mainPage = new MainPage(page);
    footer = new Footer(page);

    await page.goto('/');
})

test.describe('Footer tests @mainPage', () => {
    test('Verify footer visible', async () => {
        await expect(footer.footerSection).toBeVisible();
    })

    test('Verify footer links func', async () => {
        await expect(footer.footerSection).toBeVisible();
        await extendedPage.verifyLinks(footer.links, '/');
    })
})