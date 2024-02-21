import {Locator, Page} from "@playwright/test";

const elements = {
    contactForm: '.contact',
    input: {
        name: '.contact #name',
        email: '.contact #email',
        phone: '.contact #phone',
        subject: '.contact #subject',
        description: '.contact #description'
    },
    button: {
        submit: '.contact #submitContact'
    },
    alert: ".contact .alert"
}

export class ContactForm {
    private page: Page;
    private _name: Locator;
    private _email: Locator;
    private _phone: Locator;
    private _subject: Locator;
    private _description: Locator;
    private _formContainer: Locator;
    private _submitButton: Locator;
    private _alert: Locator;

    get name(): Locator {
        return this._name;
    }
    get email(): Locator {
        return this._email;
    }
    get phone(): Locator {
        return this._phone;
    }
    get subject(): Locator {
        return this._subject;
    }
    get description(): Locator {
        return this._description;
    }
    get formContainer(): Locator {
        return this._formContainer;
    }
    get submitButton(): Locator {
        return this._submitButton;
    }
    get alert(): Locator {
        return this._alert;
    }

    constructor(page: Page) {
        this.page = page;
        this._name = this.page.locator(elements.input.name);
        this._email = this.page.locator(elements.input.email);
        this._phone = this.page.locator(elements.input.phone);
        this._subject = this.page.locator(elements.input.subject);
        this._description = this.page.locator(elements.input.description);
        this._formContainer = this.page.locator(elements.contactForm);
        this._submitButton = this.page.locator(elements.button.submit);
        this._alert = this.page.locator(elements.alert);
    }

    async fillAllFields(
        name: string,
        email: string,
        phone: string,
        subject: string,
        description: string,
    ) : Promise<void> {
        await this.page.fill(elements.input.name, name);
        await this.page.fill(elements.input.email, email);
        await this.page.fill(elements.input.phone, phone);
        await this.page.fill(elements.input.subject, subject);
        await this.page.fill(elements.input.description, description);
    }
    specifyAlert(alert: string): Locator {
        return this._alert.locator(`//p[contains(text(), '${alert}')]`);
    }
}