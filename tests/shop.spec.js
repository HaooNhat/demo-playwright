const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    await page.locator('[data-test="nav-sign-in"]').click();
    await page.locator('[data-test="email"]').click();
    await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();
    await page.locator('[data-test="nav-home"]').click();
    await page.locator('[data-test="product-01JC85VQ49MKH31EXZNKKQJYE1"]').click();
    await page.locator('[data-test="increase-quantity"]').click();
    await page.locator('[data-test="increase-quantity"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    await page.locator('[data-test="nav-home"]').click();
    await page.locator('[data-test="search-query"]').click();
    await page.locator('[data-test="search-query"]').fill('canada');
    await page.locator('[data-test="search-submit"]').click();
    await page.getByText('ForgeFlex Tools').click();
    await page.locator('[data-test="search-submit"]').click();
    await page.locator('[data-test="search-reset"]').click();
    await page.getByText('MightyCraft Hardware').click();
    await page.locator('[data-test="product-01JC85VQ61FZ80NX1J8H9MGZ1D"]').click();
    await page.locator('[data-test="increase-quantity"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    await page.locator('[data-test="nav-home"]').click();
    await page.getByText('ForgeFlex Tools').click();
    await page.locator('[data-test="product-01JC85VQ4QJW1B223SJM2J79Q2"]').click();
    await page.locator('[data-test="quantity"]').click();
    await page.locator('[data-test="quantity"]').fill('1000');
    await page.locator('[data-test="quantity"]').press('ArrowLeft');
    await page.locator('[data-test="quantity"]').press('ArrowLeft');
    await page.locator('[data-test="quantity"]').press('ArrowLeft');
    await page.locator('[data-test="quantity"]').press('ArrowLeft');
    await page.locator('[data-test="quantity"]').press('ArrowLeft');
    await page.locator('[data-test="quantity"]').press('ArrowRight');
    await page.locator('[data-test="quantity"]').fill('11000');
    await page.locator('[data-test="add-to-cart"]').click();
    await page.locator('[data-test="nav-cart"]').click();
    await page.locator('[data-test="proceed-1"]').click();
    await page.locator('[data-test="proceed-2"]').click();
    await page.locator('[data-test="state"]').click();
    await page.locator('[data-test="state"]').fill('Canada');
    await page.locator('[data-test="postcode"]').click();
    await page.locator('[data-test="postcode"]').fill('90000');
    await page.locator('[data-test="proceed-3"]').click();
    await page.locator('[data-test="payment-method"]').selectOption('cash-on-delivery');
    await page.locator('[data-test="finish"]').click();
    await page.getByText('Payment was successful').click();
    await page.locator('[data-test="finish"]').click();
    await page.getByText('Thanks for your order! Your').click();
    await page.locator('[data-test="nav-home"]').click();


});