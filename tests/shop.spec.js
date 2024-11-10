const { test, expect } = require('@playwright/test');

test('Check buying', async ({ page }) => {
    test.setTimeout(60_000); // 60 seconds

    // await page.waitForTimeout(120_000);

    await page.goto('https://practicesoftwaretesting.com/');
    // await page.goto('https://with-bugs.practicesoftwaretesting.com/#/');

    await page.locator('[data-test="nav-sign-in"]').click();
    await page.waitForSelector('[data-test="email"]');
    await page.locator('[data-test="email"]').click();
    await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();

    await expect(page).toHaveURL('https://practicesoftwaretesting.com/account')
    // await expect(page).toHaveURL('https://with-bugs.practicesoftwaretesting.com/#/account')

    await page.locator('[data-test="nav-home"]').click();

    await expect(page).toHaveURL('https://practicesoftwaretesting.com/')
    // await expect(page).toHaveURL('https://with-bugs.practicesoftwaretesting.com/#')

    await page.locator('h5[data-test="product-name"]:text("Combination Pliers")').click();

    await page.locator('[data-test="increase-quantity"]').click();

    await page.locator('[data-test="increase-quantity"]').click();
    await page.locator('[data-test="add-to-cart"]').click();

    await page.getByLabel('Product added to shopping').click();

    await page.locator('[data-test="nav-home"]').click();
    await page.locator('#filters').getByText('Hammer').click();
    await page.getByText('Screwdriver').click();

    await page.locator('h5[data-test="product-name"]:text("Thor Hammer")').click();

    // await page.locator('[data-test="quantity"]').click();
    // await page.locator('[data-test="quantity"]').fill('14');
    await page.locator('[data-test="add-to-cart"]').click();

    await page.getByLabel('Product added to shopping').click();

    await page.locator('[data-test="nav-home"]').click();
    await page.getByText('Sander').click();
    await page.locator('h5[data-test="product-name"]:text("Belt Sander")').click();
    await page.locator('[data-test="add-to-cart"]').click();

    await page.getByLabel('Product added to shopping').click();

    await page.locator('[data-test="nav-home"]').click();
    await page.locator('[data-test="sort"]').selectOption('name,asc');
    await page.locator('h5[data-test="product-name"]:text("Adjustable Wrench")').click();
    await page.locator('[data-test="add-to-cart"]').click();

    await page.getByLabel('Product added to shopping').click();

    // await expect(page.locator('[data-test="nav-cart"]')).toBeVisible();
    await page.locator('[data-test="nav-cart"]').click();

    await page.waitForURL('https://practicesoftwaretesting.com/checkout', { timeout: 60000 });

    await page.locator('[data-test="proceed-1"]').click();

    await page.locator('[data-test="proceed-2"]').click();

    await page.waitForTimeout(3_000);
    await page.locator('[data-test="state"]').click();
    await page.locator('[data-test="state"]').fill('Canada');
    await page.locator('[data-test="postcode"]').click();
    await page.locator('[data-test="postcode"]').fill('90000');
    await page.locator('[data-test="proceed-3"]').click();
    await page.locator('[data-test="payment-method"]').selectOption('cash-on-delivery');
    await page.locator('[data-test="finish"]').click();
    await page.getByText('Payment was successful').click();
    await page.waitForTimeout(3_000);
    await page.locator('[data-test="finish"]').click();
    await page.getByText('Thanks for your order! Your').click();
});