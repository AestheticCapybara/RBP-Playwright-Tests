import {Page, Locator} from "@playwright/test";

const elements = {
    img : {
        heroImg : '.hotel-logoUrl',
    }
}

export class MainPage {
    private page: Page;
    private _heroImg: Locator;

    get heroImg(): Locator {
        return this._heroImg;
    }

    constructor(page: Page) {
        this.page = page;
        this._heroImg = this.page.locator(elements.img.heroImg);
    }
}