// const { test, expect } = require('@playwright/test');

// let BaseURL = "https://practicesoftwaretesting.com/"

// async function addToCart(page, itemSelector) {
//     await page.click(itemSelector);
// }

// async function removeFromCart(page, itemSelector) {
//     await page.click(itemSelector);
// }

// async function checkout(page, isLoggedIn) {
//     await page.click('text=Checkout');
// }

// test('Test case 1: Adding item', async ({ page }) => {
//     await page.goto(BaseURL);

//     await addToCart(page, 'text=Add to cart'); // Add the first item
//     await addToCart(page, 'text=Add to cart'); // Add the second item

//     await expect(page).toBe('3');
// });

// test('Test case 2: Removing item', async ({ page }) => {
//     await page.goto(BaseURL);

//     await addToCart(page, 'text=Add to cart');
//     await addToCart(page, 'text=Add to cart');

//     await removeFromCart(page, 'text=Remove'); // Remove the first item

//     await expect(page).toBe('2');
// });

// test('Test case 3: Proceed checkout without log-in', async ({ page }) => {
//     await page.goto(BaseURL);

//     await addToCart(page, 'text=Add to cart');
//     await addToCart(page, 'text=Add to cart');

//     await removeFromCart(page, 'text=Remove');

//     await checkout(page, false);

//     await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
// });

// test('Test case 4: Proceed checkout with log-in', async ({ page }) => {
//     await page.goto(BaseURL);

//     await addToCart(page, 'text=Add to cart');
//     await addToCart(page, 'text=Add to cart');

//     await removeFromCart(page, 'text=Remove');

//     await page.fill('#username', 'your_username');
//     await page.fill('#password', 'your_password');
//     await page.click('text=Login');
//     await checkout(page, true);

//     await expect(page).toHaveTitle('Practice Software Testing - Toolshop - v5.0');
// });