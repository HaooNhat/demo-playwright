const { test, expect } = require('@playwright/test');

const url = "https://practicesoftwaretesting.com/" // For sprint 5
// const url = "https://with-bugs.practicesoftwaretesting.com/#/" // For sprint 5 with bugs

// Tips: better internet connection improve the test quality. Sometime test cases can fail because of bad connection.

// Playwright can generate code for you, use "npx playwright codegen" to do that. Be careful that not all the generated code will always work, especially with selecting element. Instead you should use page.locator() to look for the exact selector.

// Use "npx playwright test" to test all the file in the "tests" folder
// Or use "npx playwright test shop_5_no_bugs" to test a specific file
// Or use "npx playwright test -g 'search function'" to test a specific test case that match the name

// Some advance feature like trace viewer for debugging, help you screen shoot, but you need to configure the file in a different way.

test('Test search function', async ({ page }) => {
    await page.goto(url);

    // Search for valid keyword
    const searchKeyword = "drill"

    await page.locator('[data-test="search-query"]').fill(searchKeyword);
    await page.locator('[data-test="search-submit"]').click();

    await expect(page.locator('[data-test="search-term"]')).toHaveText(searchKeyword);

    await expect(page.locator('div[data-test="search_completed"]')).toBeVisible();

    // $$ for select all elements that matched
    const productNames = await page.$$('h5[data-test="product-name"]');

    // Assert that all product names contain "drill"
    for (const productNameElement of productNames) {
        const productName = (await productNameElement.textContent()).trim();
        expect(productName).toMatch(/\bdrill\b/i);
    }

    // Search for invalid keyword
    const searchInvalidKeyword = "asdf"

    await page.locator('[data-test="search-query"]').fill(searchInvalidKeyword);
    await page.locator('[data-test="search-submit"]').click();

    await expect(page.locator('div[data-test="search_completed"]')).toBeVisible();
    await expect(page.locator('[data-test="search-term"]')).toHaveText(searchInvalidKeyword);

    await expect(page.locator('[data-test="no-results"]')).toBeVisible();
})

test('Test checkbox filter function', async ({ page }) => {
    await page.goto(url);

    // Testing filter functions
    const listFilters = ["Hammer", "Wrench", "Measures", "Safety Gear"]

    for (const filter of listFilters) {
        await page.locator('#filters').getByText(filter).click();

        await expect(page.locator('div[data-test="filter_completed"]')).toBeVisible();

        const productNames = await page.$$('h5[data-test="product-name"]');
        let regex = ""

        if (filter == "Wrench") {
            // If filter type is wrench, check if the name of the product contain the following keywords
            let keywords = ["wrench", "spanner", "spanners"]
            regex = new RegExp(`(${keywords.join('|')})`, 'i');
        } else if (filter == "Measures") {
            // Also with measure, which has 3 keywords in their name too
            let keywords = ["measure", "measuring", "ruler"]
            regex = new RegExp(`(${keywords.join('|')})`, 'i');
        } else if (filter == "Safety Gear") {
            let keywords = ["safety", "protection", "protective", "construction"]
            regex = new RegExp(`(${keywords.join('|')})`, 'i');
        }
        else {
            let keyword = filter.toLowerCase()
            regex = new RegExp(`${keyword}`, 'i');
        }

        // Assert that all product names contain corresponding name
        for (const productNameElement of productNames) {
            const productName = (await productNameElement.textContent()).trim().toLowerCase();

            const isMatch = regex.test(productName);
            // console.log(regex, isMatch)
            await expect(isMatch).toBe(true);
        }

        await page.locator('#filters').getByText(filter).click();
        await expect(page.locator('div[data-test="filter_completed"]')).toBeVisible();
    }
})

test('Test sorting function', async ({ page }) => {
    await page.goto(url);

    // Name check
    // Ascending
    await page.locator('[data-test="sort"]').selectOption('name,asc');

    await expect(page.locator('div[data-test="sorting_completed"]')).toBeVisible();

    let productNames = await page.$$('h5[data-test="product-name"]');

    console.log("Sort by product name ascending")
    for (let i = 0; i < productNames.length - 1; i++) {
        const currentProductName = await productNames[i].textContent();
        const nextProductName = await productNames[i + 1].textContent();
        console.log(currentProductName, nextProductName);

        // Compare the product names, ignoring case sensitivity
        expect(currentProductName.localeCompare(nextProductName)).toBeLessThanOrEqual(0);
    }

    // Descending
    await page.locator('[data-test="sort"]').selectOption('name,desc');

    await expect(page.locator('div[data-test="sorting_completed"]')).toBeVisible();

    productNames = await page.$$('h5[data-test="product-name"]');

    console.log("Sort by product name descending")
    for (let i = 0; i < productNames.length - 1; i++) {
        const currentProductName = await productNames[i].textContent();
        const nextProductName = await productNames[i + 1].textContent();
        console.log(currentProductName, nextProductName);

        // Compare the product names, ignoring case sensitivity
        expect(currentProductName.localeCompare(nextProductName)).toBeGreaterThanOrEqual(0);
    }

    // Price
    // Descending
    await page.locator('[data-test="sort"]').selectOption('price,desc');

    await expect(page.locator('div[data-test="sorting_completed"]')).toBeVisible();

    let productPrices = await page.$$('span[data-test="product-price"]');

    console.log("Sort by product price descending")
    for (let i = 0; i < productPrices.length - 1; i++) {
        const currentPrice = await productPrices[i].textContent();
        const nextPrice = await productPrices[i + 1].textContent();

        // Assuming prices are in a format like "$19.99"
        const currentPriceNum = parseFloat(currentPrice.replace('$', ''));
        const nextPriceNum = parseFloat(nextPrice.replace('$', ''));
        console.log(currentPriceNum, nextPriceNum);

        expect(currentPriceNum).toBeGreaterThanOrEqual(nextPriceNum);
    }

    // Ascending
    await page.locator('[data-test="sort"]').selectOption('price,asc');

    await expect(page.locator('div[data-test="sorting_completed"]')).toBeVisible();

    productPrices = await page.$$('span[data-test="product-price"]');

    console.log("Sort by product price ascending")
    for (let i = 0; i < productPrices.length - 1; i++) {
        const currentPrice = await productPrices[i].textContent();
        const nextPrice = await productPrices[i + 1].textContent();

        // Assuming prices are in a format like "$19.99"
        const currentPriceNum = parseFloat(currentPrice.replace('$', ''));
        const nextPriceNum = parseFloat(nextPrice.replace('$', ''));
        console.log(currentPriceNum, nextPriceNum);

        expect(currentPriceNum).toBeLessThanOrEqual(nextPriceNum);
    }
})

test('Test buy function', async ({ page }) => {
    test.setTimeout(90_000); // Set the test time to 90 second (default is 30 second), increase if the internet is slow.

    // await page.waitForTimeout(120_000);

    await page.goto(url);

    await page.locator('[data-test="nav-sign-in"]').click();
    await page.waitForSelector('[data-test="email"]');
    await page.locator('[data-test="email"]').click();
    await page.locator('[data-test="email"]').fill('customer@practicesoftwaretesting.com');
    await page.locator('[data-test="password"]').click();
    await page.locator('[data-test="password"]').fill('welcome01');
    await page.locator('[data-test="login-submit"]').click();

    const expected_URL_account = url + "account"
    await expect(page).toHaveURL(expected_URL_account)

    await page.locator('[data-test="nav-home"]').click();

    await expect(page).toHaveURL(url)

    // Pick up the first item
    await page.locator('h5[data-test="product-name"]:text("Combination Pliers")').click();

    await page.locator('[data-test="increase-quantity"]').click();
    await page.locator('[data-test="increase-quantity"]').click();
    await page.locator('[data-test="add-to-cart"]').click();

    await page.getByLabel('Product added to shopping').click();

    await page.locator('[data-test="nav-home"]').click();

    // Searching item
    await page.locator('[data-test="search-query"]').fill("Hammer");
    await page.locator('[data-test="search-submit"]').click();

    await expect(page.locator('[data-test="search-term"]')).toHaveText("Hammer");

    await expect(page.locator('div[data-test="search_completed"]')).toBeVisible();

    await page.locator('h5[data-test="product-name"]:text("Thor Hammer")').click();
    await page.locator('[data-test="add-to-cart"]').click();

    await page.getByLabel('Product added to shopping').click();

    await page.locator('[data-test="nav-home"]').click();

    // Filtering item
    await page.locator('#filters').getByText('Sander').click();

    await page.locator('h5[data-test="product-name"]:text("Belt Sander")').click();
    await page.locator('[data-test="quantity"]').fill('10');
    await page.locator('[data-test="add-to-cart"]').click();

    await page.getByLabel('Product added to shopping').click();

    await page.locator('[data-test="nav-home"]').click();

    // Sorting item
    await page.locator('[data-test="sort"]').selectOption('name,asc');
    await page.locator('h5[data-test="product-name"]:text("Adjustable Wrench")').click();
    await page.locator('[data-test="quantity"]').fill('20');
    await page.locator('[data-test="add-to-cart"]').click();

    await page.getByLabel('Product added to shopping').click();

    // Checkout
    await page.locator('[data-test="nav-cart"]').click();

    const expected_URL_checkout = url + 'checkout'
    await expect(page).toHaveURL(expected_URL_checkout);

    await page.locator('[data-test="proceed-1"]').click();

    await page.locator('[data-test="proceed-2"]').click();
    await expect(page.locator('[data-test="address"]')).toHaveValue("Test street 98");
    // await expect(page.locator('[data-test="state"]')).toBeEditable();
    await page.locator('[data-test="state"]').fill('Canada');
    await page.locator('[data-test="postcode"]').fill('90000');

    await page.locator('[data-test="proceed-3"]').click();

    await page.locator('[data-test="payment-method"]').selectOption('cash-on-delivery');
    await page.locator('[data-test="finish"]').click();
    await expect(page.getByText('Payment was successful')).toBeVisible();
    await page.getByText('Payment was successful').click();
});
