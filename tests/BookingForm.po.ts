import {APIRequestContext, expect, Locator, Page} from "@playwright/test";

const elements = {
    input: {
        firstName: ".room-firstname",
        lastName: ".room-lastname",
        email: ".room-email",
        phone: ".room-phone",
    },
    button: {
        openBooking: ".openBooking",
        book: ".btn-outline-primary.book-room",
        cancel: ".btn-outline-danger.book-room"
    },
    calendar: {
        availableDay: "//div[contains(@class, 'rbc-day-bg') and not(contains(@class, 'rbc-off-range-bg'))]"
    },
    alert: '.alert.alert-danger'
}

export class BookingForm {
    private page: Page;
    private _firstName: Locator;
    private _lastName: Locator;
    private _email: Locator;
    private _phone: Locator;
    private _availableDay: Locator;
    private _nextAvailable: Locator;
    private _openBookingButton: Locator;
    private _bookButton: Locator;
    private _cancelButton: Locator;
    private _alert: Locator;

    get firstName(): Locator {
        return this._firstName;
    }
    get lastName(): Locator {
        return this._lastName;
    }
    get email(): Locator {
        return this._email;
    }
    get phone(): Locator {
        return this._phone;
    }
    get availableDay(): Locator {
        return this._availableDay;
    }
    get nextAvailable(): Locator {
        return this._nextAvailable;
    }
    get openBookingButton(): Locator {
        return this._openBookingButton;
    }
    get bookButton(): Locator {
        return this._bookButton;
    }
    get cancelButton(): Locator {
        return this._cancelButton;
    }
    get alert(): Locator {
        return this._alert;
    }

    constructor(page: Page) {
        this.page = page;
        this._firstName = this.page.locator(elements.input.firstName);
        this._lastName = this.page.locator(elements.input.lastName);
        this._email = this.page.locator(elements.input.email);
        this._phone = this.page.locator(elements.input.phone);
        this._availableDay = this.page.locator(elements.calendar.availableDay).nth(0);
        this._nextAvailable = this.page.locator(elements.calendar.availableDay).nth(1);
        this._openBookingButton = this.page.locator(elements.button.openBooking).first();
        this._bookButton = this.page.locator(elements.button.book);
        this._cancelButton = this.page.locator(elements.button.cancel);
        this._alert = this.page.locator(elements.alert);
    }

    async fillAllFields(
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
    ) : Promise<void> {
        await this.page.fill(elements.input.firstName, firstName);
        await this.page.fill(elements.input.lastName, lastName);
        await this.page.fill(elements.input.email, email);
        await this.page.fill(elements.input.phone, phone);
    }
    specifyAlert(alert: string): Locator {
        return this._alert.locator(`//p[contains(text(), '${alert}')]`);
    }
}