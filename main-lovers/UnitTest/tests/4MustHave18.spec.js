// import { test, expect } from "@playwright/test";
// import sleep from "p-sleep";



// test('createaccount', async ({ page }) => {
//   test.setTimeout(120000);
//   await page.goto('http://localhost:3000/');
//   await page.click('text=Sign Up');

//   await page.fill('input[placeholder="email"]', 'fotesdefraps@msn.com');
//   await page.fill('input[placeholder="password"]', 'azertyu');
// await page.getByPlaceholder('password').nth(2).fill('azertyu');

//   await page.click('button:has-text("Sign In with your credentials")');
//   await page.waitForNavigation();

//   await page.waitForURL('http://localhost:3000/complete_profile');

//   await page.waitForTimeout(2000);
//   await page.getByPlaceholder('Username').click();
//   await page.getByPlaceholder('Username').fill("j'ai pas 18 ans");
//   await page.waitForTimeout(500);
//   await page.getByPlaceholder('First Name').click();
//   await page.getByPlaceholder('First Name').fill('Matthieu');
//   await page.waitForTimeout(500);
//   await page.getByPlaceholder('Last Name').click();
//   await page.getByPlaceholder('Last Name').fill('Perry');
//   await page.waitForTimeout(500);
//   await page.getByPlaceholder('Address').click();
//   await page.getByPlaceholder('Address').fill('Paris');
//   await page.waitForTimeout(2000);
  
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.waitForTimeout(500);
//   await page.getByLabel('C++').check();
//   await page.waitForTimeout(500);
//   await page.getByLabel('C#').check();
//   await page.waitForTimeout(500);
//   await page.getByRole('textbox').fill('2010-01-01');
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.pause()
//   await expect(page.getByText("You must be over 18 to create a profile", { exact: true }).first()).toBeVisible();

// });