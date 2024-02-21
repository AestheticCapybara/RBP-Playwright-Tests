import {expect, Locator, Page} from "@playwright/test";

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
        await from.hover();
        await this.page.mouse.down();

        const fromBox = await from.boundingBox();
        const toBox = await to.boundingBox();
        if (!fromBox || !toBox) return;

        const steps = 10;
        for (let i = 1; i <= steps; i++) {
            const x = fromBox.x + ((toBox.x - fromBox.x) * i / steps);
            const y = fromBox.y + ((toBox.y - fromBox.y) * i / steps);
            await this.page.mouse.move(x, y);
        }

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
    async verifyLinks(linkArray: Array<any>, returnUrl: string) : Promise<void> {
        for (const link of linkArray) {
            const locator = this.page.locator(link['selector']).first();
            const expected = link['expected'];

            await this.clickOn(locator);
            await expect(this.page).toHaveURL(expected);

            await this.page.goto('about:blank');
            await this.page.goto(returnUrl);
            await expect(this.page).toHaveURL(returnUrl);
        }
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
}