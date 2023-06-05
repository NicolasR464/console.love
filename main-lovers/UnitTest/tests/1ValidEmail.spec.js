 import { test, expect } from "@playwright/test";
; 
test('1gotohomepage', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByText('Sign Up').click();
    await page.getByPlaceholder('email', { exact: true }).click();
    await page.getByPlaceholder('email', { exact: true }).fill('fakeEmailmsn.com');
    await page.getByPlaceholder('password').nth(1).click();
    await page.getByPlaceholder('password').nth(1).fill('azerty');
    await page.getByPlaceholder('password').nth(2).click();
    await page.getByPlaceholder('password').nth(2).fill('azerty');
    await page.getByRole('button', { name: 'Sign In with your credentials' }).click()
    //await page.pause()
    await page.waitForNavigation();
    
    expect (responseText).toContainText('Invalid email');
    


    
 })
//  import { test, expect } from '@playwright/test';

//  test('test', async ({ page }) => {
//    await page.goto('http://localhost:3000/');
//    await page.getByText('Sign Up').click();
//    await page.getByPlaceholder('email', { exact: true }).click();
//    await page.getByPlaceholder('email', { exact: true }).fill('fakemailjeje');
//    await page.getByPlaceholder('password').nth(1).click();
//    await page.getByPlaceholder('password').nth(1).fill('azerty');
//    await page.getByPlaceholder('password').nth(2).click();
//    await page.getByPlaceholder('password').nth(2).fill('azerty');
//    await page.getByRole('button', { name: 'Sign In with your credentials' }).click();
//    expect (responseText).toContainText('paragraph');
//  });
 