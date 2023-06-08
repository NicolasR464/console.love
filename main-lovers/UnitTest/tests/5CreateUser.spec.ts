// import { test, expect } from "@playwright/test";
// import sleep from "p-sleep";



// test('5CreateUser', async ({ page }) => {
//   test.setTimeout(120000);
//   await page.goto('http://localhost:3000/');
//   await page.click('text=Sign Up');

//   await page.fill('input[placeholder="email"]', 'matthieulegigabg@hotmail.fr');
//   await page.fill('input[placeholder="password"]', 'azerty');
// await page.getByPlaceholder('password').nth(2).fill('azerty');

//   await page.click('button:has-text("Sign In with your credentials")');
//   await page.waitForNavigation();

//   await page.waitForURL('http://localhost:3000/complete_profile');

//   await page.waitForTimeout(1500);
//   await page.getByPlaceholder('Username').click();
//   await page.getByPlaceholder('Username').fill('Matthieu le giga bg');
//   await page.waitForTimeout(500);
//   await page.getByPlaceholder('First Name').click();
//   await page.getByPlaceholder('First Name').fill('Matthiew');
//   await page.waitForTimeout(500);
//   await page.getByPlaceholder('Last Name').click();
//   await page.getByPlaceholder('Last Name').fill('Perry');
//   await page.waitForTimeout(500);
//   await page.getByPlaceholder('Address').click();
//   await page.getByPlaceholder('Address').fill('16 Rue Voltaire 94270 Le Kremlin-Bicêtre');
//   await page.locator('#slide1 div').click();
//   await page.getByPlaceholder('Address').fill('16 avenue voltaire');
//   await page.getByPlaceholder('Address').click();
//   await page.getByPlaceholder('Address').fill('16 rue voltaire');


//   await page.waitForTimeout(2000);

//   await page.getByRole('button', { name: '❯' }).click();
//   await page.waitForTimeout(500);
//   await page.getByLabel('C++').check();
//   await page.waitForTimeout(500);
//   await page.getByLabel('C#').check();
//   await page.waitForTimeout(500);
//   await page.getByRole('textbox').fill('2000-01-01');
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.getByText('Sex:MaleFemaleOther').click();
//   await page.getByRole('radio').first().check();
//   await page.waitForTimeout(500);
//   await page.getByRole('checkbox').nth(1).check();
//   await page.waitForTimeout(500);
//   await page.getByRole('checkbox').nth(1).check();
//   await page.waitForTimeout(500);
//   await page.getByRole('checkbox').nth(2).check();
//   await page.waitForTimeout(500);
//   await page.getByRole('checkbox').nth(3).check();
//   await page.waitForTimeout(500);
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.waitForTimeout(2000);

//   await page.getByPlaceholder('Profile picture').setInputFiles('/home/jerome/Téléchargements/Mat-le-bg.jpg');
//   await page.waitForTimeout(3000);
//   await page.getByRole('img', { name: 'Uploaded Preview 1' }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('button', { name: '❯' }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('button', { name: 'Merge one night' }).click();
//   await page.waitForTimeout(3000);
//   await page.getByRole('button', { name: 'Start the adventure' }).click();
// });









