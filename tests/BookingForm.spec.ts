import {expect, test} from "@playwright/test";
import {ExtendedPage} from "./ExtendedPage";
import {MainPage} from "./MainPage.po";
import {BookingForm} from "./BookingForm.po";
import helpers from "./helpers.json";

let extendedPage : ExtendedPage;

let mainPage: MainPage;
let bookingForm: BookingForm;

test.beforeAll(async ({baseURL, request}) => {
    let response = await request.get(`${baseURL}`);
    expect(response.status()).toBe(200);
})
test.beforeEach(async ({page, baseURL, request}) => {
    let response = await request.post(`${baseURL}auth/login`, {
        data: {
            "username": "admin",
            "password": "password"
        }
    });
    expect(response.status()).toBe(200);

    extendedPage = new ExtendedPage(page);

    mainPage = new MainPage(page);
    bookingForm = new BookingForm(page);

    await page.goto('/');
})
test.afterEach(async({baseURL, request}) => {
    await bookingForm.REST_clearAllBookings(request, baseURL);
})

test.describe('Booking form tests @mainPage', () => {
    test.describe.configure({ mode: 'serial' });

    test('DEBUG calendar dragging', async() => {
        await extendedPage.clickOn(bookingForm.openBookingButton);
        await extendedPage.dragFromTo(bookingForm.availableDay, bookingForm.nextAvailable);
    })

    test('Verify booking form reveal func', async() => {
        await expect(bookingForm.firstName).not.toBeVisible();
        await expect(bookingForm.lastName).not.toBeVisible();
        await expect(bookingForm.email).not.toBeVisible();
        await expect(bookingForm.phone).not.toBeVisible();
        await expect(bookingForm.bookButton).not.toBeVisible();
        await expect(bookingForm.cancelButton).not.toBeVisible();
        await extendedPage.clickOn(bookingForm.openBookingButton);
        await expect(bookingForm.firstName).toBeVisible();
        await expect(bookingForm.lastName).toBeVisible();
        await expect(bookingForm.email).toBeVisible();
        await expect(bookingForm.phone).toBeVisible();
        await expect(bookingForm.bookButton).toBeVisible();
        await expect(bookingForm.cancelButton).toBeVisible();
    })

    test('Verify with valid info', async() => {
        await extendedPage.clickOn(bookingForm.openBookingButton);
        await bookingForm.fillAllFields(
            helpers.validInfo.firstName,
            helpers.validInfo.lastName,
            helpers.validInfo.email,
            helpers.validInfo.phone
        );
        await extendedPage.dragFromTo(bookingForm.availableDay, bookingForm.nextAvailable);
        await extendedPage.clickOn(bookingForm.bookButton);

        await expect(bookingForm.firstName).not.toBeVisible();
        await expect(bookingForm.lastName).not.toBeVisible();
        await expect(bookingForm.email).not.toBeVisible();
        await expect(bookingForm.phone).not.toBeVisible();
    })

    test.describe('Verify with invalid first name', async() => {
        test('Case: Blank', async() => {
            await extendedPage.clickOn(bookingForm.openBookingButton);
            await bookingForm.fillAllFields(
                helpers.blank,
                helpers.validInfo.lastName,
                helpers.validInfo.email,
                helpers.validInfo.phone
            );
            await extendedPage.dragFromTo(bookingForm.availableDay, bookingForm.nextAvailable);
            await extendedPage.clickOn(bookingForm.bookButton);

            await expect(bookingForm.alert).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.bookingForm.firstNameBlank)).toBeVisible();
        })
    })

    test.describe('Verify with invalid last name', async() => {
        test('Case: Blank', async() => {
            await extendedPage.clickOn(bookingForm.openBookingButton);
            await bookingForm.fillAllFields(
                helpers.validInfo.firstName,
                helpers.blank,
                helpers.validInfo.email,
                helpers.validInfo.phone
            );
            await extendedPage.dragFromTo(bookingForm.availableDay, bookingForm.nextAvailable);
            await extendedPage.clickOn(bookingForm.bookButton);

            await expect(bookingForm.alert).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.bookingForm.lastNameBlank)).toBeVisible();
        })
    })

    test.describe('Verify with invalid email', async() => {
        test('Case: Blank', async() => {
            await extendedPage.clickOn(bookingForm.openBookingButton);
            await bookingForm.fillAllFields(
                helpers.validInfo.firstName,
                helpers.validInfo.lastName,
                helpers.blank,
                helpers.validInfo.phone
            );
            await extendedPage.clickOn(bookingForm.bookButton);

            await expect(bookingForm.alert).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.bookingForm.emailBlank)).toBeVisible();
        })
        test('Case: No @', async() => {
            await extendedPage.clickOn(bookingForm.openBookingButton);
            await bookingForm.fillAllFields(
                helpers.validInfo.firstName,
                helpers.validInfo.lastName,
                helpers.invalidInfo.emailNoAt,
                helpers.validInfo.phone
            );
            await extendedPage.clickOn(bookingForm.bookButton);

            await expect(bookingForm.alert).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.contactForm.emailInvalidFormat)).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.contactForm.emailBlank)).not.toBeVisible();
        })
        /* POSSIBLE DEFECT: Email passes verification when no TLD.
        test('Case: No TLD', async() => {
            await extendedPage.clickOn(bookingForm.openBookingButton);
            await bookingForm.fillAllFields(
                helpers.validInfo.firstName,
                helpers.validInfo.lastName,
                helpers.invalidInfo.emailNoTLD,
                helpers.validInfo.phone
            );
            await extendedPage.clickOn(bookingForm.bookButton);

            await expect(bookingForm.alert).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.contactForm.emailInvalidFormat)).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.contactForm.emailBlank)).not.toBeVisible();
        })
         */
    })

    test.describe('Verify with invalid phone number', async() => {
        test('Case: Blank', async () => {
            await extendedPage.clickOn(bookingForm.openBookingButton);
            await bookingForm.fillAllFields(
                helpers.validInfo.firstName,
                helpers.validInfo.lastName,
                helpers.validInfo.email,
                helpers.blank
            );
            await extendedPage.dragFromTo(bookingForm.availableDay, bookingForm.nextAvailable);
            await extendedPage.clickOn(bookingForm.bookButton);

            await expect(bookingForm.alert).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.bookingForm.phoneBlank)).toBeVisible();
        })
        test('Case: Too short', async() => {
            await extendedPage.clickOn(bookingForm.openBookingButton);
            await bookingForm.fillAllFields(
                helpers.validInfo.firstName,
                helpers.validInfo.lastName,
                helpers.validInfo.email,
                helpers.invalidInfo.phoneShort
            );
            await extendedPage.dragFromTo(bookingForm.availableDay, bookingForm.nextAvailable);
            await extendedPage.clickOn(bookingForm.bookButton);

            await expect(bookingForm.alert).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.bookingForm.phoneInvalidFormat)).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.bookingForm.phoneBlank)).not.toBeVisible();
        })
        test('Case: Too long', async() => {
            await extendedPage.clickOn(bookingForm.openBookingButton);
            await bookingForm.fillAllFields(
                helpers.validInfo.firstName,
                helpers.validInfo.lastName,
                helpers.validInfo.email,
                helpers.invalidInfo.phoneLong
            );
            await extendedPage.dragFromTo(bookingForm.availableDay, bookingForm.nextAvailable);
            await extendedPage.clickOn(bookingForm.bookButton);

            await expect(bookingForm.alert).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.bookingForm.phoneInvalidFormat)).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.bookingForm.phoneBlank)).not.toBeVisible();
        })
        /* POSSIBLE DEFECT: Phone number passes verification when non-numeral.
        test('Case: No numbers', async() => {
            await extendedPage.clickOn(bookingForm.openBookingButton);
            await bookingForm.fillAllFields(
                helpers.validInfo.firstName,
                helpers.validInfo.lastName,
                helpers.validInfo.email,
                helpers.invalidInfo.phoneNoNum
            );
            await extendedPage.dragFromTo(bookingForm.availableDay, bookingForm.nextAvailable);
            await extendedPage.clickOn(bookingForm.bookButton);

            await expect(bookingForm.alert).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.bookingForm.phoneInvalidFormat)).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.bookingForm.phoneBlank)).not.toBeVisible();
        })
        */
        test('Case: Too short + no numbers', async() => {
            await extendedPage.clickOn(bookingForm.openBookingButton);
            await bookingForm.fillAllFields(
                helpers.validInfo.firstName,
                helpers.validInfo.lastName,
                helpers.validInfo.email,
                helpers.invalidInfo.phoneNoNumShort
            );
            await extendedPage.dragFromTo(bookingForm.availableDay, bookingForm.nextAvailable);
            await extendedPage.clickOn(bookingForm.bookButton);

            await expect(bookingForm.alert).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.bookingForm.phoneInvalidFormat)).toBeVisible();
            await expect(bookingForm.specifyAlert(helpers.alerts.bookingForm.phoneBlank)).not.toBeVisible();
        })
    })
})