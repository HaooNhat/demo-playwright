const { test, expect } = require('@playwright/test');

test('First test', async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/');

    await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
});
