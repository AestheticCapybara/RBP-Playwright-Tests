import {expect, test} from "@playwright/test";
import {ExtendedPage} from "./ExtendedPage";
import {MainPage} from "./MainPage.po";
import {Footer} from "./Footer.po";

let extendedPage : ExtendedPage;

let mainPage: MainPage;
let footer: Footer;

test.describe('Footer tests @mainPage', () => {
    test.beforeAll(async ({request, baseURL}) => {
        let response = await request.get(`${baseURL}`);
        expect(response.status()).toBe(200);
    })
    test.beforeEach(async ({page}) => {
        extendedPage = new ExtendedPage(page);
        mainPage = new MainPage(page);
        footer = new Footer(page);

        await page.goto('/');
    })

    test('Verify footer visible', async () => {
        await expect(footer.footerSection).toBeVisible();
    })

    test('Verify footer links func', async ({page}) => {
        await expect(footer.footerSection).toBeVisible();
        for (const link of footer.links) {
            const locator = page.locator(link['selector']).first();
            const expected = link['expected'];

            await extendedPage.clickOn(locator);
            await expect(page).toHaveURL(expected);

            await page.goto('about:blank');
            await page.goto('/');
            await expect(page).toHaveURL('/');
        }
    })
})