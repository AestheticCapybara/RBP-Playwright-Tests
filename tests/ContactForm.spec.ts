import {expect, test} from "@playwright/test";
import {ExtendedPage} from "./ExtendedPage";
import {MainPage} from "./MainPage.po";
import {ContactForm} from "./ContactForm.po";
import helpers from "./helpers.json";

let extendedPage : ExtendedPage;

let mainPage: MainPage;
let contactForm: ContactForm;

test.describe('Contact form tests @mainPage', () => {
    test.beforeAll(async ({request, baseURL}) => {
        let response = await request.get(`${baseURL}`);
        expect(response.status()).toBe(200);
    })
    test.beforeEach(async ({page}) => {
        extendedPage = new ExtendedPage(page);
        mainPage = new MainPage(page);
        contactForm = new ContactForm(page);

        await page.goto('/');
    })

    test('Verify contact form visible', async () => {
        await expect(contactForm.formContainer).toBeVisible();
        await expect(contactForm.name).toBeVisible();
        await expect(contactForm.email).toBeVisible();
        await expect(contactForm.phone).toBeVisible();
        await expect(contactForm.subject).toBeVisible();
        await expect(contactForm.description).toBeVisible();
        await expect(contactForm.alert).not.toBeVisible();
    })

    test('Verify with valid info', async() => {
        await contactForm.fillAllFields(
            helpers.validInfo.name,
            helpers.validInfo.email,
            helpers.validInfo.phone,
            helpers.validInfo.subject,
            helpers.validInfo.description
        );
        await extendedPage.clickOn(contactForm.submitButton);

        await expect(contactForm.name).not.toBeVisible();
        await expect(contactForm.email).not.toBeVisible();
        await expect(contactForm.phone).not.toBeVisible();
        await expect(contactForm.subject).not.toBeVisible();
        await expect(contactForm.description).not.toBeVisible();
        await expect(contactForm.alert).not.toBeVisible();
    })

    test.describe('Verify with invalid name', async() => {
        test('Case: Blank', async() => {
            await contactForm.fillAllFields(
                helpers.blank,
                helpers.validInfo.email,
                helpers.validInfo.phone,
                helpers.validInfo.subject,
                helpers.validInfo.description
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.nameBlank)).toBeVisible();
        })
    })

    test.describe('Verify with invalid email', async() => {
        test('Case: Blank', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.blank,
                helpers.validInfo.phone,
                helpers.validInfo.subject,
                helpers.validInfo.description
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.emailBlank)).toBeVisible();
        })
        test('Case: No @', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.invalidInfo.emailNoAt,
                helpers.validInfo.phone,
                helpers.validInfo.subject,
                helpers.validInfo.description
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.emailInvalidFormat)).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.emailBlank)).not.toBeVisible();
        })
        /* POSSIBLE DEFECT: Email passes verification when no TLD.
        test('Case: No TLD', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.invalidInfo.emailNoTLD,
                helpers.validInfo.phone,
                helpers.validInfo.subject,
                helpers.validInfo.description
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.emailInvalidFormat)).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.emailBlank)).not.toBeVisible();
        })
         */
    })

    test.describe('Verify with invalid phone number', async() => {
        test('Case: Blank', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.validInfo.email,
                helpers.blank,
                helpers.validInfo.subject,
                helpers.validInfo.description
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.phoneBlank)).toBeVisible();
        })
        test('Case: Too short', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.validInfo.email,
                helpers.invalidInfo.phoneShort,
                helpers.validInfo.subject,
                helpers.validInfo.description
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.phoneInvalidFormat)).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.phoneBlank)).not.toBeVisible();
        })
        test('Case: Too long', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.validInfo.email,
                helpers.invalidInfo.phoneLong,
                helpers.validInfo.subject,
                helpers.validInfo.description
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.phoneInvalidFormat)).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.phoneBlank)).not.toBeVisible();
        })
        /* POSSIBLE DEFECT: Phone number passes validation when non-numeral.
        test('Case: No numbers', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.validInfo.email,
                helpers.invalidInfo.phoneNoNum,
                helpers.validInfo.subject,
                helpers.validInfo.description
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.phoneInvalidFormat)).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.phoneBlank)).not.toBeVisible();
        })
         */
        test('Case: Too short + no numbers', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.validInfo.email,
                helpers.invalidInfo.phoneNoNumShort,
                helpers.validInfo.subject,
                helpers.validInfo.description
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.phoneInvalidFormat)).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.phoneBlank)).not.toBeVisible();
        })
    })

    test.describe('Verify with invalid subject', async() => {
        test('Case: Blank', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.validInfo.email,
                helpers.validInfo.phone,
                helpers.blank,
                helpers.validInfo.description
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.subjectBlank)).toBeVisible();
        })
        test('Case: Too short', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.validInfo.email,
                helpers.validInfo.phone,
                await extendedPage.generateRandomString(4),
                helpers.validInfo.description
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.subjectInvalidFormat)).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.subjectBlank)).not.toBeVisible();
        })
        test('Case: Too long', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.validInfo.email,
                helpers.validInfo.phone,
                await extendedPage.generateRandomString(101),
                helpers.validInfo.description
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.subjectInvalidFormat)).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.subjectBlank)).not.toBeVisible();
        })
    })

    test.describe('Verify with invalid description', async() => {
        test('Case: Blank', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.validInfo.email,
                helpers.validInfo.phone,
                helpers.validInfo.subject,
                helpers.blank
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.descriptionBlank)).toBeVisible();
        })
        test('Case: Too short', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.validInfo.email,
                helpers.validInfo.phone,
                helpers.validInfo.subject,
                await extendedPage.generateRandomString(19)
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.descriptionInvalidFormat)).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.descriptionBlank)).not.toBeVisible();
        })
        test('Case: Too long', async() => {
            await contactForm.fillAllFields(
                helpers.validInfo.name,
                helpers.validInfo.email,
                helpers.validInfo.phone,
                helpers.validInfo.subject,
                await extendedPage.generateRandomString(2001)
            );
            await extendedPage.clickOn(contactForm.submitButton);

            await expect(contactForm.alert).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.descriptionInvalidFormat)).toBeVisible();
            await expect(contactForm.specifyAlert(helpers.alerts.contactForm.descriptionBlank)).not.toBeVisible();
        })
    })
})