// import { test, expect } from "@playwright/test";
// import sleep from "p-sleep";



// test("Password Validation 6 characters ", async ({ page }) => {
 
//   await page.goto('http://localhost:3000/');
//   await page.click('text=Sign Up');

//   await page.fill('input[placeholder="email"]', 'fotesdefraps@msn.com');
//   // await page.waitForTimeout(500);
//   await page.fill('input[placeholder="password"]', 'azer');
//   // await page.waitForTimeout(500);
// await page.getByPlaceholder('password').nth(2).fill('azer');
// // await page.waitForTimeout(500);
// await page.click('button:has-text("Sign In with your credentials")');
// // await page.waitForNavigation(); 

// await expect(page.getByText('The password must have a minimum of 6 characters !', { exact: true }).first()).toBeVisible();
  
// });