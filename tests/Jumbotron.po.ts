import {Locator, Page} from "@playwright/test";

const elements = {
    jumbotron: '.jumbotron',
    button: {
        letMeHack: '.jumbotron button'
    },
    link: {
        sourceCode: {
            selector: 'a[alt = "Restful booker platform source code"]',
            expected: 'https://github.com/mwinteringham/restful-booker-platform'
        },
        buildPipeline: {
            selector: 'a[alt = "Circle CI build pipeline"]',
            expected: 'https://app.circleci.com/pipelines/github/mwinteringham/restful-booker-platform'
        },
        homePage: {
            selector: 'a[alt = "Link to home page"]',
            expected: 'https://automationintesting.online/'
        },
        adminPage: {
            selector: 'a[alt = "Link to admin page"]',
            expected: 'https://automationintesting.online/#/admin'
        },
        features: {
            selector: 'a[alt = "Link to RBP project"]',
            expected: 'https://github.com/mwinteringham/restful-booker-platform/projects/1'
        },
        bugReport: {
            selector: 'a[alt = "Bug tracker"]',
            expected: 'https://github.com/mwinteringham/restful-booker-platform/issues'
        }
    }
}

export class Jumbotron {
    private page: Page;
    private _jumbotronContainer: Locator;
    private _letMeHackButton: Locator;
    private _links: Array<any>;

    get jumbotronContainer() : Locator {
        return this._jumbotronContainer;
    }
    get letMeHackButton() : Locator {
        return this._letMeHackButton;
    }
    get links() : Array<any> {
        return this._links;
    }

    constructor(page: Page) {
        this.page = page;
        this._jumbotronContainer = this.page.locator(elements.jumbotron);
        this._letMeHackButton = this.page.locator(elements.button.letMeHack);
        this._links = Object.values(elements.link);
    }
}