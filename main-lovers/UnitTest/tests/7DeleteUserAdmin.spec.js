//  import { test, expect } from "@playwright/test";
// ; 
// test('7DeleteUserAdmin', async ({ page }) => {
//     await page.goto('http://localhost:3000/admin');


// await page.getByRole('cell', { name: 'fotesdefraps@msn.com' }).click()

// await page.waitForTimeout(500);


//   page.once('dialog', dialog => {
//     console.log(`Dialog message: ${dialog.message()}`);
//     dialog.dismiss().catch(() => {});
//   });
//   await page.getByRole('row', { name: 'Merge Joel Matthieu Perry 2000-01-01 fotesdefraps@msn.com no data no data C++: C#: Male Male Female Other No Edit Delete' }).getByRole('button', { name: 'Delete' }).click();

//   //await page.waitForTimeout(500);
// await expect(page.getByText('User deleted succefully', { exact: true }).first()).toBeVisible();

// });


import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/admin');
  await page.waitForTimeout(500);
  await page.getByRole('cell', { name: 'fotesdefraps@msn.com' }).click
  ();
  await page.waitForTimeout(500);
  await page.getByRole('cell', { name: 'fotesdefraps@msn.com' }).click();
  await page.waitForTimeout(500);
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.waitForTimeout(500);
  await page.getByRole('row', { name: 'Merge Joel Matthieu Perry 2000-01-01 fotesdefraps@msn.com no data no data C++: C#: Male Male Female Other No Edit Delete' }).getByRole('button', { name: 'Delete' }).click();
  await page.waitForTimeout(500);
  await expect(page.getByText('User deleted succefully', { exact: true }).first()).toBeVisible();
  await page.locator('html').click();
  await page.waitForTimeout(500);

});