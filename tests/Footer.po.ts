import {Locator, Page} from "@playwright/test";

const elements = {
    footer: '#footer',
    link: {
        createdByA: {
            selector: 'a[href="http://www.mwtestconsultancy.co.uk"]',
            expected: 'https://www.mwtestconsultancy.co.uk'
        },
        cookies: {
            selector: 'a[href="/#/cookie"]',
            expected: '/#/cookie'
        },
        privacy: {
            selector: 'a[href="/#/privacy"]',
            expected: '/#/privacy'
        },
        admin: {
            selector: 'a[href="/#/admin"]',
            expected: '/#/admin'
        }
    }
}

export class Footer {
    private page: Page;
    private _footerSection: Locator;
    private _links: Array<any>;

    get footerSection(): Locator {
        return this._footerSection;
    }
    get links(): Array<any> {
        return this._links;
    }

    constructor(page: Page) {
        this.page = page;
        this._footerSection = this.page.locator(elements.footer);
        this._links = Object.values(elements.link);
    }
}