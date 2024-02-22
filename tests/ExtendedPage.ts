import {APIRequestContext, expect, Locator, Page} from "@playwright/test";

export class ExtendedPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOn(element: any) : Promise<void> {
        await expect(element).toBeVisible();
        await element.click();
    }
    async dragFromTo(from: Locator, to: Locator) : Promise<void> {
        const fromBox = await from.boundingBox();
        const toBox = await to.boundingBox();
        if (!fromBox || !toBox) return;

        await this.page.mouse.move(fromBox.x, fromBox.y, {steps: 25})
        await from.hover();
        await this.page.mouse.down();

        await this.page.mouse.move(toBox.x, toBox.y, {steps: 25})
        await to.hover();
        await this.page.mouse.up();
    }
    async verifyLink(selector: string, expectedUrl: string, returnUrl: string) : Promise<void> {
        const locator = this.page.locator(selector);

        await this.clickOn(locator);
        await expect(this.page).toHaveURL(expectedUrl);

        await this.page.goto('about:blank');
        await this.page.goto(returnUrl);
        await expect(this.page).toHaveURL(returnUrl);
    }
    async generateRandomString(length: number) : Promise<string> {
        let out = "";
        let i = 0;
        while (i < length) {
            out = out.concat(Math.random().toString(36).substring(2, 3));
            i++;
        }
        return out;
    }
    async REST_authLogin(request: APIRequestContext, baseURL: string | undefined) : Promise<void> {
        let response = await request.post(`${baseURL}auth/login`, {
            data: {
                "username": "admin",
                "password": "password"
            }
        });
        expect(response.status()).toBe(200);
    }
    async REST_bookingClearAll(request: APIRequestContext, baseURL: string | undefined) : Promise<void> {
        let response = await request.get(`${baseURL}booking/?roomid=1`);
        expect(response.status()).toBe(200);

        const bookings = await response.json();

        for (const booking of bookings.bookings) {
            response = await request.delete(`${baseURL}booking/${booking.bookingid}`);
        }
    }
}