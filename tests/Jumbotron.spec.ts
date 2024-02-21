import {expect, test} from "@playwright/test";
import {ExtendedPage} from "./ExtendedPage";
import {MainPage} from "./MainPage.po";
import {Jumbotron} from "./Jumbotron.po";

let extendedPage : ExtendedPage;

let mainPage: MainPage;
let jumbotron: Jumbotron;

test.beforeAll(async ({baseURL, request}) => {
    let response = await request.get(`${baseURL}`);
    expect(response.status()).toBe(200);
})
test.beforeEach(async ({page}) => {
    extendedPage = new ExtendedPage(page);

    mainPage = new MainPage(page);
    jumbotron = new Jumbotron(page);

    await page.goto('/');
})

test.describe('Jumbotron tests @mainPage', () => {
    test('Verify jumbotron visible', async () => {
        await expect(jumbotron.jumbotronContainer).toBeVisible();
    })

    test('Verify jumbotron button func', async () => {
        await expect(jumbotron.jumbotronContainer).toBeVisible();
        await extendedPage.clickOn(jumbotron.letMeHackButton);
        await expect(jumbotron.jumbotronContainer).not.toBeVisible();
        await expect(jumbotron.letMeHackButton).not.toBeVisible();
    })

    test('Verify jumbotron links func', async () => {
        await expect(jumbotron.jumbotronContainer).toBeVisible();
        await extendedPage.verifyLinks(jumbotron.links, '/');
    })
})

